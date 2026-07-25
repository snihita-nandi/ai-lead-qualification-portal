// Application navigation configuration
import type { NavItem } from '@/types';

export const dashboardNav: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    label: 'Leads',
    href: '/dashboard/leads',
    icon: 'Users',
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: 'BarChart3',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: 'Settings',
  },
];

export const marketingNav: NavItem[] = [
  {
    label: 'Features',
    href: '/#features',
  },
  {
    label: 'Pricing',
    href: '/#pricing',
  },
  {
    label: 'About',
    href: '/about',
  },
];
