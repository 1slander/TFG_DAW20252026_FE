export interface TableResponseInterface {
  idTable: number;
  tableNumber: number;
  tableCapacity: number;
  status: string;
  idRestaurant: number;
  restaurantName: string;
}

export interface TableCreateInterface {
  tableNumber: number;
  tableCapacity: number;
}
