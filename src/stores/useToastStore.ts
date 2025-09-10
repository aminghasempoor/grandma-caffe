"use client";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export type ToastType = "pending" | "error" | "warning" | "success";

interface ToastStoreState {
    toastLists: {
        pending: string[];
        error: string[];
        warning: string[];
        success: string[];
    };
    pushToastList: (toast_type: ToastType, toast_id: string) => void;
    dismissToastList: (toast_types: ToastType[]) => void;
}

const ToastStore = create<ToastStoreState>((set) => ({
    toastLists: {
        pending: [],
        error: [],
        warning: [],
        success: [],
    },

    pushToastList: (toast_type, toast_id) =>
        set((state) => ({
            toastLists: {
                ...state.toastLists,
                [toast_type]: [...state.toastLists[toast_type], toast_id],
            },
        })),

    dismissToastList: (toast_types) =>
        set((state) => {
            toast_types.forEach((type) => {
                state.toastLists[type].forEach((id) => {
                    toast.dismiss(id);
                });
            });

            const newToastLists = { ...state.toastLists };
            toast_types.forEach((type) => {
                newToastLists[type] = [];
            });

            return { toastLists: newToastLists };
        }),
}));

export default ToastStore;
