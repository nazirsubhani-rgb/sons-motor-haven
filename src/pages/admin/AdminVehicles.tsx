import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Pencil, Trash2, Eye, Car } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  status: "available" | "reserved" | "sold";
  created_at: string;
  vehicle_images: { image_url: string; is_main: boolean }[];
}

const AdminVehicles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, [statusFilter]);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("vehicles")
        .select("*, vehicle_images(image_url, is_main)")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as "available" | "reserved" | "sold");
      }

      const { data, error } = await query;

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      toast({
        title: "Error",
        description: "Failed to load vehicles",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      setVehicles(vehicles.filter((v) => v.id !== deleteId));
      toast({
        title: "Vehicle Deleted",
        description: "The vehicle has been removed from stock.",
      });
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to delete vehicle",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "available" | "reserved" | "sold"
  ) => {
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setVehicles(
        vehicles.map((v) => (v.id === id ? { ...v, status: newStatus } : v))
      );
      toast({
        title: "Status Updated",
        description: `Vehicle marked as ${newStatus}.`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const filteredVehicles = vehicles.filter((v) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      v.make.toLowerCase().includes(searchLower) ||
      v.model.toLowerCase().includes(searchLower) ||
      v.year.toString().includes(searchLower)
    );
  });

  const getMainImage = (vehicle: Vehicle) => {
    const mainImage = vehicle.vehicle_images?.find((img) => img.is_main);
    return mainImage?.image_url || vehicle.vehicle_images?.[0]?.image_url;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-600";
      case "reserved":
        return "bg-gold/10 text-gold";
      case "sold":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Vehicles
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your vehicle stock
          </p>
        </div>
        <Button variant="gold" asChild>
          <Link to="/admin/vehicles/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-xl shadow-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by make, model, or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              if (value === "all") {
                searchParams.delete("status");
              } else {
                searchParams.set("status", value);
              }
              setSearchParams(searchParams);
            }}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading vehicles...
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="p-8 text-center">
            <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No vehicles found</p>
            <Button variant="gold" className="mt-4" asChild>
              <Link to="/admin/vehicles/new">Add Your First Vehicle</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Photo</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    {getMainImage(vehicle) ? (
                      <img
                        src={getMainImage(vehicle)}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-16 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-12 bg-muted rounded flex items-center justify-center">
                        <Car className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {vehicle.make} {vehicle.model}
                  </TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.mileage.toLocaleString()} mi</TableCell>
                  <TableCell>£{vehicle.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select
                      value={vehicle.status}
                      onValueChange={(value: "available" | "reserved" | "sold") =>
                        handleStatusChange(vehicle.id, value)
                      }
                    >
                      <SelectTrigger
                        className={`w-28 h-8 text-xs ${getStatusColor(
                          vehicle.status
                        )}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(vehicle.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/stock/${vehicle.id}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/vehicles/${vehicle.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(vehicle.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminVehicles;
