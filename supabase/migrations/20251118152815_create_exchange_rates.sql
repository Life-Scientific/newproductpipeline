-- ============================================================================
-- Migration: Create Exchange Rates System
-- Description: Creates exchange_rates table to store currency conversion
--              rates to EUR (Euro is the rollup currency)
-- ============================================================================

CREATE TABLE public.exchange_rates (
  exchange_rate_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country_id uuid NOT NULL,
  currency_code varchar(3) NOT NULL,
  exchange_rate_to_eur numeric(12, 6) NOT NULL CHECK (exchange_rate_to_eur > 0),
  effective_date date NOT NULL,
  is_active boolean DEFAULT true,
  notes text,
  created_by varchar(255),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CONSTRAINT fk_exchange_rates_country FOREIGN KEY (country_id) 
    REFERENCES public.countries(country_id) ON DELETE CASCADE,
  CONSTRAINT uq_exchange_rates_country_date UNIQUE (country_id, effective_date)
);

-- Index for quick lookups
CREATE INDEX idx_exchange_rates_country ON public.exchange_rates(country_id);
CREATE INDEX idx_exchange_rates_currency ON public.exchange_rates(currency_code);
CREATE INDEX idx_exchange_rates_effective_date ON public.exchange_rates(effective_date DESC);
CREATE INDEX idx_exchange_rates_active ON public.exchange_rates(is_active) WHERE is_active = true;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_exchange_rates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER trg_exchange_rates_updated_at
  BEFORE UPDATE ON public.exchange_rates
  FOR EACH ROW
  EXECUTE FUNCTION update_exchange_rates_updated_at();

-- Function to get the most recent exchange rate for a country
CREATE OR REPLACE FUNCTION get_latest_exchange_rate(p_country_id uuid, p_date date DEFAULT CURRENT_DATE)
RETURNS numeric AS $$
DECLARE
  v_rate numeric;
BEGIN
  SELECT exchange_rate_to_eur INTO v_rate
  FROM public.exchange_rates
  WHERE country_id = p_country_id
    AND effective_date <= p_date
    AND is_active = true
  ORDER BY effective_date DESC
  LIMIT 1;
  
  RETURN COALESCE(v_rate, 1.0); -- Default to 1.0 if EUR or no rate found
END;
$$ LANGUAGE plpgsql STABLE;

COMMENT ON TABLE public.exchange_rates IS 'Exchange rates from local currencies to EUR. EUR is the rollup currency for reporting.';
COMMENT ON COLUMN public.exchange_rates.exchange_rate_to_eur IS 'Multiplier to convert from local currency to EUR (e.g., 1.10 means 1 EUR = 1.10 USD)';
COMMENT ON COLUMN public.exchange_rates.effective_date IS 'Date when this exchange rate becomes effective';
COMMENT ON FUNCTION get_latest_exchange_rate IS 'Returns the most recent active exchange rate for a country as of a given date';

