import { Calendar, Home, Inbox, WalletCards, Settings, ScrollText, UserIcon } from "lucide-react";
type Menu = {
    title: string;
    href?: string;
    children?: Menu[];
};
export const menuItems: Menu[] = [
    { title: "تصاویر دوربین ها", href: "/road-cameras" },
    { title: "شکایات", href: "/complaints" },
    {
        title: "اخبار",
        children: [
            { title: "آخرین وضعیت راه های کشور", href: "/news/latest-roads-state" },
            { title: "کارگاه های جاده ای", href: "/news/road-works" },
            { title: "انسدادها", href: "/news/obstruction-list" },
            { title: "محدودیت تردد", href: "#" },
            { title: "محدودیت اعلامی پلیس", href: "/news/police-traffic-restrictions" },
            { title: "اطلاعیه های هواشناسی", href: "#" },
        ],
    },
    {
        title: "راه و ترافیک",
        children: [
            { title: "طبقه بندی راه های کشور", href: "#" },
            { title: "داده های تردد شمار", href: "#" },
        ],
    },
];

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
        {
            title: t("items"),
            url: "/dashboard/items",
            icon: Calendar,
        },
        {
            title: t("category"),
            url: "/dashboard/categories",
            icon: WalletCards,
        },
        {
            title: t("user-management"),
            url: "/dashboard/user-management",
            icon: UserIcon,
        },
        {
            title: t("customer_review"),
            url: "/dashboard/customer-review",
            icon: ScrollText,
        },
        {
            title: t("settings"),
            url: "/dashboard/settings",
            icon: Settings,
        },
    ];
}
