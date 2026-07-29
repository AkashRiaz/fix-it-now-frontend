"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Star, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-4 py-16 lg:py-24 w-7xl ">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <ShieldCheck size={16} />
              Trusted Home Service Platform
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Find Trusted <span className="text-blue-600">Home Services</span>{" "}
              Near You
            </h1>

            {/* Description */}
            <p className="max-w-xl text-lg text-gray-600">
              Book experienced technicians for plumbing, electrical, cleaning,
              painting, appliance repair, and much more.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Become a Technician
                </Button>
              </Link>
            </div>

            {/* Small Trust Stats */}
            <div className="flex flex-wrap gap-6 pt-5">
              <div className="flex items-center gap-2">
                <Users className="text-blue-600" size={22} />

                <div>
                  <p className="font-bold text-gray-900">500+</p>
                  <p className="text-sm text-gray-500">Customers</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={22} />

                <div>
                  <p className="font-bold text-gray-900">4.9/5</p>

                  <p className="text-sm text-gray-500">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
                unoptimized
                alt="Professional technician providing home service"
                width={700}
                height={700}
                priority
                className="h-[450px] w-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 rounded-xl bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <ShieldCheck className="text-green-600" size={22} />
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Verified Technicians
                  </p>

                  <p className="text-sm text-gray-500">
                    Safe & Reliable Service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
