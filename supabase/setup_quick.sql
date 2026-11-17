-- ==============================================================================
-- SETUP SUPABASE CEPAT UNTUK PORTOFOLIO ABDUL RASYID FADHILAH HANAN
-- Salin dan jalankan seluruh script ini di SQL Editor Supabase Anda:
-- ==============================================================================

-- 1. TABEL UNTUK MENYIMPAN SEMUA KONTEN CMS (PROFIL, PROYEK, PRESTASI, TEKS, DLL)
CREATE TABLE IF NOT EXISTS public.portfolio_state (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. IZIN AKSES KEAMANAN (ROW LEVEL SECURITY)
ALTER TABLE public.portfolio_state ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read" ON public.portfolio_state;
CREATE POLICY "Allow public read" ON public.portfolio_state FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow service all" ON public.portfolio_state;
CREATE POLICY "Allow service all" ON public.portfolio_state FOR ALL USING (true);

-- 3. BUCKET CLOUD STORAGE UNTUK FOTO & BERKAS CV
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Allow public view media" ON storage.objects;
CREATE POLICY "Allow public view media" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
DROP POLICY IF EXISTS "Allow upload media" ON storage.objects;
CREATE POLICY "Allow upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');
DROP POLICY IF EXISTS "Allow update media" ON storage.objects;
CREATE POLICY "Allow update media" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-media');
