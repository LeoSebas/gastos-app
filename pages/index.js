import Head from 'next/head'
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="h-screen flex flex-col items-center">
            <Head>
                <title>Ahorrar Más App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Nav/>
            <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">

                <h1 className="m-0 text-7xl">
                    Bienvenido a <span className="font-bold">Ahorrar +</span> !!!
                </h1>

                <section className="my-16 text-3xl">
                    <p>
                        Una app perfecta para que gestiones tus consumos y gastos personales.
                    </p>
                    <p>
                        Agregá gastos, separálos por categorias y analizá tus consumos históricos por semanas, meses,
                        incluso años! :)
                    </p>
                </section>

            </main>

            <Footer/>
        </div>
    )
}
