"use client";
import dynamic from "next/dynamic";
import { useDeviceStore } from "@/stores/useDeviceStore";

const HeaderMobile = dynamic(() => import("@/components/Header/Mobile"), { ssr: false });
const HeaderDesktop = dynamic(() => import("@/components/Header/Desktop"), { ssr: false });

export default function Header() {
    const isMobile = useDeviceStore((state) => state.isMobile);
    return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
}
