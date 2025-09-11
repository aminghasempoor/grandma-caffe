import { ModeToggle } from "@/core/ToggeTheme";
import { useTranslations } from "next-intl";
import Login from "@/components/login";
import Header from "@/components/Header";
import WithoutAuthMiddleware from "@/components/middlewares/WithoutAuthMiddleware";

export default function Home() {
    const t = useTranslations("HomePage");
    return (
        <>
            <ModeToggle />
            <Header />
            <WithoutAuthMiddleware>
            <Login />
            </WithoutAuthMiddleware>
        </>
    );
}
