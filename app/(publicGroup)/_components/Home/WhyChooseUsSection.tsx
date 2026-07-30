"use client";

import { ShieldCheck, CreditCard, Zap, Headphones } from "lucide-react";

const features = [
  {
    title: "Verified Professionals",
    description:
      "All technicians are verified to provide safe and reliable home services.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Payments",
    description:
      "Your payments are protected with secure and trusted payment methods.",
    icon: CreditCard,
  },
  {
    title: "Fast Booking",
    description:
      "Find and book skilled technicians quickly whenever you need help.",
    icon: Zap,
  },
  {
    title: "24/7 Support",
    description: "Our support team is always available to assist you anytime.",
    icon: Headphones,
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:w-7xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>

          <p className="mt-3 text-gray-600">
            We make finding trusted home services simple, safe, and convenient.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  rounded-2xl
                  border
                  bg-white
                  p-6
                  text-center
                  transition
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    text-blue-600
                  "
                >
                  <Icon size={28} />
                </div>

                <h3
                  className="
                    mt-5
                    font-bold
                    text-gray-900
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-gray-600
                  "
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
