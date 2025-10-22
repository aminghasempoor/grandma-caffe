import { DashboardComponent } from "@/components/Dashboard";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "داشبورد",
};
export default function Dashboard() {
    return (
        <>
            <DashboardComponent />
        </>
    );
}
