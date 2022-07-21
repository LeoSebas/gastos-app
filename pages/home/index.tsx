import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function Home() {
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