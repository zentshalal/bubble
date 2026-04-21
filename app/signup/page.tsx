import { Star } from "lucide-react";

import SignUpForm from "@/components/signupform";
import FloatingBubbles from "@/components/floatingbubble";

export default function SignUp() {
  return (
    <main className="relative flex min-h-screen justify-center overflow-hidden bg-[#fafafa] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 lg:py-16">
      <FloatingBubbles />
      <div className="relative z-10 flex w-full max-w-6xl overflow-hidden rounded-3xl bg-white/50 shadow-xl lg:h-[820px] lg:rounded-[3rem]">
        <aside className="hidden w-1/2 flex-col justify-between bg-linear-to-br from-brand-secondary/50 to-brand-primary px-12 py-30 text-white lg:flex lg:rounded-l-[3rem]">
          <div className="flex flex-col gap-y-6">
            <h1 className="text-6xl font-bold">
              A Space for Just the Two of You.
            </h1>
            <p className="w-3/4 text-lg">
              Welcome to <span className="font-semibold">Bubble</span>, your
              private digital sanctuary. Share memories, safe-keep your photos,
              and stay connected in a world built exclusively for your
              relationship.
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
                "It feels like our own little secret garden. No ads, no
                followers, just us and our history."
              </p>
              <p className="italic">— Alex & Sam</p>
            </div>
          </div>
        </aside>
        <section className="flex flex-col w-full h-full space-y-8 p-10 lg:h-full lg:w-1/2 lg:space-y-10 lg:rounded-r-[3rem] lg:p-18">
          <div className="flex flex-col gap-5 sm:flex-row sm:justify-between">
            <div className="font-bold tracking-tight text-4xl flex flex-wrap gap-x-2 lg:block">
              <h3 className="text-[#333] ">Sign up to</h3>
              <span className="text-linear text-brand-primary font-extrabold">
                Bubble
              </span>
            </div>
          </div>
          <SignUpForm />
        </section>
      </div>
    </main>
  );
}
