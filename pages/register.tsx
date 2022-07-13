import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {Field, Form, Formik, FormikHelpers} from "formik";
import InputBox from "../components/InputBox";

interface Inputs {
    "name": string
    "lastName": string
    "password": string
    "repeatPassword": string
    "email": string
}

export default function Register() {
    return (<div className="h-screen flex flex-col items-center">
        <Nav/>
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            <h5 className="text-3xl p-5">Registrarse es fácil! Completá tus datos y estas adentro :) </h5>
            <Formik
                initialValues={{
                    "name": '',
                    "lastName": '',
                    "password": '',
                    "repeatPassword": '',
                    "email": ''
                }}
                onSubmit={(values: Inputs, {setSubmitting}: FormikHelpers<Inputs>) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}>{({isSubmitting}) => (<Form className="flex flex-col w-10/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                <div className="flex flex-col md:flex-row lg:flex-row ">
                    <InputBox className="md:w-6/12 lg:w-6/12">
                        <label htmlFor="name">Nombre:</label>
                        <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="name" name="name"
                               placeholder="Ingrese su nombre. Ej: John, María"/>
                    </InputBox>
                    <InputBox className="md:w-6/12 lg:w-6/12">
                        <label htmlFor="lastName">Apellido:</label>
                        <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="lastName" name="lastName"
                               placeholder="Ingrese su Apellido. Ej: Deep, Pérez"/>
                    </InputBox>
                </div>
                <InputBox>
                    <label htmlFor="email">Email:</label>
                    <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="email" name="email"
                           placeholder="Ingrese su email" type="email"/>
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
        </main>
        <Footer/>
    </div>)
}