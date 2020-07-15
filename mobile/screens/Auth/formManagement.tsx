import { useCallback } from "react";
import * as yup from "yup";

interface FormFields {
    first?: string;
    last?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

function submitForm(formFields: FormFields) {
    console.log(formFields);
}

export default function useFormManagement() {
    const handleSubmit = useCallback((formFields: FormFields) => {
        return submitForm(formFields);
    }, []);

    const initialValues: FormFields = {
        first: "",
        last: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = yup.object().shape({
        first: yup
            .string()
            .required()
            .min(2, "That's a short name")
            .max(14, "That's a long name"),
        last: yup
            .string()
            .required()
            .min(2, "That's a short name")
            .max(14, "That's a long name"),
        email: yup.string().label("email").email().required(),
        password: yup.string().required().min(6, "That's not secure"),
        confirmPassword: yup
            .string()
            .required()
            .test("passwords match", "passwords must match", function (value) {
                return this.parent.password === value;
            }),
    });

    return { handleSubmit, initialValues, validationSchema };
}
