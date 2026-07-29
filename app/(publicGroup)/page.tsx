import { Button } from "@/components/ui/button";
import HeroSection from "./_components/Home/HeroSection";
import { getCategoryAction } from "./_actions/getCategoryAction";
import CategorySection from "./_components/Home/CategorySection";
import { getFeatureServiceAction } from "./_actions/getFeatureServiceAction";
import FeaturedServices from "./_components/Home/FeaturedServices";

export default async function HomePage() {
  const getCategories = await getCategoryAction();
  const featuredServices = await getFeatureServiceAction();
  return (
    <div className="">
      <HeroSection />
      <CategorySection categories={getCategories?.data || []} />
      <FeaturedServices services={featuredServices?.data || []} />
    </div>
  );
}
