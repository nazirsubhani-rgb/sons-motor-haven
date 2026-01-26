import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

interface SiteSettings {
  id: string;
  phone_number: string;
  email_address: string;
  opening_hours: string;
  facebook_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  show_warranty_banner: boolean;
}

const AdminSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (settings) {
      setSettings({ ...settings, [name]: value });
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (settings) {
      setSettings({ ...settings, [name]: checked });
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({
          phone_number: settings.phone_number,
          email_address: settings.email_address,
          opening_hours: settings.opening_hours,
          facebook_url: settings.facebook_url || null,
          instagram_url: settings.instagram_url || null,
          twitter_url: settings.twitter_url || null,
          show_warranty_banner: settings.show_warranty_banner,
        })
        .eq("id", settings.id);

      if (error) throw error;

      toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
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
        <p className="text-muted-foreground mt-4">Loading settings...</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">No settings found.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Site Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your website settings
        </p>
      </div>

      <div className="space-y-8">
        {/* Contact Information */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={settings.phone_number}
                onChange={handleChange}
                placeholder="07960 130449"
              />
            </div>
            <div>
              <Label htmlFor="email_address">Email Address</Label>
              <Input
                id="email_address"
                name="email_address"
                type="email"
                value={settings.email_address}
                onChange={handleChange}
                placeholder="wmsonsmotorsltd@gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="opening_hours">Opening Hours</Label>
              <Input
                id="opening_hours"
                name="opening_hours"
                value={settings.opening_hours}
                onChange={handleChange}
                placeholder="Mon-Sat: 9am-6pm, Sun: By appointment"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Social Media Links
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                name="facebook_url"
                value={settings.facebook_url || ""}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                name="instagram_url"
                value={settings.instagram_url || ""}
                onChange={handleChange}
                placeholder="https://instagram.com/yourpage"
              />
            </div>
            <div>
              <Label htmlFor="twitter_url">Twitter URL</Label>
              <Input
                id="twitter_url"
                name="twitter_url"
                value={settings.twitter_url || ""}
                onChange={handleChange}
                placeholder="https://twitter.com/yourpage"
              />
            </div>
          </div>
        </div>

        {/* Display Options */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Display Options
          </h2>
          <div className="flex items-center gap-4">
            <Switch
              id="show_warranty_banner"
              checked={settings.show_warranty_banner}
              onCheckedChange={(c) =>
                handleSwitchChange("show_warranty_banner", c)
              }
            />
            <Label htmlFor="show_warranty_banner">
              Show Warranty Banner Across Site
            </Label>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Display the "Warranty in partnership with Autoguard" banner on all
            pages.
          </p>
        </div>

        <Button
          variant="gold"
          size="lg"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
