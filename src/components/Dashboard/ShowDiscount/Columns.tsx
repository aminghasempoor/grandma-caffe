"use client";

import { ColumnDef } from "@tanstack/react-table";
import { motion } from "framer-motion";
import RowActions from "./RowActions";

export type Discount = {
    id: string;
    phone_number: string;
    name: string;
    invoice_amount: string;
    discount_amount: string;
    discount_percentage?: string;
    expiration_date?: string;
};

export const columns: ColumnDef<Discount>[] = [
    {
        accessorKey: "id",
        header: () => (
            <div className="text-right font-semibold text-foreground px-5">آیدی</div>
        ),
        cell: ({ row }) => (
            <motion.div
                className="text-right text-foreground px-5"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                {row.getValue("id")}
            </motion.div>
        ),
    },
    {
        accessorKey: "name",
        header: () => (
            <div className="text-right font-semibold text-foreground px-5">نام</div>
        ),
        cell: ({ row }) => (
            <motion.div
                className="text-right font-medium text-foreground px-5"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {row.getValue("name")}
            </motion.div>
        ),
    },
    {
        accessorKey: "phone_number",
        header: () => (
            <div className="text-right font-semibold text-foreground px-5">شماره تلفن</div>
        ),
        cell: ({ row }) => (
            <motion.div
                className="text-right text-foreground px-5"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
            >
                {row.getValue("phone_number")}
            </motion.div>
        ),
    },
    {
        accessorKey: "discount_amount",
        header: () => (
            <div className="text-right font-semibold text-foreground px-5">
                مقدار تخفیف
            </div>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("discount_amount"));
            const formatted = new Intl.NumberFormat("fa-IR", {
                style: "decimal",
            }).format(amount);

            return (
                <motion.div
                    className="text-right font-bold text-green-600 px-5"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {formatted}٪
                </motion.div>
            );
        },
    },
    {
        id: "actions",
        header: () => (
            <div className="text-right font-semibold text-foreground px-5">
                عملیات
            </div>
        ),
        cell: ({ row }) => (
            <>
                <RowActions discount={row.original} />
            </>
        ),
    },
];
