import { Types } from "mongoose";


export interface ITourType {
    name : string;

}
    
export interface ITour{
    title :string;
    slug: string;
    thumbnail ?: string;
    description ?: string;
    images ?: string[];
    location? : string;
    costFrom ?: number;
    startDate ?: Date;
    endDate ?: Date;
    included ?: string[];
    excluded ?: string[];
    amenities ?: string[];
    tourPlan ?: string[];
    minAge ?: number;
    division : Types.ObjectId;
    duration ?: number;
    maxGuest ?: number;
    tourType : Types.ObjectId;

    
   

}