"use client";
import {useEffect} from "react";
import {useDiscountStore} from "@/stores/useDiscount";
import useRequest from "@/hooks/useRequest";
import {DataTable} from "./DataTable";
import {columns, Discount} from "./Columns";
import DataTableFallback from "./DataTableFallBack";

export default function ShowDiscount() {
    const {data, loading, error, fetchDiscounts} = useDiscountStore();
    const requestServer = useRequest({auth: true, notification: false});

    useEffect(() => {
        fetchDiscounts(requestServer);
    }, [fetchDiscounts]);

    if (loading) return <DataTableFallback
        type={"loading"}
        rowCount={5}
    />;
    if (error) return <DataTableFallback
        type={"error"}
        message={error}
        rowCount={5}
    />;

    const tableData: Discount[] = data.map((item: any) => ({
        id: item.id,
        phone_number: item.phone_number,
        name: item.name,
        invoice_amount: item.invoice_amount,
        discount_amount: item.discount_amount,
        expiration_date: item.expiration_date,
    }));

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={tableData}/>
        </div>
    );
}
