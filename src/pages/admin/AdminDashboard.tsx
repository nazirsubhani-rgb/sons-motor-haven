import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Car, MessageSquare, Eye, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  reservedVehicles: number;
  soldVehicles: number;
  newEnquiries: number;
  totalEnquiries: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalVehicles: 0,
    availableVehicles: 0,
    reservedVehicles: 0,
    soldVehicles: 0,
    newEnquiries: 0,
    totalEnquiries: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch vehicle counts
        const { data: vehicles } = await supabase
          .from("vehicles")
          .select("status");

        const totalVehicles = vehicles?.length || 0;
        const availableVehicles =
          vehicles?.filter((v) => v.status === "available").length || 0;
        const reservedVehicles =
          vehicles?.filter((v) => v.status === "reserved").length || 0;
        const soldVehicles =
          vehicles?.filter((v) => v.status === "sold").length || 0;

        // Fetch enquiry counts
        const { data: enquiries } = await supabase
          .from("enquiries")
          .select("status");

        const totalEnquiries = enquiries?.length || 0;
        const newEnquiries =
          enquiries?.filter((e) => e.status === "new").length || 0;

        setStats({
          totalVehicles,
          availableVehicles,
          reservedVehicles,
          soldVehicles,
          newEnquiries,
          totalEnquiries,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      icon: Car,
      label: "Total Vehicles",
      value: stats.totalVehicles,
      color: "bg-blue-500/10 text-blue-500",
      href: "/admin/vehicles",
    },
    {
      icon: Eye,
      label: "Available",
      value: stats.availableVehicles,
      color: "bg-green-500/10 text-green-500",
      href: "/admin/vehicles?status=available",
    },
    {
      icon: TrendingUp,
      label: "Reserved",
      value: stats.reservedVehicles,
      color: "bg-gold/10 text-gold",
      href: "/admin/vehicles?status=reserved",
    },
    {
      icon: MessageSquare,
      label: "New Enquiries",
      value: stats.newEnquiries,
      color: "bg-red-500/10 text-red-500",
      href: "/admin/enquiries?status=new",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your dealership.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-6 animate-pulse h-32"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              to={stat.href}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              to="/admin/vehicles/new"
              className="flex items-center gap-3 p-4 bg-gold/10 rounded-lg hover:bg-gold/20 transition-colors"
            >
              <Car className="w-5 h-5 text-gold" />
              <span className="text-foreground font-medium">
                Add New Vehicle
              </span>
            </Link>
            <Link
              to="/admin/enquiries"
              className="flex items-center gap-3 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground font-medium">
                View All Enquiries
              </span>
            </Link>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">
            Stock Summary
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Available</span>
              <span className="font-semibold text-green-500">
                {stats.availableVehicles}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Reserved</span>
              <span className="font-semibold text-gold">
                {stats.reservedVehicles}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sold</span>
              <span className="font-semibold text-muted-foreground">
                {stats.soldVehicles}
              </span>
            </div>
            <div className="pt-4 border-t border-border flex justify-between items-center">
              <span className="text-foreground font-medium">Total</span>
              <span className="font-bold text-foreground">
                {stats.totalVehicles}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
