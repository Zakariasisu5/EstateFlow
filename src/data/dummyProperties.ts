export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  images: string[];
  panoramaUrl: string;
  description: string;
  features: string[];
  nearbyPlaces: {
    schools: string[];
    malls: string[];
    transport: string[];
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const dummyProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: "$450,000",
    location: "Downtown, City Center",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000",
    description: "Stunning modern apartment with city views, high ceilings, and premium finishes. Perfect for young professionals.",
    features: ["City Views", "Gym Access", "Parking", "24/7 Security", "Rooftop Pool"],
    nearbyPlaces: {
      schools: ["Central High School (0.5 mi)", "Downtown Elementary (0.3 mi)"],
      malls: ["City Mall (0.2 mi)", "Plaza Center (0.8 mi)"],
      transport: ["Metro Station (0.1 mi)", "Bus Stop (0.05 mi)"],
    },
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: "2",
    title: "Spacious Family Home",
    price: "$680,000",
    location: "Suburban Heights",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,500 sq ft",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000",
    description: "Beautiful family home with large backyard, modern kitchen, and close to top-rated schools.",
    features: ["Large Backyard", "Modern Kitchen", "Garage", "Fireplace", "Hardwood Floors"],
    nearbyPlaces: {
      schools: ["Heights Academy (1 mi)", "Maple Elementary (0.7 mi)"],
      malls: ["Suburban Plaza (2 mi)", "Heights Market (1.5 mi)"],
      transport: ["Bus Stop (0.3 mi)", "Highway Access (1 mi)"],
    },
    coordinates: { lat: 40.7489, lng: -73.9680 },
  },
  {
    id: "3",
    title: "Luxury Penthouse Suite",
    price: "$1,200,000",
    location: "Waterfront District",
    bedrooms: 3,
    bathrooms: 3,
    area: "2,800 sq ft",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=2000",
    description: "Exclusive penthouse with panoramic water views, floor-to-ceiling windows, and premium amenities.",
    features: ["Panoramic Views", "Private Elevator", "Smart Home", "Chef's Kitchen", "Wine Cellar"],
    nearbyPlaces: {
      schools: ["Waterfront Academy (1.2 mi)", "Harbor School (0.9 mi)"],
      malls: ["Harbor Mall (0.5 mi)", "Marina Shopping Center (1 mi)"],
      transport: ["Ferry Terminal (0.2 mi)", "Metro Station (0.4 mi)"],
    },
    coordinates: { lat: 40.7128, lng: -74.0060 },
  },
  {
    id: "4",
    title: "Cozy Studio Loft",
    price: "$285,000",
    location: "Arts District",
    bedrooms: 1,
    bathrooms: 1,
    area: "650 sq ft",
    images: [
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2000",
    description: "Charming studio loft in the heart of the arts district. High ceilings, exposed brick, and modern amenities.",
    features: ["Exposed Brick", "High Ceilings", "Natural Light", "Pet-Friendly", "Bike Storage"],
    nearbyPlaces: {
      schools: ["Arts College (0.4 mi)", "Creative Academy (0.6 mi)"],
      malls: ["Arts Plaza (0.3 mi)", "District Market (0.5 mi)"],
      transport: ["Streetcar Stop (0.1 mi)", "Bus Hub (0.2 mi)"],
    },
    coordinates: { lat: 40.7282, lng: -73.9942 },
  },
];
