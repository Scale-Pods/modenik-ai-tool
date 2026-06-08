/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'ASM' | 'Manager';

export type Screen = 'dashboard' | 'distributors' | 'planner' | 'phase23' | 'profile' | 'monthly_planner' | 'asm_map';

export interface KPIConfig {
  title: string;
  value: string;
  subValue: string;
  badge?: string;
  badgeType?: 'default' | 'error' | 'success' | 'warning';
  availableUpside?: boolean;
}

export interface SKUData {
  name: string;
  type: string;
  sales: string;
  contribution: number;
  growth: string;
  status: 'HIGH MOMENTUM' | 'STABLE' | 'WATCHLIST';
}

export interface DistributorPriority {
  id: string;
  name: string;
  territory: string;
  urgency: 'HIGH URGENCY' | 'RECOVERY' | 'GROWTH' | 'STABLE';
  opportunity: string;
  details: string;
}

export interface ASMLeaderboardEntry {
  name: string;
  initials: string;
  state: string;
  region: string;
  ach: number;
  ectcpc: string;
  upside: string;
  status: 'EXCELLENT' | 'ON TRACK' | 'CRITICAL';
  phone: string;
  email: string;
  distributorsManaged: number;
  teamSize: number;
  targetPrimary: string;
  achievedPrimary: string;
  lat: number;
  lng: number;
}

export interface SecondarySalesEntry {
  name: string;
  primaryMtd: string;
  secondaryMtd: string;
  closingStock: string;
  sellThrough: number;
  connector: 'Tally Connected' | 'Excel Sync';
}

export interface InsightFeedItem {
  id: string;
  type: 'SLAB OPPORTUNITY' | 'PAYMENT RISK' | 'GROWTH ALERT';
  confidence: string;
  text: string;
}
