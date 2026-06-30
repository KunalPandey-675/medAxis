import { Card, CardContent } from "~/components/ui/card";
import type { Route } from "../+types/root";
import { AlertCircle, ChevronRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { CustomInput } from "@/components/global/CustomInput";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/components/auth/login.schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Loader from "@/components/global/Loader";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login" },
        { name: "description", content: "Login to our amazing Med Axis" },
    ];
}

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
    const [globalError, setGlobalError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { data: session, isPending } = authClient.useSession()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "", rememberMe: false },
    });


    if (isPending) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Loader label="Loading..." />
            </div>
        )
    }

    if (session) {
        return <Navigate to="/dashboard" replace />;
    }

    const onSubmit = async (data: LoginFormValues) => {
        setGlobalError("")
        setIsLoading(true)
        await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
                rememberMe: data.rememberMe,
            },
            {
                onSuccess: () => {
                    toast.success("Login Successful!");
                    navigate("/dashboard");
                },
                onError: (ctx) => {
                    setGlobalError(ctx.error.message);
                },
            },
        );
        setIsLoading(false);
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
            <Card className="rounded-lg shadow-2xl card backdrop-blur-xl">
                <CardContent className="p-10 min-w-100 md:min-w-140.5">
                    <div className="flex flex-col items-center mb-10">
                        <div className="bg-white/5 border border-border p-3 rounded-2xl shadow-lg mb-4">
                            <img src="/logo.svg" alt="MedAxis" className="w-10 h-10" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                            Med Axis
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                            Secure Provider Portal
                        </p>
                    </div>
                    {globalError && (
                        <div className="mb-6 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm flex items-center gap-3 border border-red-100 dark:border-red-900/50 animate-in slide-in-from-top-2 fade-in">
                            <AlertCircle size={18} className="shrink-0" />
                            <span className="font-medium">{globalError}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <CustomInput
                            control={form.control}
                            name="email"
                            label="Email Address"
                            placeholder="name@hospital.com"
                            type="email"
                            startIcon={<Mail size={18} />} />
                        <CustomInput
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            startIcon={<Lock size={18} />}
                        />
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    onCheckedChange={(checked) =>
                                        form.setValue("rememberMe", checked as boolean)
                                    }
                                    className="border-slate-200 dark:border-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm font-medium leading-none text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                                >
                                    Keep me signed in
                                </label>
                            </div>
                            <button
                                type="button"
                                className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                                Forgot?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white rounded-2xl py-6 font-bold text-base shadow-xl shadow-slate-200 dark:shadow-blue-900/20 transition-all active:scale-[0.98] group"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Verifying...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    Sign Into Portal
                                    <ChevronRight
                                        size={18}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
