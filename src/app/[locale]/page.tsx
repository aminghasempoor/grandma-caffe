import { ModeToggle } from "@/core/ToggeTheme";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("HomePage");
    return (
        <>
            <ModeToggle />
            <h1>{t("title")}</h1>
        </>
    );
}
