import { Star } from "lucide-react";

import FloatingBubbles from "@/components/floatingbubble";

import LogInForm from "@/components/loginform";

import * as motion from "motion/react-client";

export default function LogIn() {
  return (
    <main className="relative flex min-h-screen justify-center overflow-hidden bg-[#fafafa] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-16">
      <FloatingBubbles />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="relative z-10 flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white/50 shadow-xl lg:h-[820px] lg:rounded-[3rem]">
          <section className="flex flex-col w-full h-full space-y-8 p-10 lg:h-full lg:w-1/2 lg:space-y-10 lg:rounded-r-[3rem] lg:p-18">
            <div className="flex flex-col justify-center sm:flex-row sm:justify-between">
              <div className="font-bold tracking-tight text-4xl flex flex-wrap gap-x-2 lg:block">
                <h3 className="text-[#333] ">Log in to</h3>
                <span className="text-linear text-brand-primary font-extrabold">
                  Bubble
                </span>
              </div>
            </div>
            <LogInForm />
          </section>
          <aside className="hidden w-1/2 flex-col justify-between bg-linear-to-br from-brand-secondary/50 to-brand-primary px-12 py-30 text-white lg:flex lg:rounded-r-[3rem]">
            <div className="flex flex-col gap-y-6">
              <h1 className="text-6xl font-bold">
                Welcome Back to Your Sanctuary.
              </h1>
              <p className="w-3/4 text-lg">
                Your memories are waiting. Dive back into your private space to
                share new photos, safe-keep your latest secrets, and stay
                connected in your exclusive world.
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center">
                <Star fill={"white"} stroke="2" />
                <Star fill={"white"} stroke="2" />
                <Star fill={"white"} stroke="2" />
                <Star fill={"white"} stroke="2" />
                <Star fill={"white"} stroke="2" />
              </div>
              <div className="text-lg flex flex-col gap-y-1">
                <p className="w-4/5">
                  "Five stars. It’s the first thing we check in the morning and
                  the last thing at night. Our digital home."
                </p>
                <p className="italic">— Sarah & Mike</p>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </main>
  );
}
