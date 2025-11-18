-- ============================================================================
-- Migration: Seed Exchange Rates
-- Description: Populates exchange_rates table with initial data for common countries
--              Uses approximate exchange rates as of late 2024
-- ============================================================================

-- Note: Exchange rates are multipliers to convert FROM local currency TO EUR
-- Example: 1.10 means 1 EUR = 1.10 USD, so to convert USD to EUR, divide by 1.10

INSERT INTO public.exchange_rates (
  country_id,
  currency_code,
  exchange_rate_to_eur,
  effective_date,
  is_active,
  notes,
  created_by
)
SELECT 
  c.country_id,
  c.currency_code,
  CASE c.currency_code
    -- Major currencies (approximate rates as of late 2024)
    WHEN 'EUR' THEN 1.0
    WHEN 'USD' THEN 1.10  -- 1 EUR = 1.10 USD
    WHEN 'GBP' THEN 0.85  -- 1 EUR = 0.85 GBP
    WHEN 'CHF' THEN 0.95  -- 1 EUR = 0.95 CHF
    WHEN 'JPY' THEN 165.0  -- 1 EUR = 165 JPY
    WHEN 'CNY' THEN 7.8   -- 1 EUR = 7.8 CNY
    WHEN 'CAD' THEN 1.50   -- 1 EUR = 1.50 CAD
    WHEN 'AUD' THEN 1.65   -- 1 EUR = 1.65 AUD
    WHEN 'NZD' THEN 1.80   -- 1 EUR = 1.80 NZD
    WHEN 'SEK' THEN 11.5   -- 1 EUR = 11.5 SEK
    WHEN 'NOK' THEN 11.8   -- 1 EUR = 11.8 NOK
    WHEN 'DKK' THEN 7.45   -- 1 EUR = 7.45 DKK (pegged)
    WHEN 'PLN' THEN 4.35   -- 1 EUR = 4.35 PLN
    WHEN 'CZK' THEN 24.5   -- 1 EUR = 24.5 CZK
    WHEN 'HUF' THEN 390.0  -- 1 EUR = 390 HUF
    WHEN 'RON' THEN 4.95   -- 1 EUR = 4.95 RON
    WHEN 'BGN' THEN 1.96   -- 1 EUR = 1.96 BGN (pegged)
    WHEN 'HRK' THEN 7.50   -- 1 EUR = 7.50 HRK
    WHEN 'RUB' THEN 100.0  -- 1 EUR = 100 RUB (approximate, volatile)
    WHEN 'INR' THEN 92.0   -- 1 EUR = 92 INR
    WHEN 'BRL' THEN 5.5    -- 1 EUR = 5.5 BRL
    WHEN 'MXN' THEN 18.5   -- 1 EUR = 18.5 MXN
    WHEN 'ZAR' THEN 20.0   -- 1 EUR = 20 ZAR
    WHEN 'KRW' THEN 1450.0 -- 1 EUR = 1450 KRW
    WHEN 'SGD' THEN 1.50   -- 1 EUR = 1.50 SGD
    WHEN 'HKD' THEN 8.6    -- 1 EUR = 8.6 HKD
    WHEN 'TWD' THEN 35.0   -- 1 EUR = 35 TWD
    WHEN 'THB' THEN 38.5   -- 1 EUR = 38.5 THB
    WHEN 'MYR' THEN 5.1    -- 1 EUR = 5.1 MYR
    WHEN 'IDR' THEN 17000.0 -- 1 EUR = 17000 IDR
    WHEN 'PHP' THEN 61.0   -- 1 EUR = 61 PHP
    WHEN 'VND' THEN 27000.0 -- 1 EUR = 27000 VND
    WHEN 'TRY' THEN 35.0   -- 1 EUR = 35 TRY
    WHEN 'ILS' THEN 4.1    -- 1 EUR = 4.1 ILS
    WHEN 'AED' THEN 4.0    -- 1 EUR = 4.0 AED (pegged)
    WHEN 'SAR' THEN 4.1    -- 1 EUR = 4.1 SAR (pegged)
    WHEN 'EGP' THEN 50.0   -- 1 EUR = 50 EGP
    WHEN 'NGN' THEN 1500.0 -- 1 EUR = 1500 NGN
    WHEN 'KES' THEN 150.0  -- 1 EUR = 150 KES
    WHEN 'ARS' THEN 950.0  -- 1 EUR = 950 ARS (highly volatile)
    WHEN 'CLP' THEN 1000.0 -- 1 EUR = 1000 CLP
    WHEN 'COP' THEN 4200.0 -- 1 EUR = 4200 COP
    WHEN 'PEN' THEN 3.8    -- 1 EUR = 3.8 PEN
    WHEN 'UAH' THEN 40.0   -- 1 EUR = 40 UAH (approximate, volatile)
    ELSE 1.0  -- Default to 1.0 for unknown currencies (assume EUR equivalent)
  END as exchange_rate_to_eur,
  CURRENT_DATE as effective_date,
  true as is_active,
  'Initial seed data - approximate rates as of late 2024' as notes,
  'system' as created_by
FROM public.countries c
WHERE c.is_active = true
  AND NOT EXISTS (
    -- Don't insert if exchange rate already exists for this country and date
    SELECT 1 
    FROM public.exchange_rates er 
    WHERE er.country_id = c.country_id 
      AND er.effective_date = CURRENT_DATE
  )
ON CONFLICT (country_id, effective_date) DO NOTHING;

-- Add comment
COMMENT ON TABLE public.exchange_rates IS 'Exchange rates from local currencies to EUR. EUR is the rollup currency for reporting. Rates are approximate and should be updated regularly.';

