import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Property } from "@/data/dummyProperties";

interface PropertyCardProps {
  property: Property;
  onViewDetails: () => void;
  onBookTour: () => void;
}

const PropertyCard = ({ property, onViewDetails, onBookTour }: PropertyCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift animate-scale-in bg-card shadow-sm border-border/50">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          {property.price}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1">{property.title}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{property.area}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={onViewDetails}
            variant="outline"
            size="sm"
            className="flex-1 rounded-full hover:bg-accent"
          >
            View Details
          </Button>
          <Button
            onClick={onBookTour}
            size="sm"
            className="flex-1 rounded-full bg-primary hover:bg-primary-dark"
          >
            Book Tour
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
