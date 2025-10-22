"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import SidebarFooterComponent from "./SidebarFooter";
import { useTranslations } from "next-intl";
import { getDashboardSidebarItems } from "@/utils/data";

export function DashboardSidebar() {
    const t = useTranslations("Sidebar");
    const items = getDashboardSidebarItems(t);
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const { toggleSidebar, isMobile } = useSidebar();
    return (
        <Sidebar collapsible="icon" variant="inset" side={`${segments[0] === "en" ? "left" : "right"}`}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={"text-2xl mb-2 capitalize mt-2"}>
                        {/*<Image src={IconLogo} alt={"logo"} width={20} height={20} className="pointer-events-none" />*/}
                        <div className={"mx-2"}>{t("global_title")}</div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <Collapsible key={item.title} defaultOpen className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={
                                                    item.url ===
                                                    `/${segments[1]}${segments[2] ? `/${segments[2]}` : ""}`
                                                }
                                            >
                                                <Link
                                                    onClick={() => {
                                                        if (isMobile) toggleSidebar();
                                                    }}
                                                    href={item.url}
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                <SidebarMenuSubItem />
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                            <SidebarFooterComponent />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
