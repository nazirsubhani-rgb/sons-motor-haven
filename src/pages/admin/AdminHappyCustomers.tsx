import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Upload, Loader2, Smile, ArrowUp, ArrowDown } from "lucide-react";

interface HappyCustomer {
  id: string;
  image_url: string;
  caption: string | null;
  customer_name: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const BUCKET = "vehicle-images";
const FOLDER = "happy-customers";

const AdminHappyCustomers = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<HappyCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("happy_customers")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({ title: "Choose a photo", description: "Please select an image to upload.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${FOLDER}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

      const nextOrder = items.length ? Math.max(...items.map((i) => i.display_order)) + 1 : 0;

      const { error: insErr } = await supabase.from("happy_customers").insert({
        image_url: pub.publicUrl,
        caption: caption || null,
        customer_name: customerName || null,
        display_order: nextOrder,
        is_active: true,
      });
      if (insErr) throw insErr;

      toast({ title: "Added", description: "Happy customer photo published." });
      setFile(null);
      setCaption("");
      setCustomerName("");
      (document.getElementById("hc-file") as HTMLInputElement | null)?.value && ((document.getElementById("hc-file") as HTMLInputElement).value = "");
      fetchItems();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (item: HappyCustomer) => {
    const { error } = await supabase
      .from("happy_customers")
      .update({ is_active: !item.is_active })
      .eq("id", item.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setItems(items.map((i) => (i.id === item.id ? { ...i, is_active: !i.is_active } : i)));
    }
  };

  const move = async (item: HappyCustomer, direction: -1 | 1) => {
    const sorted = [...items].sort((a, b) => a.display_order - b.display_order);
    const idx = sorted.findIndex((i) => i.id === item.id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const other = sorted[swapIdx];
    await supabase.from("happy_customers").update({ display_order: other.display_order }).eq("id", item.id);
    await supabase.from("happy_customers").update({ display_order: item.display_order }).eq("id", other.id);
    fetchItems();
  };

  const remove = async (item: HappyCustomer) => {
    if (!confirm("Delete this happy customer photo?")) return;
    try {
      const url = new URL(item.image_url);
      const marker = `/object/public/${BUCKET}/`;
      const idx = url.pathname.indexOf(marker);
      if (idx !== -1) {
        const key = url.pathname.substring(idx + marker.length);
        await supabase.storage.from(BUCKET).remove([key]);
      }
    } catch {}
    const { error } = await supabase.from("happy_customers").delete().eq("id", item.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Photo removed." });
      setItems(items.filter((i) => i.id !== item.id));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Happy Customers</h1>
        <p className="text-muted-foreground mt-1">
          Add handover photos that appear on the homepage Happy Customers section.
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-card p-6 mb-8 space-y-4">
        <h2 className="font-display text-lg font-semibold">Add a new photo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hc-file">Photo</Label>
            <Input
              id="hc-file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hc-name">Customer name (optional)</Label>
            <Input
              id="hc-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. The Smith family"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="hc-caption">Caption (optional)</Label>
            <Input
              id="hc-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Nissan Qashqai handover"
            />
          </div>
        </div>
        <Button variant="gold" onClick={handleUpload} disabled={uploading || !file}>
          {uploading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
          ) : (
            <><Upload className="w-4 h-4 mr-2" /> Publish photo</>
          )}
        </Button>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-12">Loading...</div>
      ) : items.length === 0 ? (
        <div className="bg-card rounded-xl shadow-card p-12 text-center">
          <Smile className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No happy customer photos yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="aspect-[4/5] bg-muted overflow-hidden">
                <img src={item.image_url} alt={item.caption || "Happy customer"} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-3">
                {item.customer_name && <p className="font-medium text-foreground">{item.customer_name}</p>}
                {item.caption && <p className="text-sm text-muted-foreground">{item.caption}</p>}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <Switch checked={item.is_active} onCheckedChange={() => toggleActive(item)} />
                    <span className="text-xs text-muted-foreground">{item.is_active ? "Live" : "Hidden"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button size="icon" variant="ghost" onClick={() => move(item, -1)} aria-label="Move up">
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => move(item, 1)} aria-label="Move down">
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(item)} aria-label="Delete">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHappyCustomers;
