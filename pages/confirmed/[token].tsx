import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import {GetServerSideProps} from "next";
import {confirmToken} from "../../services/auth";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

interface ResultServerProps {
    "msg": string
    "error"?: boolean
}

export default function Token({ data } : {data : ResultServerProps}) {
    const [tokenState, setTokenState] = useState('pure')

    useEffect(() => {
        console.log(data.error)
        const currentTokenState = data.error ? 'failure' : 'success'
        setTokenState(currentTokenState)
    }, [setTokenState, data])

    const TokenSuccess = () => {
        const router = useRouter()

        useEffect(() => {
            const redirectToLogin = async () => {
                setTimeout(() => {
                    router.push('/login')
                }, 5000)
            }
            redirectToLogin()
        }, [router])

        return (<div>
            <h5 className="text-3xl p-5 text-center ">Genial! La confirmación del email se realizo exitosamente! :)</h5>
            <p className="text-xl p-2 text-center">En unos segundos se te redireccionará a la pagina de inicio de sesión
                para que comiences a usar tu cuenta.</p>
        </div>)

    }
    const TokenFailure = () => {
        return (<div className="flex flex-col">
            <h5 className="text-3xl p-5 text-center ">Ups... ocurrió un error :(</h5>
            <p className="text-xl p-2 text-center">No se encontró la página que buscás.</p>
            <Link href={'/login'}><span
                className="text-sky-600 underline hover:cursor-pointer">Ir a la página de inicio</span></Link>
        </div>)
    }

    return (<div className="h-screen flex flex-col items-center">
        <Nav/>
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            {tokenState === 'pure' ? <span>Aguarde un momento...</span> : (tokenState === 'success' ? <TokenSuccess/> : <TokenFailure/>)}
        </main>
        <Footer/>
    </div>)
}

export const getServerSideProps = async ({params}) => {
    //
    const { data } = await confirmToken(params.token)

    return {
        props: { data }
    }
}