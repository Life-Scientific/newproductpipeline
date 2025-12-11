-- ============================================================================
-- Migration: Seed KPI Structure from Operations Dashboard
-- Description: Populates the KPI dashboard with the structure from the
--              "One Pager Health Report - Operations Focus"
-- ============================================================================

-- Clear existing seed data (optional - comment out if you want to keep existing)
-- DELETE FROM operations.kpi_key_results;
-- DELETE FROM operations.kpi_strategic_drivers;
-- DELETE FROM operations.kpi_core_drivers;

-- ============================================================================
-- Core Drivers
-- ============================================================================

INSERT INTO operations.kpi_core_drivers (id, label, target, sort_order) VALUES
  ('00000000-0000-0000-0001-000000000001', 'Revenue Growth', '4x by 2030 (€250m)', 1),
  ('00000000-0000-0000-0001-000000000002', 'Cash Operating Margin', 'EBITDA 7x by 2030 (€100m)', 2),
  ('00000000-0000-0000-0001-000000000003', 'Capital Efficiency', '15%+ IRR on investments', 3),
  ('00000000-0000-0000-0001-000000000004', 'ROC', '>12%', 4),
  ('00000000-0000-0000-0001-000000000005', 'Revenue Return', NULL, 5),
  ('00000000-0000-0000-0001-000000000006', 'R&D Spend', NULL, 6)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Strategic Drivers under Revenue Growth
-- ============================================================================

INSERT INTO operations.kpi_strategic_drivers (id, core_driver_id, label, sort_order) VALUES
  ('00000000-0000-0000-0002-000000000001', '00000000-0000-0000-0001-000000000001', 'Markets / Regions', 1),
  ('00000000-0000-0000-0002-000000000002', '00000000-0000-0000-0001-000000000001', 'Products Art 34''s', 2),
  ('00000000-0000-0000-0002-000000000003', '00000000-0000-0000-0001-000000000001', 'Products Art 33''s', 3),
  ('00000000-0000-0000-0002-000000000004', '00000000-0000-0000-0001-000000000001', 'Adjacent offerings', 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Strategic Drivers under Cash Operating Margin
-- ============================================================================

INSERT INTO operations.kpi_strategic_drivers (id, core_driver_id, label, sort_order) VALUES
  ('00000000-0000-0000-0002-000000000005', '00000000-0000-0000-0001-000000000002', 'Product Margin / COGS', 1),
  ('00000000-0000-0000-0002-000000000006', '00000000-0000-0000-0001-000000000002', 'Supply Chain Performance', 2),
  ('00000000-0000-0000-0002-000000000007', '00000000-0000-0000-0001-000000000002', 'Working Capital Optimization', 3),
  ('00000000-0000-0000-0002-000000000008', '00000000-0000-0000-0001-000000000002', 'Process Efficiency', 4),
  ('00000000-0000-0000-0002-000000000009', '00000000-0000-0000-0001-000000000002', 'Freight/Tariff Optimization', 5)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Strategic Drivers under Capital Efficiency
-- ============================================================================

INSERT INTO operations.kpi_strategic_drivers (id, core_driver_id, label, sort_order) VALUES
  ('00000000-0000-0000-0002-000000000010', '00000000-0000-0000-0001-000000000003', 'Demand Visibility', 1),
  ('00000000-0000-0000-0002-000000000011', '00000000-0000-0000-0001-000000000003', 'Supply Planning', 2),
  ('00000000-0000-0000-0002-000000000012', '00000000-0000-0000-0001-000000000003', 'Revenue Return', 3),
  ('00000000-0000-0000-0002-000000000013', '00000000-0000-0000-0001-000000000003', 'ROC (Return on Capital)', 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Markets / Regions
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000001', '00000000-0000-0000-0002-000000000001', '% N Rev', 'yellow', '50%', NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000002', '00000000-0000-0000-0002-000000000001', 'UK & IR Rev', 'yellow', NULL, NULL, 'flat', 2),
  ('00000000-0000-0000-0003-000000000003', '00000000-0000-0000-0002-000000000001', 'US & CA Rev', 'yellow', NULL, NULL, 'flat', 3),
  ('00000000-0000-0000-0003-000000000004', '00000000-0000-0000-0002-000000000001', 'France % Rev', 'yellow', NULL, NULL, 'flat', 4),
  ('00000000-0000-0000-0003-000000000005', '00000000-0000-0000-0002-000000000001', 'Germany % Rev', 'yellow', NULL, NULL, 'flat', 5),
  ('00000000-0000-0000-0003-000000000006', '00000000-0000-0000-0002-000000000001', 'Other % Rev', 'yellow', NULL, NULL, 'flat', 6),
  ('00000000-0000-0000-0003-000000000007', '00000000-0000-0000-0002-000000000001', 'France % Market Share', 'yellow', NULL, NULL, 'flat', 7),
  ('00000000-0000-0000-0003-000000000008', '00000000-0000-0000-0002-000000000001', 'UK & IR % Market Share', 'yellow', NULL, NULL, 'flat', 8)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Products Art 34's
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000009', '00000000-0000-0000-0002-000000000002', '# of submissions', 'red', NULL, NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000010', '00000000-0000-0000-0002-000000000002', '% success rate in submissions', 'red', NULL, NULL, 'flat', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Products Art 33's
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000011', '00000000-0000-0000-0002-000000000003', '# of Art 33''s submitted', 'yellow', NULL, NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000012', '00000000-0000-0000-0002-000000000003', '# of Art 34''s submitted', 'red', NULL, NULL, 'flat', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Adjacent offerings
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000013', '00000000-0000-0000-0002-000000000004', 'Patented products', 'green', NULL, NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000014', '00000000-0000-0000-0002-000000000004', '# of products in portfolio', 'red', NULL, NULL, 'flat', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Product Margin / COGS
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000015', '00000000-0000-0000-0002-000000000005', 'Target Gross Margin %', 'green', '>40%', NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000016', '00000000-0000-0000-0002-000000000005', 'Target Rebate % Rev', 'green', '<15%', NULL, 'flat', 2),
  ('00000000-0000-0000-0003-000000000017', '00000000-0000-0000-0002-000000000005', 'Stock Write off % of COGS', 'yellow', '<1%', NULL, 'flat', 3),
  ('00000000-0000-0000-0003-000000000018', '00000000-0000-0000-0002-000000000005', 'GM per FTE', 'green', '500,000', NULL, 'flat', 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Supply Chain Performance
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000019', '00000000-0000-0000-0002-000000000006', 'Target delivery OTIF % to customer', 'yellow', '99%', NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000020', '00000000-0000-0000-0002-000000000006', 'Target Supplier deliver on time % to us', 'green', '99%', NULL, 'flat', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Working Capital Optimization
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000021', '00000000-0000-0000-0002-000000000007', 'Net Working Capital % of Sales', 'yellow', '<2%', NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000022', '00000000-0000-0000-0002-000000000007', 'Target DSO Days', 'yellow', NULL, NULL, 'flat', 2),
  ('00000000-0000-0000-0003-000000000023', '00000000-0000-0000-0002-000000000007', 'Target DPO >180 days', 'yellow', NULL, NULL, 'flat', 3),
  ('00000000-0000-0000-0003-000000000024', '00000000-0000-0000-0002-000000000007', 'Target DIO Days', 'yellow', NULL, NULL, 'flat', 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Process Efficiency
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000025', '00000000-0000-0000-0002-000000000008', 'Right first time metric to be developed', 'yellow', 'TBC', NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000026', '00000000-0000-0000-0002-000000000008', 'Tailor Performance Score', 'yellow', 'TBC', NULL, 'flat', 2),
  ('00000000-0000-0000-0003-000000000027', '00000000-0000-0000-0002-000000000008', 'Customer returns # and €', 'yellow', 'TBC', NULL, 'flat', 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Freight/Tariff Optimization
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000028', '00000000-0000-0000-0002-000000000009', 'Freight costs as % of purchases', 'yellow', NULL, NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000029', '00000000-0000-0000-0002-000000000009', 'Tariff costs as % of purchases', 'yellow', NULL, NULL, 'flat', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Demand Visibility
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000030', '00000000-0000-0000-0002-000000000010', '% forecast accuracy - forecast vs. purchasing plan vs. actual', 'yellow', NULL, NULL, 'flat', 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Supply Planning
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000031', '00000000-0000-0000-0002-000000000011', 'Obsolete stock % of total stock', 'yellow', NULL, NULL, 'flat', 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - Revenue Return
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000032', '00000000-0000-0000-0002-000000000012', 'Avg time to register product', 'green', NULL, NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000033', '00000000-0000-0000-0002-000000000012', 'Product Lab Throughput', 'yellow', NULL, NULL, 'flat', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Key Results - ROC (Return on Capital)
-- ============================================================================

INSERT INTO operations.kpi_key_results (
  id, strategic_driver_id, label, status, target, reality, trend, sort_order
) VALUES
  ('00000000-0000-0000-0003-000000000034', '00000000-0000-0000-0002-000000000013', 'Op Profit / Capex %', 'green', '>12%', NULL, 'flat', 1),
  ('00000000-0000-0000-0003-000000000035', '00000000-0000-0000-0002-000000000013', 'Rev from New Product Growth Rates', 'yellow', NULL, NULL, 'flat', 2)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Create default data sources for all key results
-- ============================================================================

INSERT INTO operations.kpi_data_sources (key_result_id, source_system, frequency, sync_enabled)
SELECT 
  kr.id,
  'Manual Entry',
  'manual',
  false
FROM operations.kpi_key_results kr
WHERE NOT EXISTS (
  SELECT 1 FROM operations.kpi_data_sources ds WHERE ds.key_result_id = kr.id
);

