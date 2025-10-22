import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";
import localFont from "next/font/local";
import DeviceProvider from "@/providers/DeviceProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import InitUser from "@/hooks/InitUser";

const doran = localFont({
    src: "../../fonts/Doran-Medium.woff2",
    display: "swap",
    variable: "--font-doran",
});

interface LocaleLayoutProps {
    params: Promise<{
        locale: string;
    }>;
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: {
        template: "%s | مادربزرگ",
        default: "مادربزرگ",
    },
};

export default async function RootLayout(props: LocaleLayoutProps) {
    const { locale } = await props.params;
    let isRtl;
    let messages;
    try {
        messages = await getMessages();
        isRtl = locale === "fa";
    } catch (e) {
        console.log(e);
        notFound();
    }
    return (
        <html className={doran.className} lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
            <body>
                <NextTopLoader color="#16a795" />
                <NextIntlClientProvider messages={messages}>
                    <DeviceProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            disableTransitionOnChange
                            value={{
                                light: "light",
                                dark: "dark",
                            }}
                        >
                            <Toaster />
                            <InitUser />
                            {props.children}
                        </ThemeProvider>
                    </DeviceProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
