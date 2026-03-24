/**
 * Semantic typography roles — mirrors `src/styles/typography.css` @utility classes.
 * Compose with size/color: `cn(typography.pageTitle, 'text-xl text-slate-900')`.
 */
export const typography = {
  pageTitle: 'typo-page-title',
  pageSubtitle: 'typo-page-subtitle',
  sectionTitle: 'typo-section-title',
  sectionLabel: 'typo-section-label',
  cardTitle: 'typo-card-title',
  label: 'typo-label',
  body: 'typo-body',
  meta: 'typo-meta',
  kpi: 'typo-kpi',
  tableHeader: 'typo-table-header',
  denseCaps: 'typo-dense-caps',
} as const;
