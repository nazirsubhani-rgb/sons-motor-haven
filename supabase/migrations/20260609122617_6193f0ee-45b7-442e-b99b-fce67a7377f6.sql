
-- Happy customers table
CREATE TABLE public.happy_customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  customer_name text,
  display_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.happy_customers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.happy_customers TO authenticated;
GRANT ALL ON public.happy_customers TO service_role;

ALTER TABLE public.happy_customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active happy customers"
  ON public.happy_customers FOR SELECT
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert happy customers"
  ON public.happy_customers FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update happy customers"
  ON public.happy_customers FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete happy customers"
  ON public.happy_customers FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_happy_customers_updated_at
  BEFORE UPDATE ON public.happy_customers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for a 'happy-customers' bucket (bucket created via tool)
CREATE POLICY "Public read happy-customers"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'happy-customers');

CREATE POLICY "Admins upload happy-customers"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'happy-customers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update happy-customers"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'happy-customers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete happy-customers"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'happy-customers' AND public.has_role(auth.uid(), 'admin'));
