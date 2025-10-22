"use client";
import useUserStore from "@/stores/userStore";
// import WithAuthMiddleware from "@/components/middlewares/WithAuthMiddleware";
import LoadingHardPage from "@/core/LoadingHardPage";
import { useTranslations } from "next-intl";
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const t = useTranslations();
    const isAuth = useUserStore((state) => state.isAuth);
    const initAuthState = useUserStore((state) => state.initAuthState);
    const errorState = useUserStore((state) => state.errorState);

    if (!initAuthState && !isAuth)
        return (
            <LoadingHardPage
                authState={errorState!}
                label={
                    errorState ? (
                        <div className={"flex justify-center items-center"}>
                            <h1>{t("unknown_error")}</h1>
                        </div>
                    ) : (
                        <h1>{t("authenticating")}</h1>
                    )
                }
                loading={true}
                width={200}
                height={200}
            />
        );

    return (
        // <WithAuthMiddleware>
        <DashboardLayout>
            <div className={"px-10"}>{children}</div>
        </DashboardLayout>
        // </WithAuthMiddleware>
    );
};

export default Layout;
