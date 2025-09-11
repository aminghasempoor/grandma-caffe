"use client";
import { loginFormSchema } from "@/lib/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useRequest from "@/hooks/useRequest";
import { useTranslations } from "next-intl";
import useUserStore from "@/stores/userStore";
import { GET_LOGIN_ROUTE } from "@/utils/apiRoutes";
import LoginContext from "@/components/login/LoginContext";

export type LoginFormType = z.infer<ReturnType<typeof loginFormSchema>>;
export default function Login() {
    const t = useTranslations();
    const requestServer = useRequest({ notification: true });
    const { setToken, getUser } = useUserStore();
    const form = useForm({
        resolver: zodResolver(loginFormSchema(t)),
        mode: "onChange",
        defaultValues: {
            user_name: "",
            password: "",
        },
    });
    async function onSubmit(values: LoginFormType) {
        try {
            const response = (await requestServer(GET_LOGIN_ROUTE, "post", {
                data: {
                    username: values.user_name,
                    password: values.password,
                },
                success: {
                    notification: { show: true },
                },
            })) as { data: { access: string; refresh: string } };
            setToken(response.data.access);
            await getUser();
        } catch (error) {
            console.log(error);
        }
    }

    return <LoginContext form={form} onSubmit={onSubmit} />;
}
