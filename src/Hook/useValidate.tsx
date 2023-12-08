import { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    phoneno: string;
}

interface ValidationErrors {
    name?: string;
    email?: string;
    phoneno?: string;
}

const useValidate = (): [(formData: FormData) => Promise<FormData>, FormData | undefined, ValidationErrors] => {
    const [validData, setValidData] = useState<FormData | undefined>();
    const [validateError, setValidateError] = useState<ValidationErrors>({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const validateData = (formData: FormData): Promise<FormData> => {
        return new Promise((resolve, reject) => {
            const newErrors: ValidationErrors = {};

            if (!formData.name.trim() || typeof formData.name !== 'string')
                newErrors.name = 'Name is required and must be a string';


            if (!emailRegex.test(formData.email))
                newErrors.email = 'Enter a valid email address';


            if (!phoneRegex.test(formData.phoneno))
                newErrors.phoneno = 'Enter a valid phone number';


            setValidateError(newErrors);
            if (Object.keys(newErrors).length > 0) reject(newErrors);
            else {
                setValidData(formData);
                resolve(formData);
            }
        });
    };

    return [validateData, validData, validateError];
};

export default useValidate;
