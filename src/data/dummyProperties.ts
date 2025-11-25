export interface Property {
  id: string;
  country: string;
  countryCode: string; // ISO 2-letter code for flags
  city: string;
  title: string;
  price: string;
  priceUSD: number; // For filtering
  currency: string;
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
    country: "United States",
    countryCode: "US",
    city: "New York",
    title: "Modern Downtown Apartment",
    price: "$450,000",
    priceUSD: 450000,
    currency: "USD",
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
    country: "United States",
    countryCode: "US",
    city: "New York",
    title: "Spacious Family Home",
    price: "$680,000",
    priceUSD: 680000,
    currency: "USD",
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
    country: "United States",
    countryCode: "US",
    city: "Miami",
    title: "Luxury Penthouse Suite",
    price: "$1,200,000",
    priceUSD: 1200000,
    currency: "USD",
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
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: "4",
    country: "United States",
    countryCode: "US",
    city: "Los Angeles",
    title: "Cozy Studio Loft",
    price: "$285,000",
    priceUSD: 285000,
    currency: "USD",
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
    coordinates: { lat: 34.0407, lng: -118.2468 },
  },
  {
    id: "GH-001",
    country: "Ghana",
    countryCode: "GH",
    city: "Accra",
    title: "Modern Accra Apartment",
    price: "GH₵ 5,500/mo",
    priceUSD: 950,
    currency: "GHS",
    location: "East Legon",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,100 sq ft",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000",
    description: "Beautiful apartment in prestigious East Legon neighborhood. Modern amenities with 24/7 security and backup power.",
    features: ["Backup Generator", "24/7 Security", "Parking", "Modern Kitchen", "Balcony"],
    nearbyPlaces: {
      schools: ["Lincoln Community School (1 km)", "Tema International School (3 km)"],
      malls: ["A&C Shopping Mall (0.5 km)", "Marina Mall (2 km)"],
      transport: ["Trotro Stop (0.2 km)", "Taxi Stand (0.1 km)"],
    },
    coordinates: { lat: 5.6465, lng: -0.1512 },
  },
  {
    id: "GH-002",
    country: "Ghana",
    countryCode: "GH",
    city: "Accra",
    title: "Luxury Villa in Cantonments",
    price: "GH₵ 18,000/mo",
    priceUSD: 3100,
    currency: "GHS",
    location: "Cantonments",
    bedrooms: 4,
    bathrooms: 4,
    area: "3,200 sq ft",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000",
    description: "Stunning villa in Cantonments with private pool, landscaped gardens, and staff quarters. Perfect for diplomats and executives.",
    features: ["Private Pool", "Staff Quarters", "Generator", "Landscaped Garden", "Security Gate"],
    nearbyPlaces: {
      schools: ["Ghana International School (1.5 km)"],
      malls: ["A&C Mall (2 km)", "Accra Mall (3 km)"],
      transport: ["Uber/Bolt Available", "Private Parking"],
    },
    coordinates: { lat: 5.5715, lng: -0.1794 },
  },
  {
    id: "UK-001",
    country: "United Kingdom",
    countryCode: "GB",
    city: "London",
    title: "Elegant London Townhouse",
    price: "£825,000",
    priceUSD: 1050000,
    currency: "GBP",
    location: "Kensington",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000",
    description: "Victorian townhouse in prime Kensington location. Period features with modern conveniences.",
    features: ["Period Features", "Private Garden", "Modern Kitchen", "Double Glazing", "Original Fireplaces"],
    nearbyPlaces: {
      schools: ["Kensington Primary (0.3 mi)", "Holland Park School (0.5 mi)"],
      malls: ["Kensington High Street (0.2 mi)", "Westfield London (1.5 mi)"],
      transport: ["High Street Kensington Tube (0.3 mi)", "Bus Routes (0.1 mi)"],
    },
    coordinates: { lat: 51.4991, lng: -0.1937 },
  },
  {
    id: "NG-001",
    country: "Nigeria",
    countryCode: "NG",
    city: "Lagos",
    title: "Premium Lagos Apartment",
    price: "₦ 8,500,000/yr",
    priceUSD: 18000,
    currency: "NGN",
    location: "Victoria Island",
    bedrooms: 3,
    bathrooms: 3,
    area: "1,600 sq ft",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000",
    description: "Luxurious apartment in Victoria Island's premier high-rise. 24/7 power, security, and ocean views.",
    features: ["Ocean Views", "24/7 Power", "Security", "Gym", "Swimming Pool", "Generator"],
    nearbyPlaces: {
      schools: ["Corona School VI (1 km)", "Greensprings School (2 km)"],
      malls: ["The Palms (2 km)", "Silverbird Galleria (1.5 km)"],
      transport: ["Uber/Bolt Available", "Ferry Terminal (1 km)"],
    },
    coordinates: { lat: 6.4281, lng: 3.4219 },
  },
  {
    id: "FR-001",
    country: "France",
    countryCode: "FR",
    city: "Paris",
    title: "Chic Parisian Apartment",
    price: "€ 690,000",
    priceUSD: 750000,
    currency: "EUR",
    location: "Le Marais",
    bedrooms: 2,
    bathrooms: 1,
    area: "950 sq ft",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
    ],
    panoramaUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=2000",
    description: "Charming Haussmannian apartment in trendy Le Marais. Original features with modern comfort.",
    features: ["Haussmannian Building", "High Ceilings", "Parquet Floors", "Balcony", "Modern Bathroom"],
    nearbyPlaces: {
      schools: ["École Élémentaire (0.2 km)", "Lycée Charlemagne (0.5 km)"],
      malls: ["BHV Marais (0.3 km)", "Forum des Halles (0.8 km)"],
      transport: ["Saint-Paul Métro (0.2 km)", "Multiple Bus Lines (0.1 km)"],
    },
    coordinates: { lat: 48.8566, lng: 2.3522 },
  },
];
