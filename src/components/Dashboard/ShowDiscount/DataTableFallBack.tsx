"use client";
import { motion } from "framer-motion";
import { columns } from "./Columns"; // ستون‌ها

interface Props {
    type: "loading" | "error";
    message?: string;
    rowCount?: number;
}

const DataTableFallback = ({ type, message, rowCount = 5 }: Props) => {
    if (type === "loading") {
        return (
            <div className="container mx-auto space-y-4 mt-24">
                {[...Array(rowCount)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex animate-pulse items-center justify-between space-y-7"
                    >
                        <div className="h-3 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-24 rounded bg-gray-200" />
                        <div className="h-3 w-20 rounded bg-gray-200" />
                    </motion.div>
                ))}
            </div>
        );
    }

    if (type === "error") {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 text-center font-medium text-red-500"
            >
                {message || "خطایی رخ داده است."}
            </motion.div>
        );
    }

    return null;
};

export default DataTableFallback;
