import { getProperties } from "@/server-actions/getProperties";
import PropertyCard from "../Properties/PropertyCard";
import { Property } from "@/types/Property";
import EmptyState from "../ui/EmptyState";

interface MarketPlaceProps {
  searchParams: {
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const MarketPlace = async ({ searchParams }: MarketPlaceProps) => {
  const properties: Property[] = await getProperties({
    search: searchParams.search,
    address: searchParams.address,
    location: searchParams.location,
    propertyType: searchParams.propertyType,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  if (properties.length === 0) {
    return (
      <EmptyState
        title="No matching Properties"
        subTitle="Try adjusting your search criteria or clearing some filters to see more results."
        filter={true}
      />
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default MarketPlace;
