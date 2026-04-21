"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import Link from "next/link";

export default function LogInForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  return (
    <form className="w-full h-full flex gap-y-4 flex-col lg:justify-start">
      <div className="relative flex flex-col gap-y-2">
        <Label className="text-[#333] font-semibold text-sm">Email</Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            placeholder=" "
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
        <div className="relative">
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder=" "
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

      <div className="text-sm font-normal mx-auto text-[#a5a5a5]">
        <p>
          New to Bubble?{" "}
          <Link href="/signup" className="text-brand-primary font-medium">
            Create an account
          </Link>
        </p>
      </div>

      <Button
        type="submit"
        className="bg-linear-to-br border-none from-brand-secondary to-brand-primary text-lg w-full py-6 cursor-pointer rounded-full shadow-brand-secondary shadow-lg my-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Log In
      </Button>

      <div className="flex items-center gap-x-2 h-[2px] my-2">
        <div className="w-full h-full bg-neutral-200"></div>
        <p>Or</p>
        <div className="w-full h-full bg-neutral-200"></div>
      </div>

      <Button
        type="button"
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
        Log In With Google
      </Button>
    </form>
  );
}
