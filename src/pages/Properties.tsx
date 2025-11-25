import { useState, useMemo } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import FilterBar from "@/components/filters/FilterBar";
import PropertyCard from "@/components/properties/PropertyCard";
import PropertyDetail from "@/components/properties/PropertyDetail";
import BookingModal from "@/components/booking/BookingModal";
import { dummyProperties, Property } from "@/data/dummyProperties";

const Properties = () => {
  const [filters, setFilters] = useState({ country: "all", city: "all" });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showPropertyDetail, setShowPropertyDetail] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const filteredProperties = useMemo(() => {
    return dummyProperties.filter((property) => {
      if (filters.country !== "all" && property.country !== filters.country) {
        return false;
      }
      if (filters.city !== "all" && property.city !== filters.city) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      <header className="border-b bg-card/50 backdrop-blur px-4 py-3 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-semibold">EstateFlow</h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <FilterBar onFilterChange={setFilters} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {filters.country !== "all" || filters.city !== "all"
              ? `Properties in ${filters.city !== "all" ? filters.city + ", " : ""}${filters.country !== "all" ? filters.country : "All Locations"}`
              : "All Properties Worldwide 🌍"}
          </h2>
          <p className="text-muted-foreground">
            {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} available
          </p>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No properties found with the selected filters
            </p>
            <Button
              onClick={() => setFilters({ country: "all", city: "all" })}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={() => {
                  setSelectedProperty(property);
                  setShowPropertyDetail(true);
                }}
                onBookTour={() => {
                  setSelectedProperty(property);
                  setShowBooking(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      <PropertyDetail
        property={selectedProperty}
        open={showPropertyDetail}
        onClose={() => setShowPropertyDetail(false)}
        onBookTour={() => {
          setShowPropertyDetail(false);
          setShowBooking(true);
        }}
      />

      <BookingModal
        property={selectedProperty}
        open={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </div>
  );
};

export default Properties;
