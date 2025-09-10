"use client";
import { GET_USER_ROUTE } from "@/utils/apiRoutes";
import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: number;
    first_name: string | null;
    last_name: string | null;
    phone_number: string;
    email: string | null;
    gender: "male" | "female" | null;
    job_field: string | null;
    province_id: number | null;
    province_fa: string | null;
    city_id: number | null;
    city_fa: string | null;
    national_code: string | null;
    vehicle_type: string | null;
    is_valid: boolean;
}

interface UserStoreState {
    isAuth: boolean;
    errorState: boolean;
    userChangedLanguage: boolean;
    initAuthState: boolean;
    token: string | null;
    user: User;
    clearUser: () => void;
    changeUser: (user: User) => void;
    changeUserLanguage: (language: string) => void;
    changeAuthState: (isAuth: boolean) => void;
    changeInitAuth: (initAuthState: boolean) => void;
    changeLanguageState: (userChangedLanguage: boolean) => void;
    clearToken: () => void;
    logout: () => Promise<void>;
    setToken: (token: string) => void;
    getUser: () => Promise<void>;
    initialize: () => Promise<void>;
}

const defaultUser: User = {
    id: 0,
    first_name: null,
    last_name: null,
    phone_number: "",
    email: "",
    gender: null,
    job_field: null,
    province_id: null,
    province_fa: null,
    city_id: null,
    city_fa: null,
    national_code: null,
    vehicle_type: null,
    is_valid: false,
};

const useUserStore = create<UserStoreState>()(
    persist(
        (set, get) => ({
            isAuth: false,
            userChangedLanguage: false,
            initAuthState: false,
            errorState: false,
            token: null,
            user: defaultUser,

            clearUser: () => set({ user: defaultUser }),

            changeUser: (user: User) => set({ user, isAuth: true }),

            changeUserLanguage: (language: string) =>
                set((state) => ({
                    user: { ...state.user, user_language: language },
                })),

            changeAuthState: (isAuth: boolean) => set({ isAuth }),

            changeInitAuth: (initAuthState: boolean) => set({ initAuthState }),

            changeLanguageState: (userChangedLanguage: boolean) => set({ userChangedLanguage }),

            clearToken: () => {
                set({ token: null, isAuth: false });
                set({ initAuthState: true });
                Cookies.remove("_token");
            },

            setToken: (token: string) => {
                set({ token, initAuthState: true });
                Cookies.set("_token", token, { sameSite: "strict" });
            },

            logout: async () => {
                get().clearUser();
                get().changeAuthState(false);
                get().changeInitAuth(true);
                get().clearToken();
                set({ isAuth: false });
            },

            getUser: async () => {
                const token = get().token;
                if (!token) return;

                try {
                    const { data } = await axios.get(GET_USER_ROUTE, {
                        headers: { authorization: `Bearer ${token}` },
                    });
                    set({
                        user: data.data,
                        isAuth: true,
                        initAuthState: true,
                        errorState: false,
                    });
                } catch (error: unknown) {
                    // @ts-ignore -- no type for error
                    if (axios.isAxiosError(error) && error.response?.status === 401) {
                        get().clearToken();
                    }
                    set({
                        isAuth: false,
                        initAuthState: true,
                        errorState: true,
                    });
                }
            },

            initialize: async () => {
                const token = get().token;
                if (!token) {
                    get().clearUser();
                    get().changeAuthState(false);
                    get().changeInitAuth(true);
                    get().changeLanguageState(false);
                    return;
                }
                await get().getUser();
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuth: state.isAuth,
            }),
        }
    )
);

export default useUserStore;
