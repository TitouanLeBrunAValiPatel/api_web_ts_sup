import { Tenant } from "src/@datas/tenant.entity";
import { Type } from "src/@datas/type.entity";
import { Building } from "./building.model";

export interface Apartment {
    id?: number;
    name: string;
    type?: Type;
    building?: Building;
    mainTenant?: Tenant;
    tenants?: Tenant[];
}