import FrontendLayout from "@/components/layouts/FrontendLayout";
import FilterButton from "@/components/Marketplace/FilterButton";
import Navbar from "@/components/Navbar/Navbar";
import PropertyCard from "@/components/Properties/PropertyCard";
import { dummyProperties } from "@/constants/dummyProperties";
import React from "react";

const MarketPlace = () => {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>

          <FilterButton />
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
          {dummyProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
};

export default MarketPlace;
