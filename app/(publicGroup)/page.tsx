import HeroSection from "./_components/Home/HeroSection";
import { getCategoryAction } from "./_actions/getCategoryAction";
import CategorySection from "./_components/Home/CategorySection";
import { getFeatureServiceAction } from "./_actions/getFeatureServiceAction";
import FeaturedServices from "./_components/Home/FeaturedServices";
import TopTechniciansSection from "./_components/Home/TopTechniciansSection";
import { getTopTechniciansAction } from "./_actions/getTopTechniciansAction";
import WhyChooseUsSection from "./_components/Home/WhyChooseUsSection";
import HowItWorksSection from "./_components/Home/HowItWorksSection";

export default async function HomePage() {
  const getCategories = await getCategoryAction();
  const featuredServices = await getFeatureServiceAction();
  const topTechnicians = await getTopTechniciansAction();
  return (
    <div className="">
      <HeroSection />
      <CategorySection categories={getCategories?.data || []} />
      <FeaturedServices services={featuredServices?.data || []} />
      <TopTechniciansSection technicians={topTechnicians?.data || []} />
      <WhyChooseUsSection />
      <HowItWorksSection />
    </div>
  );
}
