"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import useUserStore from "@/stores/userStore";
import { useTranslations } from "next-intl";
import { Auth } from "@/assets";

function WithAuthMiddleware({ children }: { children: React.ReactNode }) {
    const t = useTranslations("AuthMiddleware");
    const router = useRouter();
    const pathName = usePathname();

    const isAuth = useUserStore((state) => state.isAuth);
    const initAuthState = useUserStore((state) => state.initAuthState);

    useEffect(() => {
        if (!initAuthState) return;

        if (!isAuth) {
            router.replace("/");
        }
    }, [isAuth, initAuthState, pathName, router]);
    if (!initAuthState || !isAuth)
        return (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center space-y-4">
                <Auth width={200} height={200} />
                <p className="text-lg text-foreground capitalize">{t("title")}</p>
            </div>
        );

    return <>{children}</>;
}

export default WithAuthMiddleware;
