"use client";

import {
  Search,
  UserCheck,
  CalendarClock,
  CheckCircle,
  CreditCard,
  PartyPopper,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Service",
    description:
      "Select the service you need from our wide range of home solutions.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Technician",
    description:
      "Choose a verified professional based on rating, location, and price.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Book Time",
    description: "Pick your preferred date and time for the service.",
    icon: CalendarClock,
  },
  {
    number: "04",
    title: "Technician Accepts",
    description: "Your selected technician confirms and prepares for the job.",
    icon: CheckCircle,
  },
  {
    number: "05",
    title: "Pay Online",
    description: "Complete secure payment after confirming your booking.",
    icon: CreditCard,
  },
  {
    number: "06",
    title: "Job Completed",
    description: "Enjoy quality service and rate your experience.",
    icon: PartyPopper,
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:w-7xl">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>

          <p className="mt-3 text-gray-600">
            Get your home service completed in just a few simple steps.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Line */}
            <div
              className="
                absolute
                left-0
                right-0
                top-12
                mx-auto
                h-1
                w-[85%]
                bg-blue-100
              "
            />

            <div className="grid grid-cols-6 gap-5">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="relative text-center">
                    <div
                      className="
                        relative
                        mx-auto
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        border-4
                        border-white
                        bg-blue-600
                        text-white
                        shadow-lg
                      "
                    >
                      <Icon size={32} />

                      <span
                        className="
                          absolute
                          -right-2
                          -top-2
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          bg-white
                          text-sm
                          font-bold
                          text-blue-600
                          shadow
                        "
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3
                      className="
                        mt-5
                        font-bold
                        text-gray-900
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-5
                        text-gray-600
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / Tablet */}
        <div className="grid gap-6 lg:hidden">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="
                  flex
                  gap-4
                  rounded-xl
                  border
                  bg-white
                  p-5
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-white
                  "
                >
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {step.number}. {step.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
