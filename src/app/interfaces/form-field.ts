export type FieldType = 'text' | 'email' | 'password' | 'number' | 'select';

export interface FormField{
    name: string;
    label: string;
    type: FieldType;
    required?: boolean;
    roles?: string[];
    options?: {
        value: any;
        label: string;
    }[];
}