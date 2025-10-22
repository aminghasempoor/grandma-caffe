import { Home, Inbox, Settings } from "lucide-react";

export function getDashboardSidebarItems(t: (key: string) => string) {
    return [
        {
            title: t("home"),
            url: "/",
            icon: Home,
        },
        {
            title: t("profile"),
            url: "/dashboard",
            icon: Inbox,
        },
        // {
        //     title: t("user-management"),
        //     url: "/dashboard/user-management",
        //     icon: UserIcon,
        // },
        {
            title: t("settings"),
            url: "/dashboard/settings",
            icon: Settings,
        },
    ];
}
