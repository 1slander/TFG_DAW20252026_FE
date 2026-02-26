import { FormFieldInterface } from '../interfaces/form-field';

export const OWNER_REGISTER_FORM: FormFieldInterface[] = [

  // USERS
  { name: 'first-name', label: 'Nombre', type: 'text', required: true },
  { name: 'last-name', label: 'Apellidos', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },

  // RESTAURANT
  { name: 'restaurant-name', label: 'Nombre del restaurante', type: 'text', required: true },
  { name: 'address', label: 'Dirección', type: 'text' },
  { name: 'phone', label: 'Teléfono', type: 'text' },
  { name: 'capacity', label: 'Capacidad', type: 'number' }
];
