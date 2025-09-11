"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {menuItems} from "@/utils/data";
import {ArrowDown} from "lucide-react";

export default function Header() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const parent = menuItems.find((item) => item.children?.some((sub) => sub.href === pathname));

        if (parent) {
            setActiveTab(parent.title);
        } else {
            const current = menuItems.find((item) => item.href === pathname);
            if (current) {
                setActiveTab(current.title);
            }
        }
    }, [pathname]);


    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-desktop-primary relative container mx-auto mt-5 flex items-center rounded-2xl px-6 py-4 md:gap-x-5 lg:gap-x-10"
            >
                <Link href={"/"}>
                    {/*<Logo141 className="text-text h-10 w-10" />*/}
                    Logo
                </Link>
                {menuItems.map((item) => (
                    <div key={item.title} className="relative">
                        {item.children ? (
                            <>
                                <motion.span
                                    className={`text-text flex cursor-pointer items-center gap-x-3 whitespace-nowrap md:text-sm lg:text-lg lg:font-semibold`}
                                    onClick={() => setOpenDropdown((prev) => (prev === item.title ? null : item.title))}
                                >
                                    {item.title}
                                    <ArrowDown
                                        className={`size-2 transition-transform duration-300 ${
                                            openDropdown === item.title ? "rotate-180" : ""
                                        }`}
                                    />
                                </motion.span>
                                {openDropdown === item.title && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-pwa-primary absolute top-full z-20 mt-3 min-w-max rounded-md shadow-lg"
                                    >
                                        {item.children.map((sub) => {
                                            const isActive = pathname === sub.href;
                                            return (
                                                <Link
                                                    key={sub.title}
                                                    href={sub.href || "#"}
                                                    className={`hover:bg-text/10 block rounded-md px-4 py-2 text-sm whitespace-nowrap ${
                                                        isActive ? "text-neo-aqua font-semibold" : "text-text"
                                                    }`}
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    {sub.title}
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <Link href={item.href || "#"}>
                                <motion.span
                                    className={`w-full cursor-pointer whitespace-nowrap md:text-sm lg:text-lg lg:font-semibold ${
                                        activeTab === item.title ? "text-neo-aqua font-bold" : "text-text"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.title}
                                </motion.span>
                            </Link>
                        )}

                        {activeTab === item.title && (
                            <div className="absolute left-1/2 z-10 -translate-x-1/2 md:top-[calc(100%_+_0.55rem)] lg:top-[calc(100%_+_0.35rem)]">
                                <motion.div
                                    layoutId="active-dot"
                                    className="bg-neo-aqua absolute top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full shadow-sm"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
