import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X, GripVertical, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface VehicleImage {
  id?: string;
  image_url: string;
  display_order: number;
  is_main: boolean;
  file?: File;
}

interface VehicleForm {
  make: string;
  model: string;
  trim: string;
  year: string;
  mileage: string;
  price: string;
  fuel_type: string;
  transmission: string;
  engine_size: string;
  colour: string;
  body_type: string;
  number_of_owners: string;
  service_history: boolean;
  service_history_notes: string;
  mot_expiry_date: string;
  key_features: string;
  description: string;
  warranty_included: boolean;
  status: string;
}

const initialForm: VehicleForm = {
  make: "",
  model: "",
  trim: "",
  year: new Date().getFullYear().toString(),
  mileage: "",
  price: "",
  fuel_type: "petrol",
  transmission: "manual",
  engine_size: "",
  colour: "",
  body_type: "hatchback",
  number_of_owners: "",
  service_history: false,
  service_history_notes: "",
  mot_expiry_date: "",
  key_features: "",
  description: "",
  warranty_included: true,
  status: "available",
};

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [form, setForm] = useState<VehicleForm>(initialForm);
  const [images, setImages] = useState<VehicleImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isEditing) {
      fetchVehicle();
    }
  }, [id]);

  const fetchVehicle = async () => {
    setIsLoading(true);
    try {
      const { data: vehicle, error } = await supabase
        .from("vehicles")
        .select("*, vehicle_images(*)")
        .eq("id", id)
        .single();

      if (error) throw error;

      setForm({
        make: vehicle.make,
        model: vehicle.model,
        trim: vehicle.trim || "",
        year: vehicle.year.toString(),
        mileage: vehicle.mileage.toString(),
        price: vehicle.price.toString(),
        fuel_type: vehicle.fuel_type,
        transmission: vehicle.transmission,
        engine_size: vehicle.engine_size || "",
        colour: vehicle.colour || "",
        body_type: vehicle.body_type || "hatchback",
        number_of_owners: vehicle.number_of_owners?.toString() || "",
        service_history: vehicle.service_history || false,
        service_history_notes: vehicle.service_history_notes || "",
        mot_expiry_date: vehicle.mot_expiry_date || "",
        key_features: vehicle.key_features?.join(", ") || "",
        description: vehicle.description || "",
        warranty_included: vehicle.warranty_included ?? true,
        status: vehicle.status,
      });

      setImages(
        vehicle.vehicle_images
          ?.sort(
            (a: VehicleImage, b: VehicleImage) => a.display_order - b.display_order
          )
          .map((img: VehicleImage) => ({
            id: img.id,
            image_url: img.image_url,
            display_order: img.display_order,
            is_main: img.is_main,
          })) || []
      );
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to load vehicle",
        variant: "destructive",
      });
      navigate("/admin/vehicles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: VehicleImage[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newImages.push({
        image_url: url,
        display_order: images.length + i,
        is_main: images.length === 0 && i === 0,
        file,
      });
    }

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      // If we removed the main image, make the first one main
      if (prev[index].is_main && updated.length > 0) {
        updated[0].is_main = true;
      }
      return updated.map((img, i) => ({ ...img, display_order: i }));
    });
  };

  const setMainImage = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({ ...img, is_main: i === index }))
    );
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setImages((prev) => {
      const updated = [...prev];
      const [removed] = updated.splice(draggedIndex, 1);
      updated.splice(index, 0, removed);
      return updated.map((img, i) => ({ ...img, display_order: i }));
    });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const uploadImages = async (vehicleId: string) => {
    const uploadedImages: { image_url: string; display_order: number; is_main: boolean }[] = [];

    for (const img of images) {
      if (img.file) {
        // Upload new file
        const fileExt = img.file.name.split(".").pop();
        const fileName = `${vehicleId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("vehicle-images")
          .upload(fileName, img.file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("vehicle-images")
          .getPublicUrl(fileName);

        uploadedImages.push({
          image_url: urlData.publicUrl,
          display_order: img.display_order,
          is_main: img.is_main,
        });
      } else if (img.id) {
        // Existing image
        uploadedImages.push({
          image_url: img.image_url,
          display_order: img.display_order,
          is_main: img.is_main,
        });
      }
    }

    return uploadedImages;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one photo",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const vehicleData = {
        make: form.make,
        model: form.model,
        trim: form.trim || null,
        year: parseInt(form.year),
        mileage: parseInt(form.mileage),
        price: parseInt(form.price),
        fuel_type: form.fuel_type as "petrol" | "diesel" | "electric" | "hybrid" | "plug-in hybrid",
        transmission: form.transmission as "manual" | "automatic",
        engine_size: form.engine_size || null,
        colour: form.colour || null,
        body_type: form.body_type as "hatchback" | "saloon" | "estate" | "suv" | "coupe" | "convertible" | "mpv" | "van" | "pickup" | null,
        number_of_owners: form.number_of_owners
          ? parseInt(form.number_of_owners)
          : null,
        service_history: form.service_history,
        service_history_notes: form.service_history_notes || null,
        mot_expiry_date: form.mot_expiry_date || null,
        key_features: form.key_features
          ? form.key_features.split(",").map((f) => f.trim())
          : [],
        description: form.description || null,
        warranty_included: form.warranty_included,
        status: form.status as "available" | "reserved" | "sold",
      };

      let vehicleId: string;

      if (isEditing) {
        const { error } = await supabase
          .from("vehicles")
          .update(vehicleData)
          .eq("id", id);

        if (error) throw error;
        vehicleId = id!;

        // Delete old images
        await supabase.from("vehicle_images").delete().eq("vehicle_id", id);
      } else {
        const { data, error } = await supabase
          .from("vehicles")
          .insert(vehicleData)
          .select("id")
          .single();

        if (error) throw error;
        vehicleId = data.id;
      }

      // Upload and save images
      const uploadedImages = await uploadImages(vehicleId);

      if (uploadedImages.length > 0) {
        const { error: imgError } = await supabase
          .from("vehicle_images")
          .insert(
            uploadedImages.map((img) => ({
              vehicle_id: vehicleId,
              image_url: img.image_url,
              display_order: img.display_order,
              is_main: img.is_main,
            }))
          );

        if (imgError) throw imgError;
      }

      toast({
        title: isEditing ? "Vehicle Updated" : "Vehicle Added",
        description: isEditing
          ? "The vehicle has been updated successfully."
          : "The vehicle has been added to stock.",
      });

      navigate("/admin/vehicles");
    } catch (error) {
      console.error("Error saving vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to save vehicle",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-gold" />
        <p className="text-muted-foreground mt-4">Loading vehicle...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link
          to="/admin/vehicles"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vehicles
        </Link>
        <h1 className="text-3xl font-display font-bold text-foreground">
          {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="make">Make *</Label>
              <Input
                id="make"
                name="make"
                required
                value={form.make}
                onChange={handleChange}
                placeholder="e.g. Ford"
              />
            </div>
            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                name="model"
                required
                value={form.model}
                onChange={handleChange}
                placeholder="e.g. Focus"
              />
            </div>
            <div>
              <Label htmlFor="trim">Trim</Label>
              <Input
                id="trim"
                name="trim"
                value={form.trim}
                onChange={handleChange}
                placeholder="e.g. ST-Line"
              />
            </div>
            <div>
              <Label htmlFor="year">Year *</Label>
              <Input
                id="year"
                name="year"
                type="number"
                required
                min="1900"
                max="2100"
                value={form.year}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="mileage">Mileage *</Label>
              <Input
                id="mileage"
                name="mileage"
                type="number"
                required
                min="0"
                value={form.mileage}
                onChange={handleChange}
                placeholder="e.g. 45000"
              />
            </div>
            <div>
              <Label htmlFor="price">Price (£) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 12995"
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fuel_type">Fuel Type *</Label>
              <Select
                value={form.fuel_type}
                onValueChange={(v) => handleSelectChange("fuel_type", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="plug-in hybrid">Plug-in Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="transmission">Transmission *</Label>
              <Select
                value={form.transmission}
                onValueChange={(v) => handleSelectChange("transmission", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="engine_size">Engine Size</Label>
              <Input
                id="engine_size"
                name="engine_size"
                value={form.engine_size}
                onChange={handleChange}
                placeholder="e.g. 1.5L"
              />
            </div>
            <div>
              <Label htmlFor="colour">Colour</Label>
              <Input
                id="colour"
                name="colour"
                value={form.colour}
                onChange={handleChange}
                placeholder="e.g. Midnight Black"
              />
            </div>
            <div>
              <Label htmlFor="body_type">Body Type</Label>
              <Select
                value={form.body_type}
                onValueChange={(v) => handleSelectChange("body_type", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="saloon">Saloon</SelectItem>
                  <SelectItem value="estate">Estate</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="convertible">Convertible</SelectItem>
                  <SelectItem value="mpv">MPV</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="number_of_owners">Number of Owners</Label>
              <Input
                id="number_of_owners"
                name="number_of_owners"
                type="number"
                min="0"
                value={form.number_of_owners}
                onChange={handleChange}
                placeholder="e.g. 2"
              />
            </div>
          </div>
        </div>

        {/* Service & MOT */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Service History & MOT
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch
                id="service_history"
                checked={form.service_history}
                onCheckedChange={(c) => handleSwitchChange("service_history", c)}
              />
              <Label htmlFor="service_history">Has Service History</Label>
            </div>
            {form.service_history && (
              <div>
                <Label htmlFor="service_history_notes">
                  Service History Notes
                </Label>
                <Textarea
                  id="service_history_notes"
                  name="service_history_notes"
                  value={form.service_history_notes}
                  onChange={handleChange}
                  placeholder="Full service history with stamps..."
                  rows={3}
                />
              </div>
            )}
            <div>
              <Label htmlFor="mot_expiry_date">MOT Expiry Date</Label>
              <Input
                id="mot_expiry_date"
                name="mot_expiry_date"
                type="date"
                value={form.mot_expiry_date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Features & Description */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Features & Description
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="key_features">Key Features (comma-separated)</Label>
              <Input
                id="key_features"
                name="key_features"
                value={form.key_features}
                onChange={handleChange}
                placeholder="Sat Nav, Bluetooth, Parking Sensors, Cruise Control"
              />
            </div>
            <div>
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed description of the vehicle..."
                rows={6}
              />
            </div>
          </div>
        </div>

        {/* Warranty & Status */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Warranty & Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Switch
                id="warranty_included"
                checked={form.warranty_included}
                onCheckedChange={(c) =>
                  handleSwitchChange("warranty_included", c)
                }
              />
              <Label htmlFor="warranty_included">Warranty Included</Label>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => handleSelectChange("status", v)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Photos *
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Upload at least one photo. Drag to reorder. The first image is the
            main photo.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`relative group cursor-move rounded-lg overflow-hidden border-2 ${
                  img.is_main ? "border-gold" : "border-transparent"
                }`}
              >
                <img
                  src={img.image_url}
                  alt={`Vehicle ${index + 1}`}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <GripVertical className="w-5 h-5 text-white" />
                </div>
                {img.is_main && (
                  <span className="absolute top-2 left-2 bg-gold text-secondary text-xs px-2 py-1 rounded">
                    Main
                  </span>
                )}
                {!img.is_main && (
                  <button
                    type="button"
                    onClick={() => setMainImage(index)}
                    className="absolute top-2 left-2 bg-white/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Set Main
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            <label className="aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gold transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Add Photos</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" variant="gold" size="lg" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              "Update Vehicle"
            ) : (
              "Add Vehicle"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate("/admin/vehicles")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
