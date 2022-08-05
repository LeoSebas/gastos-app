import CustomHead from "../components/CustomHead";

export default function About() {
    return (<div className="h-screen flex flex-col items-center">
        <CustomHead title={"Ahorrar + -  Acerca de nosotros"} />
        <main className="container h-full p-4 flex flex-1 flex-col items-center w-full">
            <section className="p-5 w-full">
                <h1 className="p-3 text-2xl">Grupo 1 - ReactJs</h1>
                <p className="p-3 font-normal xl:text-lg">Somos un grupo de desarrolladores que participamos del Bootcamp ReactJs proporcionado por la empresa Devligths</p>
            </section>
            <section className="p-5 w-full">
                <h1 className="p-3 text-xl">Funcionalidades Actuales:</h1>
                <ul className="list-disc p-8">
                    <li className="font-normal xl:text-lg">Gestión de gastos</li>
                    <li className="font-normal xl:text-lg">Clasificacion por categorias para los gastos, categorias personalizadas</li>
                    <li className="font-normal xl:text-lg">Agregar un límite de gasto mensual total y por categoria</li>
                    <li className="font-normal xl:text-lg">Graficos historicos totales y mensuales</li>
                </ul>

                <h1 className="p-3 text-xl">Funcionalidades Futuras:</h1>
                <ul className="list-disc p-8">
                    <li className="font-normal xl:text-lg">Selección y cambio de divisas</li>
                    <li className="font-normal xl:text-lg">Tema Claro/oscuro</li>
                    <li className="font-normal xl:text-lg">Gestión de ingresos mensuales</li>
                    <li className="font-normal xl:text-lg">Restabilidad en inversiones
                        <ul className="list-decimal p-3">
                            <li>Subcategorias en base a instrumentos comunes (plazo fijo, fondos comunes de inversion, CEDEARS, etc</li>
                        </ul>
                    </li>
                </ul>


            </section>

        </main>
    </div>)
}