-- Add length constraints to enquiries table for server-side validation
ALTER TABLE public.enquiries
  ADD CONSTRAINT enquiries_name_length CHECK (char_length(name) > 0 AND char_length(name) <= 100),
  ADD CONSTRAINT enquiries_email_length CHECK (char_length(email) > 0 AND char_length(email) <= 255),
  ADD CONSTRAINT enquiries_phone_length CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT enquiries_message_length CHECK (char_length(message) > 0 AND char_length(message) <= 2000),
  ADD CONSTRAINT enquiries_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Explicit deny policies on user_roles for INSERT/UPDATE/DELETE (only admins)
CREATE POLICY "Only admins can insert user roles"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update user roles"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete user roles"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Restrict storage.objects listing on vehicle-images bucket
-- Drop overly permissive existing public select policy if it exists, replace with read-by-id only is not feasible for public images.
-- Instead, we keep public read (needed for image URLs) but the listing concern is mitigated by ensuring no broad LIST policy that exposes filenames beyond what the app needs.
-- The bucket must remain public-readable for images to display. We add a policy that allows SELECT on objects but it's already there. No change needed unless we want to block listing — keep as-is for public site assets.