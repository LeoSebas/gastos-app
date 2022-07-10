import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Login() {
    return(<div className="h-screen flex flex-col items-center">
        <Nav />
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            <p>Login...</p>
        </main>
        <Footer />
    </div>)
}