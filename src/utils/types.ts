export interface ShipType {
  shipId: number;
  name: string;
  points: number;
  hullType: string;
  fitting: string;
}

export interface CompType {
  compId: number;
  compName: string;
  ships: Array<ShipType>;
  isConfirmed: boolean;
  note?: string;
}
