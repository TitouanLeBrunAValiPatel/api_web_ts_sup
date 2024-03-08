import { Apartment } from "src/@datas/apartment.entity";

export interface Tenant {
    id?: number;
  
    name: string;
  
    apartment: Apartment;
    
    
}