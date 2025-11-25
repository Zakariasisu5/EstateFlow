import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { dummyProperties } from "@/data/dummyProperties";

interface FilterBarProps {
  onFilterChange: (filters: { country: string; city: string }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");

  // Get unique countries and cities
  const countries = useMemo(() => {
    const unique = Array.from(new Set(dummyProperties.map(p => p.country))).sort();
    return unique;
  }, []);

  const cities = useMemo(() => {
    if (selectedCountry === "all") {
      return Array.from(new Set(dummyProperties.map(p => p.city))).sort();
    }
    return Array.from(
      new Set(
        dummyProperties
          .filter(p => p.country === selectedCountry)
          .map(p => p.city)
      )
    ).sort();
  }, [selectedCountry]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedCity("all");
    onFilterChange({ country: value, city: "all" });
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
    onFilterChange({ country: selectedCountry, city: value });
  };

  const handleClearFilters = () => {
    setSelectedCountry("all");
    setSelectedCity("all");
    onFilterChange({ country: "all", city: "all" });
  };

  const hasActiveFilters = selectedCountry !== "all" || selectedCity !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card/50 backdrop-blur border-b border-border/50">
      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">🌍 Country:</span>
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="flex-1 bg-background/50">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">📍 City:</span>
        <Select value={selectedCity} onValueChange={handleCityChange}>
          <SelectTrigger className="flex-1 bg-background/50">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
