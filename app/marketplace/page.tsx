import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/Navbar/Navbar";
import PropertyCard from "@/components/Properties/PropertyCard";
import Button from "@/components/ui/Button";
import { dummyProperties } from "@/constants/dummyProperties";
import React from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const MarketPlace = () => {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-12 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>

          <Button
            variant="outline"
            icon={<HiOutlineAdjustmentsHorizontal size={20} />}
          >
            Filter
          </Button>
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
