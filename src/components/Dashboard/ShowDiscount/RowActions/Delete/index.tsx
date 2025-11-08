"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import useRequest from "@/hooks/useRequest";
import { DELETE_DISCOUNT } from "@/utils/apiRoutes";
import { RowActionsProps } from "@/components/Dashboard/ShowDiscount/RowActions";
import {useDiscountStore} from "@/stores/useDiscount";

const DeleteForm = ({ discount }: RowActionsProps) => {
    const t = useTranslations("ShowDiscount");
    const requestServer = useRequest({ auth: true, notification: true });
    const [openDelete, setOpenDelete] = useState(false);
    const fetchDiscounts = useDiscountStore((s) => s.fetchDiscounts);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            await requestServer(`${DELETE_DISCOUNT}/${discount.id}`, "delete");
            setOpenDelete(false);
            fetchDiscounts(requestServer);
        } catch (error) {
            console.log("Delete error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className={"cursor-pointer"}>
                    {t("delete")}
                </Button>
            </DialogTrigger>

            <DialogContent className="p-5 text-start">
                <DialogHeader>
                    <DialogTitle className={"text-start"}>{t("delete")}</DialogTitle>
                    <DialogDescription className="pt-2 text-start">
                        {t("delete_description", {
                            username: discount.name ?? "بدون‌نام",
                        })}
                    </DialogDescription>
                </DialogHeader>

                <motion.div
                    className="pt-6 flex justify-end gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <Button type="button" variant="ghost" onClick={() => setOpenDelete(false)} disabled={loading}>
                        {t("cancel")}
                    </Button>
                    <Button type="button" variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading ? t("deleting") : t("delete")}
                    </Button>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteForm;
