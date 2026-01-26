-- Create enums for vehicle and enquiry status
CREATE TYPE public.vehicle_status AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE public.fuel_type AS ENUM ('petrol', 'diesel', 'electric', 'hybrid', 'plug-in hybrid');
CREATE TYPE public.transmission_type AS ENUM ('manual', 'automatic');
CREATE TYPE public.body_type AS ENUM ('hatchback', 'saloon', 'estate', 'suv', 'coupe', 'convertible', 'mpv', 'van', 'pickup');
CREATE TYPE public.enquiry_status AS ENUM ('new', 'replied', 'closed');
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  trim TEXT,
  year INTEGER NOT NULL CHECK (year >= 1900 AND year <= 2100),
  mileage INTEGER NOT NULL CHECK (mileage >= 0),
  price INTEGER NOT NULL CHECK (price >= 0),
  fuel_type public.fuel_type NOT NULL,
  transmission public.transmission_type NOT NULL,
  engine_size TEXT,
  colour TEXT,
  body_type public.body_type,
  number_of_owners INTEGER CHECK (number_of_owners >= 0),
  service_history BOOLEAN DEFAULT false,
  service_history_notes TEXT,
  mot_expiry_date DATE,
  key_features TEXT[] DEFAULT '{}',
  description TEXT,
  warranty_included BOOLEAN DEFAULT true,
  status public.vehicle_status DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create vehicle_images table
CREATE TABLE public.vehicle_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create enquiries table
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  status public.enquiry_status DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT DEFAULT '07960 130449',
  email_address TEXT DEFAULT 'wmsonsmotorsltd@gmail.com',
  opening_hours TEXT DEFAULT 'Mon-Sat: 9am-6pm, Sun: By appointment',
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  show_warranty_banner BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Vehicles: Public can read available vehicles, admins can do everything
CREATE POLICY "Anyone can view available vehicles"
  ON public.vehicles FOR SELECT
  USING (status = 'available' OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert vehicles"
  ON public.vehicles FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update vehicles"
  ON public.vehicles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vehicles"
  ON public.vehicles FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Vehicle Images: Public can read, admins can manage
CREATE POLICY "Anyone can view vehicle images"
  ON public.vehicle_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert vehicle images"
  ON public.vehicle_images FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update vehicle images"
  ON public.vehicle_images FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vehicle images"
  ON public.vehicle_images FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Enquiries: Anyone can create, admins can read and manage
CREATE POLICY "Anyone can create enquiries"
  ON public.enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view enquiries"
  ON public.enquiries FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update enquiries"
  ON public.enquiries FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete enquiries"
  ON public.enquiries FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- User Roles: Only admins can view and manage
CREATE POLICY "Admins can view user roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

-- Site Settings: Public can read, admins can update
CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert site settings"
  ON public.site_settings FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_enquiries_updated_at
  BEFORE UPDATE ON public.enquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for vehicle images
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true);

-- Storage policies for vehicle images bucket
CREATE POLICY "Anyone can view vehicle images in storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'vehicle-images');

CREATE POLICY "Admins can upload vehicle images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'vehicle-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update vehicle images in storage"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'vehicle-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete vehicle images in storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'vehicle-images' AND public.has_role(auth.uid(), 'admin'));

-- Insert default site settings
INSERT INTO public.site_settings (phone_number, email_address, opening_hours, show_warranty_banner)
VALUES ('07960 130449', 'wmsonsmotorsltd@gmail.com', 'Mon-Sat: 9am-6pm, Sun: By appointment', true);