import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Shield,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  Users,
  FileText,
  CheckCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  Car,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { enquirySchema } from "@/lib/enquiry-validation";

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
  engine_size: string | null;
  colour: string | null;
  body_type: string | null;
  number_of_owners: number | null;
  service_history: boolean;
  service_history_notes: string | null;
  mot_expiry_date: string | null;
  key_features: string[];
  description: string | null;
  warranty_included: boolean;
  status: "available" | "reserved" | "sold";
  vehicle_images: { id: string; image_url: string; is_main: boolean; display_order: number }[];
}

const VehicleDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    fetchVehicle();
  }, [id]);

  const fetchVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*, vehicle_images(*)")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Sort images by display_order
      if (data.vehicle_images) {
        data.vehicle_images.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order);
      }

      setVehicle(data);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = enquirySchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Invalid input",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("enquiries").insert({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        message: result.data.message,
        vehicle_id: id,
      });

      if (error) throw error;

      toast({
        title: "Enquiry Sent!",
        description: "Thank you for your interest. We'll be in touch shortly.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast({
        title: "Error",
        description: "Failed to send enquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => {
    if (vehicle?.vehicle_images) {
      setCurrentImageIndex((prev) =>
        prev === vehicle.vehicle_images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (vehicle?.vehicle_images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? vehicle.vehicle_images.length - 1 : prev - 1
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Car className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Vehicle Not Found
        </h1>
        <p className="text-muted-foreground mb-6">
          This vehicle may have been sold or removed.
        </p>
        <Button variant="gold" asChild>
          <Link to="/stock">Browse Available Stock</Link>
        </Button>
      </div>
    );
  }

  const specs = [
    { icon: Calendar, label: "Year", value: vehicle.year },
    { icon: Gauge, label: "Mileage", value: `${vehicle.mileage.toLocaleString()} miles` },
    { icon: Fuel, label: "Fuel", value: vehicle.fuel_type },
    { icon: Settings2, label: "Transmission", value: vehicle.transmission },
    vehicle.engine_size && { icon: Settings2, label: "Engine", value: vehicle.engine_size },
    vehicle.colour && { icon: Palette, label: "Colour", value: vehicle.colour },
    vehicle.body_type && { icon: Car, label: "Body", value: vehicle.body_type },
    vehicle.number_of_owners && { icon: Users, label: "Owners", value: vehicle.number_of_owners },
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="bg-cream-dark py-4">
        <div className="container mx-auto">
          <Link
            to="/stock"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stock
          </Link>
        </div>
      </div>

      <div className="container mx-auto py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image Gallery */}
          <div className="min-w-0">
            <div className="relative h-[260px] sm:h-[360px] lg:h-auto lg:aspect-video rounded-xl overflow-hidden bg-muted">
              {vehicle.vehicle_images && vehicle.vehicle_images.length > 0 ? (
                <>
                  <img
                    src={vehicle.vehicle_images[currentImageIndex].image_url}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  {vehicle.vehicle_images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary/60 hover:bg-secondary/80 rounded-full flex items-center justify-center text-secondary-foreground transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary/60 hover:bg-secondary/80 rounded-full flex items-center justify-center text-secondary-foreground transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                  {/* Status Badge */}
                  {vehicle.status === "reserved" && (
                    <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gold text-secondary text-xs sm:text-sm">
                      Reserved
                    </Badge>
                  )}
                  {vehicle.status === "sold" && (
                    <Badge className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-muted text-muted-foreground text-xs sm:text-sm">
                      Sold
                    </Badge>
                  )}
                  {vehicle.warranty_included && (
                    <Badge className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gold text-secondary text-xs sm:text-sm max-w-[calc(100%-1.5rem)]">
                      <Shield className="w-3 h-3 mr-1 flex-shrink-0" />
                      Warranty Included
                    </Badge>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {vehicle.vehicle_images && vehicle.vehicle_images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {vehicle.vehicle_images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-gold"
                        : "border-transparent hover:border-gold/50"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Info */}
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground break-words">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            {vehicle.trim && (
              <p className="text-base md:text-lg text-muted-foreground mt-1 break-words">{vehicle.trim}</p>
            )}

            <div className="mt-4">
              <span className="text-3xl sm:text-4xl font-bold text-gold">
                £{vehicle.price.toLocaleString()}
              </span>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
              {specs.map((spec, index) => spec && (
                <div key={index} className="text-center p-3 md:p-4 bg-cream-dark rounded-lg min-w-0">
                  <spec.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="font-semibold text-sm md:text-base text-foreground capitalize break-words">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Key Features */}
            {vehicle.key_features && vehicle.key_features.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Key Features
                </h2>
                <div className="flex flex-wrap gap-2">
                  {vehicle.key_features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      <CheckCircle className="w-3 h-3 mr-1 text-gold" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Service & MOT */}
            <div className="mt-8 space-y-4">
              {vehicle.service_history && (
                <div className="flex items-start gap-3 p-4 bg-green-500/10 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Service History</p>
                    {vehicle.service_history_notes && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {vehicle.service_history_notes}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {vehicle.mot_expiry_date && (
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">MOT Expires</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(vehicle.mot_expiry_date), "dd MMMM yyyy")}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-8 p-4 sm:p-6 bg-secondary rounded-xl">
              <h3 className="text-base md:text-lg font-semibold text-secondary-foreground mb-4">
                Interested in this vehicle?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button variant="hero" size="lg" className="flex-1 w-full text-sm sm:text-base" asChild>
                  <a href="tel:02046468471">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Call 02046468471</span>
                  </a>
                </Button>
                <Button variant="hero-outline" size="lg" className="flex-1 w-full text-sm sm:text-base" asChild>
                  <a href="#enquiry-form">Send Enquiry</a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {vehicle.description && (
          <div className="mt-10 md:mt-12">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-sm md:text-base text-muted-foreground whitespace-pre-wrap break-words">
                {vehicle.description}
              </p>
            </div>
          </div>
        )}

        {/* Warranty Section */}
        {vehicle.warranty_included && (
          <div className="mt-10 md:mt-12 p-5 sm:p-8 bg-gradient-hero rounded-2xl">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl md:text-2xl font-display font-bold text-secondary-foreground mb-2">
                  Warranty Included
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  This vehicle comes with comprehensive warranty coverage in partnership with Autoguard. Drive away with complete peace of mind knowing you're protected against unexpected mechanical and electrical failures.
                </p>
                <Button variant="gold" asChild>
                  <Link to="/warranty">Learn More About Warranty</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Enquiry Form */}
        <div id="enquiry-form" className="mt-10 md:mt-12 scroll-mt-8">
          <div className="max-w-2xl mx-auto bg-card rounded-2xl p-5 sm:p-8 shadow-card">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Enquire About This Vehicle
            </h2>
            <p className="text-muted-foreground mb-6">
              Fill in your details and we'll get back to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="07123 456789"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={`I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}...`}
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VehicleDetail;
