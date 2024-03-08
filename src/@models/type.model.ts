import { Apartment } from "src/@datas/apartment.entity";

export interface Type {
    id?: number;
    name: string;
    number_person: number;
  
    apartments?: Apartment[];
}