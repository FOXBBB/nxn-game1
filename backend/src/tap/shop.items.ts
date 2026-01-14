
export enum UpgradeType {
  TAP = 'TAP',
  ENERGY = 'ENERGY',
  AUTOCLICKER = 'AUTOCLICKER',
}

export const SHOP_ITEMS = [
  // ===== TAP UPGRADES =====
  { id: 'tap2', kind: 'TAP_2', value: 2, priceTon: 0.2 },
  { id: 'tap5', kind: 'TAP_5', value: 5, priceTon: 0.5 },
  { id: 'tap10', kind: 'TAP_10', value: 10, priceTon: 0.7 },
  { id: 'tap50', kind: 'TAP_50', value: 50, priceTon: 0.9 },
  { id: 'tap100', kind: 'TAP_100', value: 100, priceTon: 1.0 },

  // ===== ENERGY UPGRADES =====
  { id: 'energy200', kind: 'ENERGY_200', value: 200, priceTon: 0.2 },
  { id: 'energy500', kind: 'ENERGY_500', value: 500, priceTon: 0.5 },
  { id: 'energy2000', kind: 'ENERGY_2000', value: 2000, priceTon: 0.7 },
  { id: 'energy5000', kind: 'ENERGY_5000', value: 5000, priceTon: 0.9 },
  { id: 'energy10000', kind: 'ENERGY_10000', value: 10000, priceTon: 1.0 },

  // ===== AUTOCLICKER =====
  { id: 'auto', kind: 'AUTOCLICKER', value: 0, priceTon: 2.0 },
];


