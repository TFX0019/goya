export interface PromotionI {
    id?: string;
    image: string;
    phone: number;
    description: string;
    beneficio: string;
    website: string;
    ubication: Array<GeoPoinI>;
    categoria: string;
    promotionStart: string;
    promotionEnd: string;
    title: string;
}

export interface GeoPoinI {
    lat: number;
    lng: number;
}