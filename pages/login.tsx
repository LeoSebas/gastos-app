import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {Field, Form, Formik} from "formik";
import InputBox from "../components/InputBox";
import ActionButton from "../components/ActionButton";
import {loginUser} from "../services/auth";
import {useDispatch} from "react-redux";
import {appSlice} from "../redux";
import * as Yup from 'yup'
import {useState} from "react";

interface Credentials {
    email: string,
    password: string
}

export default function Login() {
    /// Dispach para actualizar el user
    const dispatch = useDispatch()


    const signIn = async (credentials: Credentials) => {
        const response = await loginUser(credentials)
        console.log(response)
    }

    const LoginForm = () => {
        const loginSchema = Yup.object().shape({
            email: Yup.string().email('¿Está bien escrito el correo?').required('Este campo es obligatorio'),
            password: Yup.string().min(8, 'La contraseña es muy corta').max(100, 'Creo que ya es muy larga, no?').required('Este campo es obligatorio'),
        })

        ///Toggle para showpassword
        const [showPassword, setShowPassword] = useState(false)
        const toggleShowPassword = () => {
            setShowPassword(!showPassword);
        }

        return <>
            <h5 className="text-3xl p-5">Iniciar sesión</h5>
            <Formik initialValues={{"email": '', "password": ''}}
                    onSubmit={ async (values: Credentials) => {
                        const response = await loginUser(values)
                        dispatch(appSlice.actions.userChanged(response.data))
                    }}
                    validationSchema={loginSchema}
            >
                {({isSubmitting, touched, errors,values, handleChange}) => (
                    <Form className="flex flex-col w-10/12 sm:w-10/12 md:w-8/12 lg:w-4/12">
                        <InputBox>
                            <label htmlFor="emailInput">Email</label>
                            <Field className="text-xl p-3 bg-blue-200 rounded-lg" required placeholder="Ingrese su email"
                                   id="emailInput" name="email" type="email" value={values.email} onChange={handleChange}/>
                            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                        </InputBox>
                        <InputBox>
                            <label htmlFor="passInput">Contraseña</label>
                            <Field className="text-xl p-3 bg-blue-200 rounded-lg" required placeholder="Ingrese su email"
                                   id="passInput" name="password" type={showPassword ? 'text' : 'password'} value={values.password} onChange={handleChange}/>
                            <span onClick={toggleShowPassword} className="absolute self-end mt-6 p-[14px] hover:cursor-pointer">{showPassword ? 'Ocultar' : 'Ver'}</span>
                            {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                        </InputBox>
                        <ActionButton type="submit" disabled={isSubmitting}>
                            <span >Ingresar</span>
                        </ActionButton>
                    </Form>
                )}
            </Formik>
        </>
    }

    return <div className="h-screen flex flex-col items-center">
        <Nav/>
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            {<LoginForm/>}
        </main>
        <Footer/>
    </div>
}