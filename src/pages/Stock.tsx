import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, CreditCard, Car, Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
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
import { Label } from "@/components/ui/label";

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
  const [showFilters, setShowFilters] = useState(false);
  
  // Filters
  const [makeFilter, setMakeFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [transmissionFilter, setTransmissionFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [priceMinFilter, setPriceMinFilter] = useState("");
  const [priceMaxFilter, setPriceMaxFilter] = useState("");
  
  // Sorting
  const [sortBy, setSortBy] = useState("newest");

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

  // Get unique values for filter dropdowns
  const uniqueMakes = useMemo(() => 
    [...new Set(vehicles.map(v => v.make))].sort(), 
    [vehicles]
  );
  
  const uniqueModels = useMemo(() => {
    const filtered = makeFilter !== "all" 
      ? vehicles.filter(v => v.make === makeFilter)
      : vehicles;
    return [...new Set(filtered.map(v => v.model))].sort();
  }, [vehicles, makeFilter]);

  const uniqueYears = useMemo(() => 
    [...new Set(vehicles.map(v => v.year))].sort((a, b) => b - a), 
    [vehicles]
  );

  const badges = [
    { icon: Shield, label: "Warranty Included" },
    { icon: CreditCard, label: "Finance Available" },
    { icon: Car, label: "Part Exchange" },
  ];

  const getMainImage = (vehicle: Vehicle) => {
    const mainImage = vehicle.vehicle_images?.find((img) => img.is_main);
    return mainImage?.image_url || vehicle.vehicle_images?.[0]?.image_url;
  };

  // Filter and sort vehicles
  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((v) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        v.make.toLowerCase().includes(searchLower) ||
        v.model.toLowerCase().includes(searchLower) ||
        v.year.toString().includes(searchLower) ||
        (v.trim?.toLowerCase().includes(searchLower) ?? false);

      const matchesMake = makeFilter === "all" || v.make === makeFilter;
      const matchesModel = modelFilter === "all" || v.model === modelFilter;
      const matchesYear = yearFilter === "all" || v.year.toString() === yearFilter;
      const matchesTransmission = transmissionFilter === "all" || v.transmission === transmissionFilter;
      const matchesFuel = fuelFilter === "all" || v.fuel_type === fuelFilter;
      
      const priceMin = priceMinFilter ? parseInt(priceMinFilter) : 0;
      const priceMax = priceMaxFilter ? parseInt(priceMaxFilter) : Infinity;
      const matchesPrice = v.price >= priceMin && v.price <= priceMax;

      return matchesSearch && matchesMake && matchesModel && matchesYear && 
             matchesTransmission && matchesFuel && matchesPrice;
    });

    // Sort results
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        result.sort((a, b) => b.year - a.year);
        break;
      case "year-old":
        result.sort((a, b) => a.year - b.year);
        break;
      case "mileage-low":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "mileage-high":
        result.sort((a, b) => b.mileage - a.mileage);
        break;
      default:
        // newest first (by created_at, already sorted from DB)
        break;
    }

    return result;
  }, [vehicles, searchQuery, makeFilter, modelFilter, yearFilter, 
      transmissionFilter, fuelFilter, priceMinFilter, priceMaxFilter, sortBy]);

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

  const clearFilters = () => {
    setMakeFilter("all");
    setModelFilter("all");
    setYearFilter("all");
    setTransmissionFilter("all");
    setFuelFilter("all");
    setPriceMinFilter("");
    setPriceMaxFilter("");
    setSearchQuery("");
    setSortBy("newest");
  };

  const hasActiveFilters = makeFilter !== "all" || modelFilter !== "all" || 
    yearFilter !== "all" || transmissionFilter !== "all" || fuelFilter !== "all" ||
    priceMinFilter !== "" || priceMaxFilter !== "";

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-gold text-sm font-medium tracking-widest uppercase">
              Our Stock
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-secondary-foreground mt-3 mb-4 md:mb-6">
              Our Collection
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Browse our selection of carefully inspected, warranty-backed vehicles. All competitively priced with no hidden fees.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6 md:mt-8">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-charcoal-light px-3 md:px-4 py-2 rounded-full"
                >
                  <badge.icon className="w-3 h-3 md:w-4 md:h-4 text-gold" />
                  <span className="text-secondary-foreground text-xs md:text-sm font-medium">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          {/* Search Bar and Toggle */}
          <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, year, or trim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? "bg-gold text-secondary" : ""}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 bg-gold text-secondary text-xs px-2 py-0.5 rounded-full">
                    Active
                  </span>
                )}
              </Button>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="year-new">Year: Newest First</SelectItem>
                  <SelectItem value="year-old">Year: Oldest First</SelectItem>
                  <SelectItem value="mileage-low">Mileage: Low to High</SelectItem>
                  <SelectItem value="mileage-high">Mileage: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="max-w-6xl mx-auto bg-card p-6 rounded-xl shadow-card animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make-filter">Make</Label>
                  <Select value={makeFilter} onValueChange={(v) => {
                    setMakeFilter(v);
                    setModelFilter("all"); // Reset model when make changes
                  }}>
                    <SelectTrigger id="make-filter">
                      <SelectValue placeholder="All Makes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Makes</SelectItem>
                      {uniqueMakes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-filter">Model</Label>
                  <Select value={modelFilter} onValueChange={setModelFilter}>
                    <SelectTrigger id="model-filter">
                      <SelectValue placeholder="All Models" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Models</SelectItem>
                      {uniqueModels.map(model => (
                        <SelectItem key={model} value={model}>{model}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year-filter">Year</Label>
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger id="year-filter">
                      <SelectValue placeholder="All Years" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {uniqueYears.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transmission-filter">Transmission</Label>
                  <Select value={transmissionFilter} onValueChange={setTransmissionFilter}>
                    <SelectTrigger id="transmission-filter">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="automatic">Automatic</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fuel-filter">Fuel Type</Label>
                  <Select value={fuelFilter} onValueChange={setFuelFilter}>
                    <SelectTrigger id="fuel-filter">
                      <SelectValue placeholder="All Fuels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Fuels</SelectItem>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="plug-in hybrid">Plug-in Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Price Range (£)</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceMinFilter}
                      onChange={(e) => setPriceMinFilter(e.target.value)}
                      className="w-full"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceMaxFilter}
                      onChange={(e) => setPriceMaxFilter(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              {hasActiveFilters && (
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" onClick={clearFilters} className="text-muted-foreground">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="max-w-6xl mx-auto mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </p>
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
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="mb-4">
                  Clear Filters
                </Button>
              )}
              <div className="mt-4">
                <Button variant="gold" asChild>
                  <a href="tel:02046468471">Call Us: 02046468471</a>
                </Button>
              </div>
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
                <a href="tel:02046468471">Call Us: 02046468471</a>
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
