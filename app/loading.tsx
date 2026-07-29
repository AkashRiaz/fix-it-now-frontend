import { Wrench, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 px-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[120px] dark:bg-blue-600/20" />
      <div className="absolute top-1/3 right-1/3 -z-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-[90px]" />

      <div className="flex flex-col items-center text-center">
        {/* Animated Glass Icon Badge */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/80 border border-white/90 shadow-2xl backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800">
          {/* Animated Outer Spinning Gradient Ring */}
          <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-75 blur-xs animate-spin [animation-duration:3s]" />

          {/* Inner Badge Icon */}
          <div className="relative flex h-full w-full items-center justify-center rounded-[22px] bg-white dark:bg-slate-900">
            <Wrench className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>

          {/* Floating Sparkle Accent */}
          <div className="absolute -top-2 -right-2 rounded-full bg-blue-600 p-1.5 text-white shadow-md animate-bounce [animation-duration:2s]">
            <Sparkles className="h-4 w-4" />
          </div>
        </div>

        {/* Brand Header */}
        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          FixIt<span className="text-blue-600 dark:text-blue-400">Now</span>
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
          Fixing up your request... Please wait
        </p>

        {/* Subtle Animated Progress Bar */}
        <div className="relative mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
          <div className="absolute inset-y-0 w-2/3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 animate-pulse" />
        </div>
      </div>
    </main>
  );
}
