import CoreFeatureItem from "./CoreFeatureItem";
import iconAhorro from "/public/icon-ahorro-alcancia.png"
import iconNotif from "/public/icon-notif.png"
import iconStadistic from "/public/icon-stadistic.png"

export default function MainCoreFeatures() {

    return <section className="flex flex-col w-full items-center p-10">
        <h2 className="text-3xl p-5">Nuestro único interés es que puedas ahorrar</h2>
        <div className="flex flex-col justify-around md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
            <CoreFeatureItem iconSrc={iconAhorro} description="Ahorrá controlando tus gastos e ingresos." />
            <CoreFeatureItem iconSrc={iconNotif} description="Alertas para que estés al tanto de tus gastos." />
            <CoreFeatureItem iconSrc={iconStadistic} description="Mas de medio millon de usuarios activos." />
        </div>
    </section>
}