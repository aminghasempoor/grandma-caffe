import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Variants } from "motion";
import { useTranslations } from "next-intl";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { LoginFormType } from "@/components/login/index";
import { LoginBackGround } from "@/assets";

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

interface Props {
    form: UseFormReturn<LoginFormType>;
    onSubmit: SubmitHandler<LoginFormType>;
}

const LoginContext = ({ form, onSubmit }: Props) => {
    const t = useTranslations();
    return (
        <div className="relative w-full h-screen">
            <Image
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src={LoginBackGround}
                alt="Login background"
                width={1920}
                height={1080}
                priority
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />
            <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center px-4">
                <Form {...form}>
                    <div className="w-full max-w-md capitalize">
                        <motion.div
                            className="w-full shadow-2xl rounded-lg overflow-hidden"
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                        >
                            <Card className="backdrop-blur-2xl bg-background/40">
                                <CardHeader className="text-center space-y-3 pb-2">
                                    <motion.div variants={itemVariants}>
                                        <CardTitle className="text-4xl font-extrabold">{t("Global.appName")}</CardTitle>
                                    </motion.div>
                                    <motion.div variants={itemVariants} transition={{ delay: 0.1 }}>
                                        <CardDescription className="text-md">{t("Global.motto")}</CardDescription>
                                    </motion.div>
                                </CardHeader>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-2 sm:p-4 pt-0">
                                    <CardContent className="space-y-5">
                                        <motion.div variants={itemVariants} transition={{ delay: 0.2 }}>
                                            <FormField
                                                control={form.control}
                                                name="user_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                placeholder={t("LoginPage.user_name")}
                                                                {...field}
                                                                className="h-10 border-accent"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </motion.div>
                                        <motion.div variants={itemVariants} transition={{ delay: 0.3 }}>
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input
                                                                type="password"
                                                                placeholder={t("LoginPage.password")}
                                                                {...field}
                                                                className="h-10 border-accent"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </motion.div>
                                        <motion.div
                                            variants={itemVariants}
                                            transition={{ delay: 0.4 }}
                                            className="flex space-y-2 justify-between items-center text-sm"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Checkbox id="remember" />
                                                <label htmlFor="remember" className="cursor-pointer select-none">
                                                    {t("LoginPage.remember")}
                                                </label>
                                            </div>
                                        </motion.div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col gap-4 p-6 pt-0">
                                        <motion.div
                                            variants={itemVariants}
                                            transition={{ delay: 0.5 }}
                                            className="w-full"
                                        >
                                            <Button
                                                disabled={form.formState.isSubmitting}
                                                type="submit"
                                                className="w-full cursor-pointer py-3 text-lg font-semibold rounded-md flex items-center justify-center gap-2"
                                            >
                                                {form.formState.isSubmitting
                                                    ? t("Global.loading")
                                                    : t("LoginPage.login")}
                                                <LogIn className="ml-2 h-5 w-5" />
                                            </Button>
                                        </motion.div>
                                    </CardFooter>
                                </form>
                            </Card>
                        </motion.div>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default LoginContext;
