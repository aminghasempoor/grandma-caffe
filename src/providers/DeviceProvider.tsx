"use client";

import React, { useEffect, useState } from "react";
import { useDeviceStore } from "@/stores/useDeviceStore";
import useDevice from "@/hooks/useDevice";

export default function DeviceProvider({ children }: { children: React.ReactNode }) {
    const isMobileDevice = useDevice();
    const setIsMobile = useDeviceStore((state) => state.setIsMobile);

    const [ready, setReady] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileDevice);
        setReady(true);
    }, [isMobileDevice, setIsMobile]);

    if (!ready) return null;

    return children;
}
