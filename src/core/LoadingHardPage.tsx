"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Auth } from "@/assets";

type LoadingHardPageProps = {
    children?: ReactNode;
    loading: boolean;
    authState?: boolean;
    icon?: ReactNode;
    width: number;
    height: number;
    label: ReactNode;
    className?: string;
};

const LoadingHardPage = ({
    children,
    loading,
    authState,
    icon = null,
    width = 200,
    height = 200,
    label,
    className = "",
}: LoadingHardPageProps) => {
    if (!loading) return <>{children}</>;

    return (
        <div
            className={cn(
                "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 max-w-md capitalize z-50",
                className
            )}
        >
            <Card className="flex flex-col items-center space-y-4 bg-transparent border-none shadow-none">
                <div
                    className={cn("flex items-center justify-center", !authState && "animate-pulse")}
                    style={{ width, height }}
                >
                    {icon ? (
                        <div className="text-primary" style={{ width, height }}>
                            {icon}
                        </div>
                    ) : (
                        <Auth className="text-primary" style={{ width, height }} />
                    )}
                </div>
                <div className={cn("text-center text-sm font-medium", authState ? "text-destructive" : "text-primary")}>
                    {label}
                </div>
            </Card>
        </div>
    );
};

export default LoadingHardPage;
