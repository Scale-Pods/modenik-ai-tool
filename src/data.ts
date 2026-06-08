/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SKUData,
  DistributorPriority,
  ASMLeaderboardEntry,
  SecondarySalesEntry,
  InsightFeedItem
} from './types';

export const SKUs: SKUData[] = [
  {
    name: 'Josh ICD',
    type: 'Innerwear',
    sales: '₹24.5 L',
    contribution: 60,
    growth: '+12.4%',
    status: 'HIGH MOMENTUM'
  },
  {
    name: 'Josh RN White',
    type: 'Innerwear',
    sales: '₹18.2 L',
    contribution: 45,
    growth: '+8.1%',
    status: 'STABLE'
  },
  {
    name: 'Classic Trunk XL',
    type: 'Core',
    sales: '₹42.0 L',
    contribution: 85,
    growth: '-2.3%',
    status: 'WATCHLIST'
  }
];

export const DistributorPriorities: DistributorPriority[] = [
  {
    id: 'UP_DB',
    name: 'UP DB (1004821)',
    territory: 'Lucknow North',
    urgency: 'HIGH URGENCY',
    opportunity: '₹2.4L away from 2% extra incentive.',
    details: 'Slab Opportunity: ₹2.4L away from 2% extra incentive.'
  },
  {
    id: 'NAGAR_DB',
    name: 'Nagar DB (1003498)',
    territory: 'Kanpur Central',
    urgency: 'RECOVERY',
    opportunity: 'Payment Risk: Outstanding dues crossed 45 days.',
    details: 'Payment Risk: Outstanding dues crossed 45 days.'
  },
  {
    id: 'BIHAR_DB',
    name: 'Bihar DB (1005291)',
    territory: 'Patna South',
    urgency: 'GROWTH',
    opportunity: 'Stock-Out Alert: High demand for Premium Boxer line.',
    details: 'Stock-Out Alert: High demand for Premium Boxer line.'
  },
  {
    id: 'APTL_DB',
    name: 'APTL DB (1007421)',
    territory: 'Varanasi East',
    urgency: 'STABLE',
    opportunity: 'Slab Target Met: Guide on next level acceleration.',
    details: 'Slab Target Met: Guide on next level acceleration.'
  }
];

export const ASMLeaderboard: ASMLeaderboardEntry[] = [
  {
    name: 'Rakesh Parida',
    initials: 'RK',
    state: 'Odisha',
    ach: 98.4,
    ectcpc: '142 / 150 / 118',
    upside: '₹0.85 Cr',
    status: 'EXCELLENT'
  },
  {
    name: 'Amar Nath',
    initials: 'AM',
    state: 'Bihar',
    ach: 92.1,
    ectcpc: '128 / 144 / 102',
    upside: '₹0.62 Cr',
    status: 'ON TRACK'
  },
  {
    name: 'Ajay Sen',
    initials: 'AJ',
    state: 'West Bengal',
    ach: 89.5,
    ectcpc: '115 / 138 / 94',
    upside: '₹0.48 Cr',
    status: 'ON TRACK'
  },
  {
    name: 'Puneet Shukla',
    initials: 'PN',
    state: 'Bihar',
    ach: 87.2,
    ectcpc: '110 / 140 / 88',
    upside: '₹0.55 Cr',
    status: 'ON TRACK'
  },
  {
    name: 'SK Ziaur',
    initials: 'SZ',
    state: 'West Bengal',
    ach: 76.8,
    ectcpc: '98 / 142 / 72',
    upside: '₹0.70 Cr',
    status: 'CRITICAL'
  }
];

export const SecondarySales: SecondarySalesEntry[] = [
  {
    name: 'Premier Garments - South',
    primaryMtd: '₹ 42.5 L',
    secondaryMtd: '₹ 38.2 L',
    closingStock: '₹ 14.8 L',
    sellThrough: 89,
    connector: 'Tally Connected'
  },
  {
    name: 'Apex Distribution Hub',
    primaryMtd: '₹ 28.1 L',
    secondaryMtd: '₹ 19.5 L',
    closingStock: '₹ 22.3 L',
    sellThrough: 62,
    connector: 'Excel Sync'
  },
  {
    name: 'Saffron Retail Supply',
    primaryMtd: '₹ 56.7 L',
    secondaryMtd: '₹ 44.1 L',
    closingStock: '₹ 18.2 L',
    sellThrough: 77,
    connector: 'Tally Connected'
  },
  {
    name: 'Urban Wear Partners',
    primaryMtd: '₹ 15.2 L',
    secondaryMtd: '₹ 14.8 L',
    closingStock: '₹ 3.4 L',
    sellThrough: 95,
    connector: 'Excel Sync'
  }
];

export const InsightFeed: InsightFeedItem[] = [
  {
    id: 'inf_1',
    type: 'SLAB OPPORTUNITY',
    confidence: '92% Conf.',
    text: 'UP DB has historically ordered bulk units in final week. High probability of target achievement.'
  },
  {
    id: 'inf_2',
    type: 'PAYMENT RISK',
    confidence: '88% Conf.',
    text: 'Nagar DB payment behavior shifting. Immediate intervention required to prevent blockage.'
  },
  {
    id: 'inf_3',
    type: 'GROWTH ALERT',
    confidence: '75% Conf.',
    text: 'Lucknow Cluster shows 14% WoW increase in retail demand for ActiveWear line.'
  }
];
