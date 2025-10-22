"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import useUserStore from "@/stores/userStore";
import { useTranslations } from "next-intl";
import useRequest from "@/hooks/useRequest";
import { CHANGE_PASSWORD } from "@/utils/apiRoutes";
import { Input } from "@/components/ui/input";

interface PasswordForm {
    current_password: string;
    new_password: string;
    confirm_password: string;
}

export default function UserSettings() {
    const t = useTranslations("Settings");
    const requestServer = useRequest({ auth: true, notification: true });
    const user = useUserStore((state) => state.user);
    const {
        control,
        handleSubmit,
        formState: { isDirty, isSubmitting },
        reset,
    } = useForm<PasswordForm>({
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
    });

    const [apiError, setApiError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const onSubmit = async (data: PasswordForm) => {
        setApiError(null);
        setSuccessMsg(null);

        if (data.new_password !== data.confirm_password) {
            setApiError(t("passwords_do_not_match"));
            return;
        }

        try {
            await requestServer(CHANGE_PASSWORD, "post", {
                data: {
                    new_password: data.new_password,
                    current_password: data.current_password,
                },
            });
            setSuccessMsg(t("password_changed_successfully"));
            reset();
        } catch (error) {
            console.log(error);
            setApiError(t("error_msg"));
        } finally {
            throw new Error("error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md mt-8"
        >
            <h2 className="text-xl font-bold mb-6 text-center">{t("title")}</h2>

            <div className="mb-6 space-y-3 text-center">
                <div className={"flex gap-x-5 items-center justify-center"}>
                    <span className="font-medium">{t("user_name")} : </span>
                    <p className="mt-1">{user.username || "-"}</p>
                </div>
                <div className={"flex gap-x-5 items-center justify-center"}>
                    <span className="font-medium">{t("email")} : </span>
                    <p className="mt-1">{user.email || "-"}</p>
                </div>
                <div className={"flex gap-x-5 items-center justify-center"}>
                    <span className="font-medium">{t("phone_number")} : </span>
                    <p className="mt-1">{user.phone_number || "-"}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label htmlFor="current_password" className="block mb-1 font-medium">
                        {t("current_password")}
                    </label>
                    <Controller
                        name="current_password"
                        control={control}
                        rules={{ required: t("required") }}
                        render={({ field, fieldState }) => (
                            <>
                                <Input {...field} id="current_password" type="password" />
                                {fieldState.error && (
                                    <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>

                <div>
                    <label htmlFor="new_password" className="block mb-1 font-medium">
                        {t("new_password")}
                    </label>
                    <Controller
                        name="new_password"
                        control={control}
                        rules={{
                            required: t("required"),
                            minLength: { value: 6, message: t("password_min_length") },
                        }}
                        render={({ field, fieldState }) => (
                            <>
                                <Input {...field} id="new_password" type="password" />
                                {fieldState.error && (
                                    <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>

                <div>
                    <label htmlFor="confirm_password" className="block mb-1 font-medium">
                        {t("confirm_password")}
                    </label>
                    <Controller
                        name="confirm_password"
                        control={control}
                        rules={{ required: t("required") }}
                        render={({ field, fieldState }) => (
                            <>
                                <Input {...field} id="confirm_password" type="password" />
                                {fieldState.error && (
                                    <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>
                                )}
                            </>
                        )}
                    />
                </div>

                {apiError && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 text-center">
                        {apiError}
                    </motion.p>
                )}
                {successMsg && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 text-center">
                        {successMsg}
                    </motion.p>
                )}

                <button
                    type="submit"
                    disabled={!isDirty || isSubmitting}
                    className={`w-full py-2 rounded font-semibold transition-colors ${
                        !isDirty || isSubmitting ? " cursor-not-allowed" : "bg-muted"
                    }`}
                >
                    {t("submit")}
                </button>
            </form>
        </motion.div>
    );
}
