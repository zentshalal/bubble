"use client";

import { Eye, EyeOff } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { signUpSchema } from "@/lib/validation/auth";

import { toast } from "sonner";

type SignUpFormData = z.infer<typeof signUpSchema>;

const toastBaseClassName =
  "!border-l-4 !rounded-xl !border !border-neutral-200 !bg-white !text-[#333] !font-semibold !shadow-xl";

const toastErrorClassName = `${toastBaseClassName} !border-l-red-500`;
const toastSuccessClassName = `${toastBaseClassName} !border-l-brand-primary`;

export default function SignUpForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormData) {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          avatar_url: "https://canva.link/kbf7ci7xns6z0jr",
        },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast.error("Sign up failed", {
        position: "top-center",
        description: error.message,
        className: toastErrorClassName,
        descriptionClassName: "text-[#333]",
      });
      return;
    }

    toast.success("Account created", {
      position: "top-center",
      description: "Check your inbox to confirm your email before login.",
      className: toastSuccessClassName,
      descriptionClassName: "!text-[#333]",
    });
    reset();
    router.refresh();
  }

  async function onGoogleSignUp() {
    setIsGoogleSubmitting(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Google sign up failed", {
        position: "top-center",
        description: error.message,
        className: toastErrorClassName,
        descriptionClassName: "text-[#333]",
      });
      setIsGoogleSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col gap-y-4 justify-center lg:justify-start"
    >
      <div className="relative flex flex-col gap-y-2">
        <Label className="text-[#333] font-semibold text-sm">Username</Label>
        {errors.username && (
          <p className="lg:absolute lg:top-1 lg:right-2 lg:truncate text-xs text-red-500">
            {touchedFields.username && errors.username?.message
              ? String(errors.username.message)
              : "\u00A0"}
          </p>
        )}
        <div className="relative">
          <Input
            {...register("username")}
            id="username"
            placeholder=" "
            aria-invalid={!!errors.username}
            className="peer h-14 rounded-xl border border-neutral-400 bg-transparent px-3 pb-2 pt-5 text-[#333] focus:border-brand-primary focus:bg-brand-secondary/5"
          />
          <label
            htmlFor="username"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1 text-sm text-neutral-400 transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[11px] peer-focus:text-brand-primary"
          >
            Username
          </label>
        </div>
      </div>

      <div className="relative flex flex-col gap-y-2">
        <Label className="text-[#333] font-semibold text-sm">Email</Label>
        {errors.email && (
          <p className="lg:absolute lg:top-1 lg:right-2 lg:truncate text-xs text-red-500">
            {touchedFields.email && errors.email?.message
              ? String(errors.email.message)
              : "\u00A0"}
          </p>
        )}
        <div className="relative">
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder=" "
            aria-invalid={!!errors.email}
            className="peer h-14 rounded-xl border border-neutral-400 bg-transparent px-3 pb-2 pt-5 text-[#333] focus:border-brand-primary focus:bg-brand-secondary/5"
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1 text-sm text-neutral-400 transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[11px] peer-focus:text-brand-primary"
          >
            Email
          </label>
        </div>
      </div>

      <div className="relative flex flex-col gap-y-2">
        <Label className="text-[#333] font-semibold text-sm">Password</Label>
        {errors.password && (
          <p className="lg:absolute lg:top-1 lg:right-2 lg:truncate text-xs text-red-500">
            {touchedFields.password && errors.password?.message
              ? String(errors.password.message)
              : "\u00A0"}
          </p>
        )}
        <div className="relative">
          <Input
            {...register("password")}
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder=" "
            aria-invalid={!!errors.password}
            className="peer h-14 rounded-xl border border-neutral-400 bg-transparent px-3 pb-2 pt-5 text-[#333] focus:border-brand-primary focus:bg-brand-secondary/5"
          />
          <button
            type="button"
            className="absolute text-brand-primary top-3 right-3 rounded-full bg-neutral-100 hover:bg-neutral-200 p-2 transition-colors"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            aria-label="Show/Hide password"
          >
            {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          <label
            htmlFor="password"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1 text-sm text-neutral-400 transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[11px] peer-focus:text-brand-primary"
          >
            Password
          </label>
        </div>
      </div>

      <div className="relative flex flex-col gap-y-2">
        <Label className="text-[#333] font-semibold text-sm">
          Confirm Password
        </Label>
        {errors.confirmPassword && (
          <p className="lg:absolute lg:top-1 lg:right-2 lg:truncate text-xs text-red-500">
            {touchedFields.confirmPassword && errors.confirmPassword?.message
              ? String(errors.confirmPassword.message)
              : "\u00A0"}
          </p>
        )}
        <div className="relative">
          <Input
            {...register("confirmPassword")}
            id="confirm-password"
            type={isConfirmVisible ? "text" : "password"}
            placeholder=" "
            aria-invalid={!!errors.confirmPassword}
            className="peer h-14 rounded-xl border border-neutral-400 bg-transparent px-3 pb-2 pt-5 text-[#333] focus:border-brand-primary focus:bg-brand-secondary/5"
          />
          <button
            type="button"
            className="absolute text-brand-primary top-3 right-3 rounded-full bg-neutral-100 hover:bg-neutral-200 p-2 transition-colors"
            onClick={() => setIsConfirmVisible((prev) => !prev)}
            aria-label="Show/Hide password"
          >
            {isConfirmVisible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
          <label
            htmlFor="confirm-password"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1 text-sm text-neutral-400 transition-all duration-200 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[11px] peer-focus:text-brand-primary"
          >
            Confirm Password
          </label>
        </div>
      </div>

      <div className="text-sm font-normal mx-auto text-[#a5a5a5]">
        <p>
          Already have an account ?{" "}
          <Link href="/login" className="text-brand-primary font-medium">
            Log in
          </Link>
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-linear-to-br border-none from-brand-secondary to-brand-primary text-lg w-full py-6 cursor-pointer rounded-full shadow-brand-secondary shadow-lg my-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </Button>

      <div className="flex items-center gap-x-2 h-[2px] my-2">
        <div className="w-full h-full bg-neutral-200"></div>
        <p>Or</p>
        <div className="w-full h-full bg-neutral-200"></div>
      </div>

      <Button
        type="button"
        onClick={onGoogleSignUp}
        disabled={isGoogleSubmitting}
        className="border border-brand-primary text-brand-primary bg-transparent w-full p-5 rounded-full cursor-pointer mx-auto shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          width="800px"
          height="800px"
          viewBox="-3 0 262 262"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
          className="h-5 w-5"
        >
          <path
            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            fill="#4285F4"
          />
          <path
            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            fill="#34A853"
          />
          <path
            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            fill="#FBBC05"
          />
          <path
            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            fill="#EB4335"
          />
        </svg>
        {isGoogleSubmitting
          ? "Redirecting to Google..."
          : "Sign Up with Google"}
      </Button>
    </form>
  );
}
