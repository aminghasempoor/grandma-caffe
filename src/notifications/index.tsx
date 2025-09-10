import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

type ToastType = "pending" | "error" | "warning" | "success";
type TranslationFunction = (key: string) => string;

interface ToastHandlers {
    pushToastList: (type: ToastType, id: string) => void;
    dismissToastList: (types: ToastType[]) => void;
    clearToken: () => void;
}

interface RequestOptions {
    auth?: boolean;
    data?: Record<string, string> | FormData;
    requestOptions?: {
        headers?: Record<string, string>;
        signal?: AbortSignal;
        [key: string]: any;
    };
    notification?: boolean;
    pending?: boolean;
    success?: {
        notification: {
            show: boolean;
        };
    };
    failed?: {
        notification: {
            show: boolean;
        };
    };
}

interface ToastPromiseOptions {
    t: TranslationFunction;
    handlers: ToastHandlers;
    options: RequestOptions;
}

export const Notifications = (promise: Promise<AxiosResponse>, { t, handlers, options }: ToastPromiseOptions) => {
    const { pushToastList, dismissToastList, clearToken } = handlers;

    const showNotification = options.notification ?? true;
    const showPending = options.pending ?? true;
    const showSuccess = options.success?.notification?.show ?? true;
    const showFailed = options.failed?.notification?.show ?? true;

    if (!showNotification) return promise;

    return toast.promise(
        promise,
        {
            loading: showPending ? t("Notifications.pending") : "",
            success: (response: AxiosResponse) => {
                if (showSuccess) {
                    dismissToastList(["pending", "warning", "error", "success"]);
                    pushToastList("success", String(response.status));
                }
                return t("Notifications.success");
            },
            error: (error: any) => {
                if (showFailed) {
                    dismissToastList(["pending", "warning", "error", "success"]);
                }

                if (!showFailed) return t("Notifications.error");

                if (error.response) {
                    const status = error.response.status;
                    const responseData = error.response.data;

                    if (status >= 500 && status <= 599) {
                        pushToastList("warning", String(status));
                    } else if (status >= 400 && status <= 499) {
                        switch (status) {
                            case 401:
                                clearToken();
                                pushToastList("error", String(status));
                                break;
                            case 422:
                                if (responseData?.message) {
                                    if (Array.isArray(responseData.message)) {
                                        responseData.message.forEach((msg: string) => {
                                            pushToastList("error", msg);
                                        });
                                    } else {
                                        pushToastList("error", responseData.message);
                                    }
                                }
                                if (responseData?.errors) {
                                    Object.keys(responseData.errors).forEach((key) => {
                                        const msg = responseData.errors[key]?.[0];
                                        if (msg) pushToastList("error", msg);
                                    });
                                }
                                break;
                            case 429:
                                pushToastList("error", String(status));
                                break;
                            default:
                                pushToastList("error", String(status));
                                break;
                        }
                    } else {
                        pushToastList("error", t("Notifications.error"));
                    }
                } else if (error.request) {
                    pushToastList("error", t("Notifications.error"));
                } else {
                    pushToastList("error", t("Notifications.error"));
                }

                return t("Notifications.error");
            },
        },
        {
            position: "top-center",
            duration: 4000,
        }
    );
};
