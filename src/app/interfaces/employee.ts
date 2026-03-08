import { RestaurantInterface } from './restaurant';
import { RoleInterface } from './role';
import { ShiftInterface } from './shift';
import { UserInterface } from './user';

export interface EmployeeInterface extends UserInterface {
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  hourlyWage: number;
  role: RoleInterface;
  restaurant?: RestaurantInterface;
  shift?: ShiftInterface;
}

export interface EmployeeCreateInterface extends UserInterface {
  dni: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: RoleInterface;
  hourlyWage: number;
}
