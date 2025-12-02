"use client";

import { create } from "zustand";
import { GET_DISCOUNT } from "@/utils/apiRoutes";

interface ApiData {
    id: number;
    phone_number: string;
    expiration_date: string;
    name: string;
    discount_amount: string;
}

interface ApiStore {
    data: ApiData[];
    loading: boolean;
    error: string | null;
    total: number;

    size: number;
    start: number;
    filters: any[];
    sorting: any[];

    nextPage: (requestServer: any) => Promise<void>;
    previousPage: (requestServer: any) => Promise<void>;

    fetchDiscounts: (requestServer: any) => Promise<void>;
    setSize: (size: number) => void;
    setStart: (start: number) => void;
    setFilters: (filters: any[], requestServer?: any) => Promise<void>;
    setSorting: (sorting: any[]) => void;
    resetFilters: (requestServer?: any) => Promise<void>;
}

export const useDiscountStore = create<ApiStore>((set, get) => ({
    data: [],
    loading: false,
    error: null,
    total: 0,

    size: 5,
    start: 0,
    filters: [],
    sorting: [],

    fetchDiscounts: async (requestServer) => {
        set({ loading: true, error: null });

        try {
            const { size, start, filters, sorting } = get();

            // ✅ آماده‌سازی فیلترها با ساختار درست
            const preparedFilters = filters.map((f) => ({
                id: f.id,
                fn: f.fn || "contains",
                datatype: f.datatype || "numeric",
                value: f.value, // اگر عدد بود به عدد تبدیل کن
            }));

            const params = new URLSearchParams();
            params.append("size", String(size));
            params.append("start", String(start));
            params.append("filters", JSON.stringify(preparedFilters));
            params.append("sorting", JSON.stringify(sorting));

            const url = `${GET_DISCOUNT}?${params.toString()}`;

            const res = await requestServer(url, "get", {
                requestOptions: {
                    headers: {
                        Accept: "application/json",
                    },
                },
            });

            const json = res.data;

            set({
                data: json.data || [],
                total: json.meta.totalRowCount || 0,
                loading: false,
            });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || err?.message || "Error fetching discounts",
                loading: false,
            });
        }
    },

    setSize: (size) => set({ size }),
    setStart: (start) => set({ start }),

    // ✅ هر بار که setFilters صدا زده می‌شود، fetchDiscounts هم اجرا می‌شود
    setFilters: async (filters, requestServer) => {
        set({ filters });
        if (requestServer) {
            await get().fetchDiscounts(requestServer);
        }
    },
    nextPage: async (requestServer: any) => {
        const { start, size, total } = get();

        const newStart = start + size;
        if (newStart >= total) return; // اگر صفحه بعدی وجود ندارد

        set({ start: newStart });
        await get().fetchDiscounts(requestServer);
    },

    previousPage: async (requestServer: any) => {
        const { start, size } = get();

        const newStart = start - size;
        if (newStart < 0) return; // اگر صفحه قبلی وجود ندارد

        set({ start: newStart });
        await get().fetchDiscounts(requestServer);
    },

    setSorting: (sorting) => set({ sorting }),

    resetFilters: async (requestServer) => {
        set({
            size: 5,
            start: 0,
            filters: [],
            sorting: [],
        });
        if (requestServer) {
            await get().fetchDiscounts(requestServer);
        }
    },
}));
