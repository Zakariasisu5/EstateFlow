import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Property } from "@/data/dummyProperties";
import PropertyGallery from "./PropertyGallery";
import { MapPin, Bed, Bath, Maximize, Calendar, School, ShoppingBag, Bus, CheckCircle } from "lucide-react";

interface PropertyDetailProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

const PropertyDetail = ({ property, open, onClose, onBookTour }: PropertyDetailProps) => {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <PropertyGallery images={property.images} title={property.title} />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{property.price}</div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>
            </div>
            <Button onClick={onBookTour} size="lg" className="rounded-full bg-primary hover:bg-primary-dark">
              <Calendar className="w-4 h-4 mr-2" />
              Book a Tour
            </Button>
          </div>

          <div className="flex gap-6 py-4 border-y">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.bedrooms}</span>
              <span className="text-muted-foreground">Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.bathrooms}</span>
              <span className="text-muted-foreground">Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-5 h-5 text-primary" />
              <span className="font-semibold">{property.area}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Nearby Places</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <School className="w-4 h-4 text-primary" />
                  Schools
                </div>
                {property.nearbyPlaces.schools.map((school, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{school}</p>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  Shopping
                </div>
                {property.nearbyPlaces.malls.map((mall, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{mall}</p>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Bus className="w-4 h-4 text-primary" />
                  Transport
                </div>
                {property.nearbyPlaces.transport.map((transport, index) => (
                  <p key={index} className="text-sm text-muted-foreground">{transport}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Location Map</h3>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
              <MapPin className="w-8 h-8 mr-2" />
              Map placeholder - Ready for Google Maps integration
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetail;
