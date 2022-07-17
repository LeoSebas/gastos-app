import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {Field, Form, Formik, FormikHelpers} from "formik";
import InputBox from "../components/InputBox";
import {register} from "../services/auth";
import {Dispatch, SetStateAction, useState} from "react";

interface Inputs {
    "name": string
    "lastName": string
    "password": string
    "repeatPassword": string
    "email": string
}

interface User {
    "name": string,
    "lastName": string,
    "password": string,
    "email": string
}

function validateEmail(emailInput) {
    let error;
    if (!emailInput) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailInput)) {
        error = 'Invalid email address';
    }
    return error;
}


function validateNames(name: string) {
    return !name
        ? 'required'
        : ((!/(.*?)([\wáâàãçéêíóôõúüÁÂÀÃÇÉÊÍÓÔÕÚÜ]+\-?\'?\w+\.*?$)/gmi.test(name))
                ? 'Revisá el nombre'
                : undefined
        )
}


export default function Register() {


    interface ResponseServer {
        "msg": string
        "error": boolean
    }

    const [registerState, setRegisterState]: [ResponseServer, Dispatch<SetStateAction<ResponseServer>>] = useState()

    const RegistrationSuccess = () => {
        return (<div>
            <p>De una perro!</p>
        </div>)
    }
    const RegistrationFailure = () => {
        return (<div>
            <p> efe brother :(</p>
        </div>)
    }

    const handleRegister = async (user: User) => {
        const result = await register(user)
        console.log(result)
        setRegisterState(result.data)
    }

    const RegisterForm = () => {
        return (<>
            <h5 className="text-3xl p-5">Registrarse es fácil! Completá tus datos y estas dentro :) </h5>
            <Formik
                initialValues={{
                    "name": '',
                    "lastName": '',
                    "password": '',
                    "repeatPassword": '',
                    "email": ''
                }}
                onSubmit={(values: Inputs, {setSubmitting}: FormikHelpers<Inputs>) => {
                    handleRegister({
                        'name': values.name,
                        "lastName": values.lastName,
                        "password": values.password,
                        "email": values.email
                    })
                }}>{({isSubmitting, errors, touched}) => (
                <Form className="flex flex-col w-10/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                    <div className="flex flex-col md:flex-row lg:flex-row ">
                        <InputBox className="md:w-6/12 lg:w-6/12">
                            <label htmlFor="name">Nombre:</label>
                            <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="name" name="name"
                                   placeholder="Ingrese su nombre. Ej: John, María" validate={validateNames}
                                   type="name"/>
                            {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
                        </InputBox>
                        <InputBox className="md:w-6/12 lg:w-6/12">
                            <label htmlFor="lastName">Apellido:</label>
                            <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="lastName" name="lastName"
                                   placeholder="Ingrese su Apellido. Ej: Deep, Pérez"/>
                            {errors.lastName && touched.lastName &&
                                <div className="text-red-500">{errors.lastName}</div>}
                        </InputBox>
                    </div>
                    <InputBox>
                        <label htmlFor="email">Email:</label>
                        <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="email" name="email"
                               placeholder="Ingrese su email" type="email" validate={validateEmail}/>
                        {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                    </InputBox>
                    <InputBox>
                        <label htmlFor="password">Contraseña:</label>
                        <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="password" name="password"
                               placeholder="Ingrese una contraseña de 6 a 30 caracteres."/>
                    </InputBox>
                    <InputBox>
                        <label htmlFor="repeatPassword">Repetir contraseña:</label>
                        <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="repeatPassword" name="repeatPassword"
                               placeholder="Repita la contraseña"/>
                    </InputBox>
                    <button className="text-xl p-3 rounded border border-black m-3" type="submit"
                            disabled={isSubmitting}> Registrarse
                    </button>
                </Form>)}
            </Formik>
        </>)
    }

    return <div className="h-screen flex flex-col items-center">
        <Nav/>
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            {registerState ? (registerState.error ? <RegistrationFailure/> : <RegistrationSuccess/>) : <RegisterForm/>}
        </main>
        <Footer/>
    </div>
}