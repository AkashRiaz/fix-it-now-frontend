"use client";

import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:w-7xl">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-blue-600
            px-6
            py-14
            text-center
            text-white
            md:px-12
          "
        >
          {/* Background Decoration */}
          <div
            className="
              absolute
              -right-10
              -top-10
              h-40
              w-40
              rounded-full
              bg-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-16
              -left-10
              h-48
              w-48
              rounded-full
              bg-white/10
            "
          />

          {/* Content */}
          <div className="relative z-10">
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-white/20
              "
            >
              <Wrench size={30} />
            </div>

            <h2
              className="
                text-3xl
                font-bold
                md:text-4xl
              "
            >
              Need Home Service?
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-lg
                text-blue-100
              "
            >
              Book your trusted technician today and get quality service at your
              doorstep.
            </p>

            <Link href="/services">
              <Button
                size="lg"
                className="
                  mt-8
                  bg-white
                  text-blue-600
                  hover:bg-gray-100
                "
              >
                Browse Services
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
