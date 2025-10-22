"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import useUserStore from "@/stores/userStore";
import { useTranslations } from "next-intl";
import { Auth } from "@/assets";

function WithoutAuthMiddleware({ children }: { children: React.ReactNode }) {
    const t = useTranslations("NotAuthMiddleware");
    const router = useRouter();

    const isAuth = useUserStore((state) => state.isAuth);
    const initAuthState = useUserStore((state) => state.initAuthState);
    useEffect(() => {
        if (!initAuthState) return;

        if (isAuth) {
            router.replace("/dashboard");
        }
    }, [isAuth, initAuthState, router]);
    if (!initAuthState) return null;
    if (isAuth)
        return (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center space-y-4">
                <Auth width={200} height={200} />
                <p className="text-lg text-foreground capitalize">{t("title")}</p>
            </div>
        );

    return <>{children}</>;
}

export default WithoutAuthMiddleware;
