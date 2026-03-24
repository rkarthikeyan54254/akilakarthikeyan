-- Create a table for global site statistics
CREATE TABLE IF NOT EXISTS public.site_stats (
    key TEXT PRIMARY KEY,
    value BIGINT DEFAULT 0
);

-- Initialize the total_reads counter with a "history" value for impact
INSERT INTO public.site_stats (key, value)
VALUES ('total_reads', 5000)
ON CONFLICT (key) DO NOTHING;

-- Function to safely increment the counter (Atomic)
CREATE OR REPLACE FUNCTION increment_total_reads()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_value BIGINT;
BEGIN
    UPDATE public.site_stats
    SET value = value + 1
    WHERE key = 'total_reads'
    RETURNING value INTO new_value;
    
    RETURN new_value;
END;
$$;
