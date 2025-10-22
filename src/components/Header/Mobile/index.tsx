import { useSidebarStore } from "@/stores/SidebarStore";
import React from "react";
import { HamburgerIcon } from "lucide-react";

export default function Header() {
    const toggle = useSidebarStore((state) => state.toggle);

    return (
        <>
            <div className="absolute top-4 right-5 left-5 z-2 flex justify-between">
                <div className="size-fit rounded-xl shadow-md">
                    <button
                        onClick={() => {
                            toggle();
                        }}
                        type="button"
                        className="bg-desktop-primary cursor-pointer rounded-xl p-[12px]"
                    >
                        <HamburgerIcon className="text-text size-6" />
                    </button>
                </div>
            </div>
        </>
    );
}
