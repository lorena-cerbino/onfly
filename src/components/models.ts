export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Hotel {
  id: number;
  favorite: boolean;
  name: string;
  description: string;
  stars: string;
  thumb: string;
  amenities: {key: string; label: string}[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  hasAgreement: boolean;
  nonRefundable?: boolean;
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    country: string;
    zipCode?: string;
    fullAddress?: string;
  };
  images: string[];
  deals?: [];
  roomsQuantity: number;
  price: number;
}