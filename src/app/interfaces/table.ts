export interface TableResponseInterface {
  idTable: number;
  tableNumber: number;
  tableCapacity: number;
  status: string;
  idRestaurant: number;
  restaurantName: string;

  posX?: number;
  posY?: number;
}

export interface TableCreateInterface {
  tableNumber: number;
  tableCapacity: number;
}
