import CustomHead from "../components/CustomHead";

export default function About() {
    return (<div className="h-screen flex flex-col items-center">
        <CustomHead title={"Ahorrar + -  Acerca de nosotros"} />
        <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
            <section>
                <p>Somos un grupo de desarrolladores que participamos del Bootcamp ReactJs proporcionado por la empresa Devligths</p>
            </section>


        </main>
    </div>)
}