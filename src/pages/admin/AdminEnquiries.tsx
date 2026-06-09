import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, MessageSquare, Download, Eye, Car } from "lucide-react";
import { format } from "date-fns";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "replied" | "closed";
  created_at: string;
  vehicle_id: string | null;
  vehicles: { make: string; model: string; year: number } | null;
}

const AdminEnquiries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "all"
  );
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("enquiries")
        .select("*, vehicles(make, model, year)")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as "new" | "replied" | "closed");
      }

      const { data, error } = await query;

      if (error) throw error;
      setEnquiries(data || []);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      toast({
        title: "Error",
        description: "Failed to load enquiries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "new" | "replied" | "closed"
  ) => {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setEnquiries(
        enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );

      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }

      toast({
        title: "Status Updated",
        description: `Enquiry marked as ${newStatus}.`,
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

  const exportToCsv = () => {
    const headers = ["Name", "Email", "Phone", "Message", "Vehicle", "Status", "Date"];
    const rows = enquiries.map((e) => [
      e.name,
      e.email,
      e.phone || "",
      e.message.replace(/"/g, '""'),
      e.vehicles ? `${e.vehicles.year} ${e.vehicles.make} ${e.vehicles.model}` : "",
      e.status,
      format(new Date(e.created_at), "dd/MM/yyyy HH:mm"),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(searchLower) ||
      e.email.toLowerCase().includes(searchLower) ||
      e.message.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-500/10 text-red-600";
      case "replied":
        return "bg-gold/10 text-gold";
      case "closed":
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
            Enquiries
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage customer enquiries
          </p>
        </div>
        <Button variant="outline" onClick={exportToCsv}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="bg-card rounded-xl shadow-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or message..."
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
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No enquiries found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">{enquiry.name}</TableCell>
                  <TableCell>{enquiry.email}</TableCell>
                  <TableCell>{enquiry.phone || "-"}</TableCell>
                  <TableCell>
                    {enquiry.vehicles ? (
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Car className="w-3 h-3" />
                        {enquiry.vehicles.year} {enquiry.vehicles.make}{" "}
                        {enquiry.vehicles.model}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={enquiry.status}
                      onValueChange={(value: "new" | "replied" | "closed") =>
                        handleStatusChange(enquiry.id, value)
                      }
                    >
                      <SelectTrigger
                        className={`w-24 h-8 text-xs ${getStatusColor(
                          enquiry.status
                        )}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {format(new Date(enquiry.created_at), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEnquiry(enquiry)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog
        open={!!selectedEnquiry}
        onOpenChange={() => setSelectedEnquiry(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="font-medium text-gold hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="font-medium text-gold hover:underline"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {format(
                      new Date(selectedEnquiry.created_at),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </p>
                </div>
              </div>

              {selectedEnquiry.vehicles && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Related Vehicle
                  </p>
                  <p className="font-medium">
                    {selectedEnquiry.vehicles.year}{" "}
                    {selectedEnquiry.vehicles.make}{" "}
                    {selectedEnquiry.vehicles.model}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <div className="max-h-[40vh] overflow-y-auto rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-foreground text-sm whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-relaxed">
                    {selectedEnquiry.message}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Select
                  value={selectedEnquiry.status}
                  onValueChange={(value: "new" | "replied" | "closed") =>
                    handleStatusChange(selectedEnquiry.id, value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="gold" asChild>
                  <a href={`mailto:${selectedEnquiry.email}`}>Reply via Email</a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEnquiries;
