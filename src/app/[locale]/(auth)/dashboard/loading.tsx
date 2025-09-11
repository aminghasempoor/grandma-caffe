"use client";

import LoadingHardPage from "@/core/LoadingHardPage";
import { useTranslations } from "next-intl";

const Loading = () => {
    const t = useTranslations("Loading");
    return <LoadingHardPage loading={true} width={200} height={200} label={t("title")} />;
};
export default Loading;
