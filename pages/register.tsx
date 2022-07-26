import {Field, Form, Formik, FormikHelpers} from "formik";
import InputBox from "../components/InputBox";
import {register} from "../services/auth";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import ActionButton from "../components/ActionButton";
import * as Yup from 'yup'
import {useSelector} from "react-redux";
import {AppState} from "../redux";
import CustomHead from "../components/CustomHead";

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
    interface RegisterState {
        msg: string,
        error: boolean
    }

    interface InputValues {
        "name": string,
        "lastName": string,
        "password": string,
        "repeatPassword": string,
        "email": string
    }

    /* State que controla el flujo de registro */
    const [registerState, setRegisterState]: [RegisterState, Dispatch<SetStateAction<RegisterState>>] = useState()

    /// Selector para consultar el user
    const currentUser = useSelector((state: AppState) => state.user)

    /// Effect y  router de redireccion si el usuario ya está logueado
    const router = useRouter()

    if (currentUser) {
        router.push('/home')
        return <></>
    }

    /// Componente para registro exitoso
    const RegistrationSuccess = () => {
            const router = useRouter()

            useEffect(() => {
                const redirectToLogin = async () => {
                    setTimeout(() => {
                        router.push('/')
                    }, 5000)
                }
                redirectToLogin()
            }, [router])

            return (<div>
                <h5 className="text-3xl p-5 text-center ">Genial! el registro fue un exito :)</h5>
                <p className="text-xl p-2 text-center">Se envió un email de confirmacion a tu correo electrónico, chequeá tu
                    inbox y segui los pasos ;)</p>
                <p className="text-xl p-2 text-center">Redireccionando a la página de inicio...</p>
            </div>)
    }

    /// Componente para registro fallido
    /// - Opción de reintentar registrarse con otro email.
    /// - Link a Login si ya tenía cuenta.
    const RegistrationFailure = () => {
        return (<div className="flex flex-col">
            <h5 className="text-3xl p-5 text-center ">Ups... ocurrió un error :(</h5>
            <p className="text-xl p-2 text-center">El Email ingresado ya está vinculado a una cuenta.</p>
            <p className="p-2">Utilizá otro email para crear una cuenta o <Link href={'/login'}><span
                className="text-sky-600 underline hover:cursor-pointer">iniciá sesión</span></Link> con tus
                credenciales.</p>
            <button className="rounded border border-black p-3 mt-2" onClick={() => {
                setRegisterState(undefined)
            }}> Intentar de nuevo con otro email
            </button>
        </div>)
    }

    /// Fetch al backend.
    const handleRegister = async (user: User) => {
        const response = await register(user)
        const serverResponseState: RegisterState = response.data
        setRegisterState(serverResponseState)
    }

    /// Componente Formulario para el registro con Formik.
    const RegisterForm = (initialValues: InputValues) => {

        const registerSchema = Yup.object().shape({
            name: Yup.string().min(2, 'Muy corto!').max(50, 'Muy largo!').required('Este campo es obligatorio')
                .matches(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+))(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+))?$/, 'Sin números'),
            lastName: Yup.string().min(2, 'Muy corto!').max(50, 'Muy largo!').required('Este campo es obligatorio')
                .matches(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+))(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+))?$/, 'Sin números'),
            password: Yup.string().min(8, 'La contraseña es muy corta').max(100, 'Creo que ya es muy larga, no?').required('Este campo es obligatorio'),
            repeatPassword: Yup.string().ensure().test('password-match', 'Las contraseñas deben coincidir', function (repeatPassword) {
                return this.parent.password === repeatPassword
            }),
            email: Yup.string().email('¿El email esta bien escrito?')
        })

        return (<>
            <h5 className="text-3xl p-5">Registrarse es fácil! Completá tus datos y estas dentro :) </h5>
            <Formik
                initialValues={initialValues}
                onSubmit={(values: Inputs, {setSubmitting}: FormikHelpers<Inputs>) => {
                    handleRegister({
                        'name': values.name,
                        "lastName": values.lastName,
                        "password": values.password,
                        "email": values.email
                    })
                }}
                validationSchema={registerSchema}
            >{({isSubmitting, errors, touched}) => (
                <Form className="flex flex-col w-10/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
                    <div className="flex flex-col md:flex-row lg:flex-row ">
                        <InputBox className="md:w-6/12 lg:w-6/12">
                            <label htmlFor="name">Nombre/s:</label>
                            <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="name" name="name"
                                   placeholder="Ingrese su nombre. Ej: John, María"
                                   type="name"/>
                            {errors.name && touched.name &&
                                <div className="float-left text-red-500">{errors.name}</div>}
                        </InputBox>
                        <InputBox className="md:w-6/12 lg:w-6/12">
                            <label htmlFor="lastName">Apellido/s:</label>
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
                        {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                    </InputBox>
                    <InputBox>
                        <label htmlFor="repeatPassword">Repetir contraseña:</label>
                        <Field className="text-xl p-3 bg-blue-200 rounded-lg" id="repeatPassword" name="repeatPassword"
                               placeholder="Repita la contraseña"/>
                        {errors.repeatPassword && touched.repeatPassword &&
                            <div className="text-red-500">{errors.repeatPassword}</div>}
                    </InputBox>
                    <ActionButton type="submit" disabled={isSubmitting}>
                        <span>Registrarse</span>
                    </ActionButton>
                </Form>)}
            </Formik>
        </>)
    }


    return <div className="h-screen flex flex-col items-center">
        <CustomHead title="Ahorrar + - Registrarse" />
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            {registerState
                ? (registerState.error
                        ? <RegistrationFailure/>
                        : <RegistrationSuccess/>
                )
                : <RegisterForm name='' lastName="" email="" password="" repeatPassword=""/>
            }
        </main>
    </div>
}