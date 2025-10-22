"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import useRequest from "@/hooks/useRequest";
import { GET_DISCOUNT_DETAIL } from "@/utils/apiRoutes";
import { RowActionsProps } from "@/components/Dashboard/ShowDiscount/RowActions";
import DatePickerField from "./DatePickerField";
import { useDiscountStore } from "@/stores/useDiscount";

const EditUserSchema = z.object({
    invoice_amount: z.string().min(1, "مبلغ فاکتور الزامیست"),
    discount_percentage: z.string().min(1, "مقدار تخفیف الزامیست"),
    phone_number: z.string().min(10, "شماره معتبر نیست").max(15).nullable().or(z.literal("")),
    name: z.string().min(1, "نام الزامی است"),
    expiration_date: z.string().min(1, "تاریخ انقصا تخفیف الزامیست"),
});

export type EditUserFormValues = z.infer<typeof EditUserSchema>;

const EditForm = ({ discount }: RowActionsProps) => {
    const t = useTranslations("ShowDiscount");
    const requestServer = useRequest({ auth: true, notification: true });
    const fetchDiscounts = useDiscountStore((s) => s.fetchDiscounts);
    const [openEdit, setOpenEdit] = useState(false);

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<EditUserFormValues>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            invoice_amount: discount.invoice_amount ?? "",
            phone_number: discount.phone_number ?? "",
            discount_percentage: discount.discount_percentage ?? "",
            expiration_date: discount.expiration_date ?? "",
            name: discount.name ?? "",
        },
    });

    const onSubmit = async (data: EditUserFormValues) => {
        try {
            await requestServer(`${GET_DISCOUNT_DETAIL}/${discount.id}`, "post", {
                // @ts-ignore - no type for request
                data: { ...data },
            });
            setOpenEdit(false);
            fetchDiscounts(requestServer);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog
            open={openEdit}
            onOpenChange={(open) => {
                setOpenEdit(open);
                if (open)
                    reset({
                        phone_number: discount.phone_number ?? "",
                        name: discount.name ?? "",
                        invoice_amount: discount.invoice_amount ?? "",
                        discount_percentage: discount.discount_percentage ?? "",
                        expiration_date: discount.expiration_date ?? "",
                    });
            }}
        >
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className={"cursor-pointer"}>
                    {t("edit")}
                </Button>
            </DialogTrigger>

            <DialogContent className="p-5">
                <DialogHeader>
                    <DialogTitle className="text-start">{t("edit")}</DialogTitle>
                    <DialogDescription className="text-start py-0 pt-2">{t("edit_description")}</DialogDescription>
                </DialogHeader>

                <motion.form
                    className="space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {[
                        ["name", "text"],
                        ["phone_number", "tel"],
                        ["invoice_amount", "text"],
                        ["discount_percentage", "text"],
                    ].map(([field, type]) => (
                        <div key={field} className="space-y-1">
                            <Label htmlFor={field}>{t(field)}</Label>
                            <Input id={field} type={type} {...register(field as keyof EditUserFormValues)} />
                            {errors[field as keyof EditUserFormValues] && (
                                <p className="text-sm text-red-500">
                                    {errors[field as keyof EditUserFormValues]?.message?.toString()}
                                </p>
                            )}
                        </div>
                    ))}
                    <DatePickerField
                        watch={watch}
                        name="expiration_date"
                        label={t("expiration_date")}
                        setValue={setValue}
                    />
                    {errors.expiration_date && <p className="text-sm text-red-500">{errors.expiration_date.message}</p>}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="ghost" onClick={() => setOpenEdit(false)}>
                            {t("cancel")}
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {t("save_change")}
                        </Button>
                    </div>
                </motion.form>
            </DialogContent>
        </Dialog>
    );
};

export default EditForm;
