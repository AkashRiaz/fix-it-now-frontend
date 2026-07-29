"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 px-6 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background Decorative Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/15" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-[100px] dark:bg-cyan-500/10" />

      {/* Decorative Floating Theme Watermarks */}
      <div className="pointer-events-none absolute left-12 top-1/4 hidden text-slate-200/60 dark:text-slate-800/40 md:block animate-bounce [animation-duration:6s]">
        <Wrench className="h-20 w-20 -rotate-12" />
      </div>
      <div className="pointer-events-none absolute right-16 bottom-1/4 hidden text-slate-200/60 dark:text-slate-800/40 md:block animate-bounce [animation-duration:8s]">
        <Search className="h-24 w-24 rotate-12" />
      </div>

      <div className="relative z-10 max-w-xl text-center">
        {/* Hero 404 Graphic */}
        <div className="relative mb-2 inline-block">
          <h1 className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 sm:text-9xl">
            404
          </h1>
          {/* Glowing Pill Indicator */}
          <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
        </div>

        {/* Main Text Header */}
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Oops! Page not found
        </h2>

        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist, may have been
          moved, or the URL might be incorrect. Let&apos;s get your tools ready
          and head back!
        </p>

        {/* Interactive Center Glass Card */}
        <div className="my-8 flex justify-center">
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white/70 border border-white/80 shadow-xl backdrop-blur-md dark:bg-slate-900/70 dark:border-slate-800 group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
            {/* Outer Glowing Ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur group-hover:opacity-40 transition duration-300" />

            <Search
              className="relative h-14 w-14 text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:rotate-12"
              strokeWidth={1.75}
            />

            <span className="absolute -bottom-3 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-md">
              Lost? 🔧
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.back()}
            className="rounded-xl border-slate-200 bg-white/60 text-slate-700 backdrop-blur-sm transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>

          <Link href="/">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-xl bg-blue-600 font-medium text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 cursor-pointer"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </Link>

          <Link href="/services">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto rounded-xl bg-slate-200/70 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Services
            </Button>
          </Link>
        </div>

        {/* Footer Information */}
        <p className="mt-10 text-xs text-slate-400 dark:text-slate-500">
          Error Code:{" "}
          <span className="font-mono font-semibold text-slate-500 dark:text-slate-400">
            404
          </span>{" "}
          · Resource not found
        </p>
      </div>
    </main>
  );
}
