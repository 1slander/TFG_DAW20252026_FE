import { RestaurantInterface } from "./restaurant";
import { RoleInterface } from "./role";
import { ShiftInterface } from "./shift";
import { UserInterface } from "./user";

export interface EmployeeInterface extends UserInterface{
 dni:string;
 hourlyWage:number;
 hireDate:string;
 role:RoleInterface;
 restaurant?:RestaurantInterface;
 shift?:ShiftInterface
}