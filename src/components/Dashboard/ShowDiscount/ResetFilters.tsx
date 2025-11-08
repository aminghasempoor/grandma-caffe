"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useDiscountStore } from "@/stores/useDiscount";
import useRequest from "@/hooks/useRequest";

const ResetFilters = () => {
    const filters = useDiscountStore((state) => state.filters);
    const requestServer = useRequest({ auth: true, notification: false });
    const resetFilters = useDiscountStore((state) => state.resetFilters);

    return (
        <Button
            variant="outline"
            color="secondary"
            disabled={filters.length === 0}
            onClick={() => resetFilters(requestServer)}
        >
            بازگردانی فیلترها
        </Button>
    );
};

export default ResetFilters;
