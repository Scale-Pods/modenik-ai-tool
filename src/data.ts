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
    region: 'Bhubaneswar',
    ach: 98.4,
    ectcpc: '142 / 150 / 118',
    upside: '₹0.85 Cr',
    status: 'EXCELLENT',
    phone: '+91-9876543210',
    email: 'rakesh.parida@modenik.in',
    distributorsManaged: 24,
    teamSize: 6,
    targetPrimary: '₹3.2 Cr',
    achievedPrimary: '₹3.15 Cr',
    lat: 20.2961,
    lng: 85.8245
  },
  {
    name: 'Amar Nath',
    initials: 'AM',
    state: 'Bihar',
    region: 'Patna',
    ach: 92.1,
    ectcpc: '128 / 144 / 102',
    upside: '₹0.62 Cr',
    status: 'ON TRACK',
    phone: '+91-9876543211',
    email: 'amar.nath@modenik.in',
    distributorsManaged: 18,
    teamSize: 4,
    targetPrimary: '₹2.8 Cr',
    achievedPrimary: '₹2.58 Cr',
    lat: 25.5941,
    lng: 85.1376
  },
  {
    name: 'Ajay Sen',
    initials: 'AJ',
    state: 'West Bengal',
    region: 'Kolkata',
    ach: 89.5,
    ectcpc: '115 / 138 / 94',
    upside: '₹0.48 Cr',
    status: 'ON TRACK',
    phone: '+91-9876543212',
    email: 'ajay.sen@modenik.in',
    distributorsManaged: 20,
    teamSize: 5,
    targetPrimary: '₹2.5 Cr',
    achievedPrimary: '₹2.24 Cr',
    lat: 22.5726,
    lng: 88.3639
  },
  {
    name: 'Puneet Shukla',
    initials: 'PN',
    state: 'Bihar',
    region: 'Gaya',
    ach: 87.2,
    ectcpc: '110 / 140 / 88',
    upside: '₹0.55 Cr',
    status: 'ON TRACK',
    phone: '+91-9876543213',
    email: 'puneet.shukla@modenik.in',
    distributorsManaged: 15,
    teamSize: 4,
    targetPrimary: '₹2.2 Cr',
    achievedPrimary: '₹1.92 Cr',
    lat: 24.7955,
    lng: 84.9994
  },
  {
    name: 'SK Ziaur',
    initials: 'SZ',
    state: 'West Bengal',
    region: 'Siliguri',
    ach: 76.8,
    ectcpc: '98 / 142 / 72',
    upside: '₹0.70 Cr',
    status: 'CRITICAL',
    phone: '+91-9876543214',
    email: 'sk.ziaur@modenik.in',
    distributorsManaged: 12,
    teamSize: 3,
    targetPrimary: '₹2.0 Cr',
    achievedPrimary: '₹1.54 Cr',
    lat: 26.7271,
    lng: 88.3953
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
