export interface ShipType {
  shipId: number;
  shipName: string;
  points: number;
  hullType: string;
  fitting: string;
}

export interface CompType {
  id: string;
  compId: number;
  compName: string;
  ships: Array<ShipType>;
  isConfirmed: boolean;
  note?: string;
}
