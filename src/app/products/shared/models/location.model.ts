export interface Floor {
  id: number;
  name: string;
}

export interface Section {
  id: number;
  name: string;
}

export interface ProductLocation {
  floor: Floor;
  sections?: Section[];
}
