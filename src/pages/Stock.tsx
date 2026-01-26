import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, CreditCard, Car, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  trim: string | null;
  year: number;
  mileage: number;
  price: number;
  fuel_type: string;
  transmission: string;
  status: "available" | "reserved" | "sold";
  warranty_included: boolean;
  vehicle_images: { image_url: string; is_main: boolean }[];
}

const Stock = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*, vehicle_images(image_url, is_main)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const badges = [
    { icon: Shield, label: "Warranty Included" },
    { icon: CreditCard, label: "Finance Available" },
    { icon: Car, label: "Part Exchange" },
  ];

  const getMainImage = (vehicle: Vehicle) => {
    const mainImage = vehicle.vehicle_images?.find((img) => img.is_main);
    return mainImage?.image_url || vehicle.vehicle_images?.[0]?.image_url;
  };

  const filteredVehicles = vehicles.filter((v) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      v.make.toLowerCase().includes(searchLower) ||
      v.model.toLowerCase().includes(searchLower) ||
      v.year.toString().includes(searchLower);

    const matchesPrice =
      priceFilter === "all" ||
      (priceFilter === "under10k" && v.price < 10000) ||
      (priceFilter === "10k-20k" && v.price >= 10000 && v.price < 20000) ||
      (priceFilter === "20k-30k" && v.price >= 20000 && v.price < 30000) ||
      (priceFilter === "over30k" && v.price >= 30000);

    const matchesFuel =
      fuelFilter === "all" || v.fuel_type === fuelFilter;

    return matchesSearch && matchesPrice && matchesFuel;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reserved":
        return (
          <Badge className="absolute top-4 right-4 bg-gold text-secondary">
            Reserved
          </Badge>
        );
      case "sold":
        return (
          <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground">
            Sold
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Our Stock
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-6">
              Quality Used Cars
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our selection of carefully inspected, warranty-backed vehicles. All competitively priced with no hidden fees.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-charcoal-light px-4 py-2 rounded-full"
                >
                  <badge.icon className="w-4 h-4 text-gold" />
                  <span className="text-secondary-foreground text-sm font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under10k">Under £10,000</SelectItem>
                <SelectItem value="10k-20k">£10,000 - £20,000</SelectItem>
                <SelectItem value="20k-30k">£20,000 - £30,000</SelectItem>
                <SelectItem value="over30k">Over £30,000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={fuelFilter} onValueChange={setFuelFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fuels</SelectItem>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="electric">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl h-96 animate-pulse"
                />
              ))}
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-16">
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                No Vehicles Found
              </h2>
              <p className="text-muted-foreground mb-6">
                {vehicles.length === 0
                  ? "We're currently updating our stock. Please check back soon!"
                  : "Try adjusting your search filters."}
              </p>
              <Button variant="gold" asChild>
                <a href="tel:07960130449">Call Us: 07960 130449</a>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  to={`/stock/${vehicle.id}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-video">
                    {getMainImage(vehicle) ? (
                      <img
                        src={getMainImage(vehicle)}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Car className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    {getStatusBadge(vehicle.status)}
                    {vehicle.warranty_included && vehicle.status === "available" && (
                      <Badge className="absolute top-4 left-4 bg-gold text-secondary">
                        <Shield className="w-3 h-3 mr-1" />
                        Warranty
                      </Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-gold transition-colors">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    {vehicle.trim && (
                      <p className="text-sm text-muted-foreground">{vehicle.trim}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {vehicle.mileage.toLocaleString()} miles
                      </span>
                      <span className="text-xs bg-muted px-2 py-1 rounded capitalize">
                        {vehicle.fuel_type}
                      </span>
                      <span className="text-xs bg-muted px-2 py-1 rounded capitalize">
                        {vehicle.transmission}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-gold">
                        £{vehicle.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gold group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              We have access to a wide network of quality vehicles. Tell us what you're looking for and we'll do our best to source it for you at a competitive price.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gold" size="lg" asChild>
                <a href="tel:07960130449">Call Us: 07960 130449</a>
              </Button>
              <Button variant="gold-outline" size="lg" asChild>
                <Link to="/contact">Send Enquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Stock;
