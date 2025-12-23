CREATE TABLE public.services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    description text,
    images jsonb,
    thumbnail text,
    base_price numeric NOT NULL,
    session_options jsonb,
    duration_minutes integer,
    is_popular boolean NOT NULL DEFAULT false,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Indexes
CREATE INDEX idx_services_category_id ON public.services(category_id);
CREATE INDEX idx_services_is_active ON public.services(is_active);
CREATE INDEX idx_services_is_popular ON public.services(is_popular);

-- Row Level Security (optional, for Supabase)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
