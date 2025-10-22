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

    fetchDiscounts: (requestServer: any) => Promise<void>;
    setSize: (size: number) => void;
    setStart: (start: number) => void;
    setFilters: (filters: any[]) => void;
    setSorting: (sorting: any[]) => void;
    resetFilters: () => void;
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

    // ✅ build query like /api/discounts?size=5&start=0&filters=[]&sorting=[]
    fetchDiscounts: async (requestServer) => {
        set({ loading: true, error: null });

        try {
            const { size, start, filters, sorting } = get();

            const params = new URLSearchParams();
            params.append("size", String(size));
            params.append("start", String(start));
            params.append("filters", JSON.stringify(filters));
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
                total: json.total || 0,
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
    setFilters: (filters) => set({ filters }),
    setSorting: (sorting) => set({ sorting }),

    resetFilters: () =>
        set({
            size: 5,
            start: 0,
            filters: [],
            sorting: [],
        }),
}));
