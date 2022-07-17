import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import {GetServerSideProps} from "next";
import {confirmToken} from "../../services/auth";

interface ResultServerProps {
    "msg": string
    "error": boolean
}

export default function Token( result : ResultServerProps) {
    return(<div className="h-screen flex flex-col items-center">
        <Nav />
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            <p>confirmar token {JSON.stringify(result)}</p>
        </main>
        <Footer />
    </div>)
}

export const getServerSideProps = async ({params}) => {
    //
   const result = await confirmToken(params.token)

    return {
        props: { result }
    }
}