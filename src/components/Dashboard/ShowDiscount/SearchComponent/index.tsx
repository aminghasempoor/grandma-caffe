"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import useRequest from "@/hooks/useRequest"
import { useDiscountStore } from "@/stores/useDiscount"

type SearchFormValues = {
    query: string
}

const SearchComponent = () => {
    const requestServer = useRequest({ auth: true, notification: true })
    const { register, handleSubmit, watch } = useForm<SearchFormValues>({
        defaultValues: { query: "" },
    })
    const setFilters = useDiscountStore((state) => state.setFilters)

    // 👀 مقدار ورودی را مشاهده می‌کنیم
    const queryValue = watch("query")

    const onSubmit: SubmitHandler<SearchFormValues> = async (data) => {
        if (!data.query.trim()) return // در صورت خالی بودن، کاری نکن
        const filters = [
            {
                id: "phone_number",
                value: data.query.trim(),
            },
        ]
        await setFilters(filters, requestServer)
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2"
        >
            <Input
                placeholder="جست‌وجو..."
                {...register("query")}
                className="w-64"
            />

            <Button
                className="cursor-pointer"
                type="submit"
                variant="outline"
                size="icon"
                disabled={!queryValue.trim()} // 🚫 غیرفعال شدن دکمه وقتی ورودی خالی است
            >
                <Search className="h-5 w-5" />
            </Button>
        </motion.form>
    )
}

export default SearchComponent
