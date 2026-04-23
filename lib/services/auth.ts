import { createClient } from "@/lib/supabase/client";

import { toast } from "sonner";

import { signUpSchema, logInSchema } from "@/lib/validation/auth";

import { z } from "zod";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const toastBaseClassName =
  "!border-l-4 !rounded-xl !border !border-neutral-200 !bg-white !text-[#333] !font-semibold !shadow-xl";
const toastErrorClassName = `${toastBaseClassName} !border-l-red-500`;
const toastSuccessClassName = `${toastBaseClassName} !border-l-brand-primary`;

type SignUpFormData = z.infer<typeof signUpSchema>;
type LogInFormData = z.infer<typeof logInSchema>;

export const authService = {
  async onGoogleSignUp(setIsGoogleSubmitting: (bool: boolean) => void) {
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
  },

  async onGoogleLogIn(setIsGoogleSubmitting: (bool: boolean) => void) {
    setIsGoogleSubmitting(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Google log in failed", {
        position: "top-center",
        description: error.message,
        className: toastErrorClassName,
        descriptionClassName: "text-[#333]",
      });
      setIsGoogleSubmitting(false);
    }
  },

  async signUpSubmit(
    data: SignUpFormData,
    reset: () => void,
    router: AppRouterInstance,
  ) {
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
  },

  async logInSubmit(data: LogInFormData, router: AppRouterInstance) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      toast.error("Log in failed", {
        position: "top-center",
        description: error.message,
        className: toastErrorClassName,
        descriptionClassName: "text-[#333]",
      });
      return;
    }

    toast.success("Log in Successful", {
      position: "top-center",
      description: "Welcome back!",
      className: toastSuccessClassName,
      descriptionClassName: "!text-[#333]",
    });

    router.refresh();
  },
};
