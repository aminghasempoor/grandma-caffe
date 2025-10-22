"use client";

import { Button } from "@/components/ui/button";
import { CalendarHijri } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Path, UseFormSetValue, UseFormWatch } from "react-hook-form";

type Props<T extends Record<string, any>> = {
    name: Path<T>;
    label: string;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
};

import * as React from "react";

export default function DatePickerField<T extends Record<string, any>>({ name, label, setValue, watch }: Props<T>) {
    const valueStr = watch(name);
    const value = valueStr ? new Date(valueStr) : undefined;

    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col gap-1 z-50">
            <label className="text-text text-sm font-medium">{label}</label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {value ? value.toLocaleDateString("fa-IR") : label}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                    <CalendarHijri
                        selected={value}
                        onSelect={(d) => {
                            if (d) {
                                // @ts-ignore - no type for iso
                                setValue(name as any, d.toISOString(), { shouldValidate: true });
                                setOpen(false);
                            }
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
