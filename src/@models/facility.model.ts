import { BuildingFacility } from "src/@datas/building-facility.entity";

export interface Facility {
    id?: number;

    name: string;

    isSafetyEquipment: boolean;

    buildingRelations?: BuildingFacility[];
    
    
}