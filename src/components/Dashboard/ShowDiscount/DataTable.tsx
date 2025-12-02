"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import TableToolbar from "./TableToolbar";
import { useDiscountStore } from "@/stores/useDiscount";
import useRequest from "@/hooks/useRequest";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const t = useTranslations("ShowDiscount");
    const requestServer = useRequest({ auth: true, notification: true });
    const { nextPage, previousPage, start, size, total } = useDiscountStore();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <TableToolbar />
            <div className="overflow-hidden rounded-[15px] border mt-5">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <p className="text-center text-gray-500">دیتایی برای نمایش وجود ندارد</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex gap-x-5 items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => previousPage(requestServer)} disabled={start === 0}>
                    {t("previous")}
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => nextPage(requestServer)}
                    disabled={start + size >= total}
                >
                    {t("next")}
                </Button>
            </div>
        </>
    );
}
