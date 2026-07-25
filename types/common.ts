// Shared common type definitions

export type SortDirection = 'asc' | 'desc';

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'default' | 'primary' | 'secondary' | 'danger' | 'success' | 'warning';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface TableColumn<T = unknown> {
  key: string;
  header: string;
  accessor?: keyof T;
  sortable?: boolean;
  width?: string;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}
