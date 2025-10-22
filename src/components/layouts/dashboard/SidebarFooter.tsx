import { SidebarFooter, SidebarMenu } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Power } from "lucide-react";
import useRequest from "@/hooks/useRequest";
import { GET_LOGOUT_ROUTE } from "@/utils/apiRoutes";
import useUserStore from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { ModeToggle } from "@/core/ToggeTheme";

const SidebarFooterComponent = () => {
    const t = useTranslations("Sidebar");
    const { logout } = useUserStore();
    const router = useRouter();
    const requestServer = useRequest({ notification: false, auth: true });
    const handleLogOut = async () => {
        try {
            await requestServer(GET_LOGOUT_ROUTE, "post");
            await logout();
            router.replace("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SidebarFooter>
            <SidebarMenu className="hover:bg-none">
                <ModeToggle />
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuButton asChild className={"p-0"}>
                    <Button
                        className={"justify-start text-red-600 hover:text-red-600 p-0"}
                        variant={"ghost"}
                        onClick={handleLogOut}
                    >
                        <Power />
                        <p className={"text-md"}>{t("log_out")}</p>
                    </Button>
                </SidebarMenuButton>
            </SidebarMenu>
        </SidebarFooter>
    );
};
export default SidebarFooterComponent;
