import { FormFieldInterface } from '../interfaces/form-field';

export const LOGIN_FORM:FormFieldInterface[]=[
    {name:'email',label:'Email',type:'email',required:true},
    {name:'password',label:'Password',type:'password',required:true}
];