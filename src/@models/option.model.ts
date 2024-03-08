import { Apartment } from "src/@datas/apartment.entity";

export interface Option {
    id?: number;
  
    name: string;
  
    apartments?: Apartment[];
    
    
}