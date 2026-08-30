import FrontendLayout from "@/components/layouts/FrontendLayout";
import FilterButton from "@/components/Marketplace/FilterButton";
import MarketPlace from "@/components/Marketplace/MarketPlace";
import Navbar from "@/components/Navbar/Navbar";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import { Suspense } from "react";

type MarketPageProps = {
  searchParams: Promise<{
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
};

const MarketPlacePage = async ({ searchParams }: MarketPageProps) => {
  const params = await searchParams;

  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>

          <FilterButton />
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <MarketPlace searchParams={params} />
        </Suspense>
      </div>
    </FrontendLayout>
  );
};

export default MarketPlacePage;
