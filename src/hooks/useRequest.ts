"use client";
import axios from "axios";
import { useTranslations } from "next-intl";
import useUserStore from "@/stores/userStore";
import ToastStore from "@/stores/useToastStore";
import { Notifications } from "@/notifications";

export interface RequestOptions {
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

const defaultOptions: RequestOptions = {
    auth: false,
    data: {},
    requestOptions: {
        headers: {},
    },
    notification: true,
    pending: true,
    success: {
        notification: {
            show: true,
        },
    },
    failed: {
        notification: {
            show: true,
        },
    },
};

const useRequest = (initOptions: RequestOptions) => {
    const t = useTranslations();
    const { token, clearToken } = useUserStore();
    const { pushToastList, dismissToastList } = ToastStore();

    let _options = { ...defaultOptions, ...initOptions };

    function requestServer(url: string, method: string = "get", options?: RequestOptions) {
        _options = { ..._options, ...options };

        if (_options.auth) {
            const isFormData = _options.data instanceof FormData;
            _options = {
                ..._options,
                requestOptions: {
                    ...(_options.requestOptions || {}),
                    headers: {
                        ...(_options.requestOptions?.headers || {}),
                        ...(isFormData ? {} : { "Content-Type": "application/json" }),
                        authorization: `Bearer ${token}`,
                    },
                },
            };
        }

        return Notifications(
            axios({
                url,
                method,
                data: _options.data,
                ..._options.requestOptions,
            }),
            {
                t,
                handlers: { pushToastList, dismissToastList, clearToken },
                options: _options,
            }
        );
    }
    return requestServer;
};

export default useRequest;
