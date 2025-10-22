"use client";
import { useEffect } from "react";
import { useDiscountStore } from "@/stores/useDiscount";
import useRequest from "@/hooks/useRequest";
import { DataTable } from "./DataTable";
import { columns, Discount } from "./Columns";

export default function ShowDiscount() {
    const { data, loading, error, fetchDiscounts } = useDiscountStore();
    const requestServer = useRequest({ auth: true, notification: false });

    useEffect(() => {
        fetchDiscounts(requestServer);
    }, [fetchDiscounts]);

    if (loading) return <p className="text-center text-gray-500 py-10">Loading...</p>;

    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    if (!data || data.length === 0) return <p className="text-center text-gray-500 py-10">No data available.</p>;

    const tableData: Discount[] = data.map((item: any) => ({
        id: item.id,
        phone_number: item.phone_number,
        name: item.name,
        invoice_amount: item.invoice_amount,
        discount_amount: item.discount_amount,
    }));

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tableData} />
        </div>
    );
}
