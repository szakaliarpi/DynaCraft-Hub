import {BoxType} from "@/components/types/BoxType";

export type ServiceType = {
    id: string;
    title: string;
    description: string;
    image: string;
    boxes: BoxType[];
    timestamp: number;
};

