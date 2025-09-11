import { z } from "zod";
import { TranslationValues } from "next-intl";

export const loginFormSchema = (t: (key: string, params?: TranslationValues) => string) =>
    z.object({
        user_name: z.string().min(1, { message: t("LoginPage.Required") }),
        password: z
            .string()
            .min(1, { message: t("LoginPage.Required") })
            .min(6, { message: t("LoginPage.minimum_character") })
            .max(15),
    });
