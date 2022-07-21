import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux";
import {useRouter} from "next/router";

export default function Home() {
    /// Selector para consultar el user
    const currentUser = useSelector((state: AppState) => state.user)
    const router = useRouter()
    /// Dispach para actualizar el user
    const dispatch = useDispatch()

    if (!currentUser) {
        router.push('/login')
        return <></>
    }
    return (<div className="h-screen flex flex-col items-center">
        <Nav/>
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            <section>
                <p>Pagina de inicio</p>
            </section>
        </main>
        <Footer/>
    </div>)
}