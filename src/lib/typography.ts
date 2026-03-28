/**
 * Semantic typography roles — mirrors `src/styles/typography.css` @utility classes.
 * Prefer `cn(typography.body, 'text-slate-900')` over raw `text-2sm`.
 *
 * `sectionTitle` and `cardTitle` share the same CSS: uppercase, text-gray-800, text-xs,
 * font-medium — use for section labels, panel headers, and card headers only (not person/entity names).
 *
 * Chat surfaces use `chatConversationName`, `chatRoleLabel`, `chatMessageBody`, `chatTimestamp`, etc.
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
  caption: 'typo-caption',
  kpi: 'typo-kpi',
  tableHeader: 'typo-table-header',
  tableCell: 'typo-table-cell',
  denseCaps: 'typo-dense-caps',
  toolbar: 'typo-toolbar',
  /** Chat UI — see `typography.css` typo-chat-* */
  chatConversationName: 'typo-chat-conversation-name',
  chatRoleLabel: 'typo-chat-role-label',
  chatMessageBody: 'typo-chat-message-body',
  chatTimestamp: 'typo-chat-timestamp',
  chatSidebarPreview: 'typo-chat-sidebar-preview',
  chatActionLabel: 'typo-chat-action-label',
  chatTag: 'typo-chat-tag',
  chatComposerInput: 'typo-chat-composer-input',
  chatFieldLabel: 'typo-chat-field-label',
} as const;
