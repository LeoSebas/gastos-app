import {Field} from "formik";
import {ChangeEvent} from "react";

export default function CustomField({
                                        className,
                                        required,
                                        placeholder,
                                        id,
                                        name,
                                        type,
                                        value,
                                        onChange,
                                        children,
                                        component,
                                        valueAsNumber,
                                    }: { className?: string, required?: boolean, placeholder?: string, id: string, name?: string, type?: string, value?: string | number | Date,
    onChange?: { (e: ChangeEvent<any>): void, <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : ((e: (string | ChangeEvent<any>)) => void) } , children?: any , component?: any, valueAsNumber?:number| Date}) {
    return <Field className={`text-xl p-3 bg-blue-200 rounded-lg ${className}`} required={required}
                  placeholder={placeholder} id={id} name={name} type={type} value={value} onChange={onChange} component={component} valueAsNumber={valueAsNumber}>
        {children}
    </Field>
}