-- Add missing URL columns to restaurants table
-- Migration 003 only added storage_path columns, this adds the URL columns

ALTER TABLE public.restaurants
ADD COLUMN IF NOT EXISTS logo_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS menu_pdf_url VARCHAR(500);

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'restaurants' 
AND column_name IN ('logo_url', 'logo_storage_path', 'menu_pdf_url', 'menu_pdf_storage_path');
