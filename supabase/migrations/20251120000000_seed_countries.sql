-- ============================================================================
-- Migration: Seed Countries
-- Description: Populates countries table with common countries for product pipeline
-- ============================================================================

INSERT INTO public.countries (
  country_code,
  country_name,
  currency_code,
  has_tariffs,
  is_active
)
VALUES
  -- Major markets
  ('US', 'United States', 'USD', false, true),
  ('GB', 'United Kingdom', 'GBP', false, true),
  ('DE', 'Germany', 'EUR', false, true),
  ('FR', 'France', 'EUR', false, true),
  ('IT', 'Italy', 'EUR', false, true),
  ('ES', 'Spain', 'EUR', false, true),
  ('NL', 'Netherlands', 'EUR', false, true),
  ('BE', 'Belgium', 'EUR', false, true),
  ('AT', 'Austria', 'EUR', false, true),
  ('CH', 'Switzerland', 'CHF', false, true),
  ('SE', 'Sweden', 'SEK', false, true),
  ('NO', 'Norway', 'NOK', false, true),
  ('DK', 'Denmark', 'DKK', false, true),
  ('PL', 'Poland', 'PLN', false, true),
  ('CZ', 'Czech Republic', 'CZK', false, true),
  ('HU', 'Hungary', 'HUF', false, true),
  ('RO', 'Romania', 'RON', false, true),
  ('BG', 'Bulgaria', 'BGN', false, true),
  ('HR', 'Croatia', 'EUR', false, true),
  ('IE', 'Ireland', 'EUR', false, true),
  ('PT', 'Portugal', 'EUR', false, true),
  ('GR', 'Greece', 'EUR', false, true),
  ('FI', 'Finland', 'EUR', false, true),
  ('JP', 'Japan', 'JPY', false, true),
  ('CN', 'China', 'CNY', true, true),
  ('IN', 'India', 'INR', true, true),
  ('AU', 'Australia', 'AUD', false, true),
  ('NZ', 'New Zealand', 'NZD', false, true),
  ('CA', 'Canada', 'CAD', false, true),
  ('BR', 'Brazil', 'BRL', true, true),
  ('MX', 'Mexico', 'MXN', true, true),
  ('AR', 'Argentina', 'ARS', true, true),
  ('CL', 'Chile', 'CLP', false, true),
  ('CO', 'Colombia', 'COP', false, true),
  ('PE', 'Peru', 'PEN', false, true),
  ('ZA', 'South Africa', 'ZAR', false, true),
  ('KR', 'South Korea', 'KRW', false, true),
  ('SG', 'Singapore', 'SGD', false, true),
  ('MY', 'Malaysia', 'MYR', false, true),
  ('TH', 'Thailand', 'THB', false, true),
  ('ID', 'Indonesia', 'IDR', false, true),
  ('PH', 'Philippines', 'PHP', false, true),
  ('VN', 'Vietnam', 'VND', false, true),
  ('TW', 'Taiwan', 'TWD', false, true),
  ('HK', 'Hong Kong', 'HKD', false, true),
  ('AE', 'United Arab Emirates', 'AED', false, true),
  ('SA', 'Saudi Arabia', 'SAR', false, true),
  ('IL', 'Israel', 'ILS', false, true),
  ('TR', 'Turkey', 'TRY', false, true),
  ('EG', 'Egypt', 'EGP', false, true),
  ('NG', 'Nigeria', 'NGN', false, true),
  ('KE', 'Kenya', 'KES', false, true),
  ('UA', 'Ukraine', 'UAH', false, true),
  ('RU', 'Russia', 'RUB', false, true)
ON CONFLICT (country_code) DO NOTHING;

-- Add comment
COMMENT ON TABLE public.countries IS 'Countries where products are registered and sold. Currency codes follow ISO 4217 standard.';






