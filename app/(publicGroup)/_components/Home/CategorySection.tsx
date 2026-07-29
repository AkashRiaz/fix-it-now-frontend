"use client";

import {
  Wrench,
  Zap,
  Paintbrush,
  Sparkles,
  Hammer,
  Snowflake,
  Refrigerator,
  MoreHorizontal,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Plumbing: Wrench,
  Electrical: Zap,
  Cleaning: Sparkles,
  Painting: Paintbrush,
  Carpentry: Hammer,
  "AC Repair": Snowflake,
  "Appliance Repair": Refrigerator,
};

type Category = {
  id: string;
  name: string;
};

interface CategorySectionProps {
  categories: Category[];
}

const CategorySection = ({ categories }: CategorySectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore Our Services
          </h2>

          <p className="mt-3 text-gray-600">
            Find trusted professionals for your home needs
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.name] || MoreHorizontal;

            return (
              <div
                key={category.id}
                className="
                  group
                  cursor-pointer
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
                    mb-4
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    text-blue-600
                    transition
                    group-hover:bg-blue-600
                    group-hover:text-white
                  "
                >
                  <Icon size={28} />
                </div>

                <h3 className="font-semibold text-gray-900">{category.name}</h3>

                <p className="mt-1 text-sm text-gray-500">Book now</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
