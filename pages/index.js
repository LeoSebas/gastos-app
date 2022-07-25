import Head from 'next/head'

import Image from "next/image";
import MainDescription from "../components/MainDescription";

export default function Home() {
    return (
        <div className="h-screen flex flex-col items-center">
            <Head>
                <title>Ahorrar Más App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="container h-full p-4 flex flex-1 flex-col items-center">
                <MainDescription />
                <p>Hola</p>
            </main>
        </div>
    )
}
