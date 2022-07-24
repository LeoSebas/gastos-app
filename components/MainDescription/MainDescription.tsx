import Image from "next/image";
import bgMainDescr from "/public/bg-main-description.svg"
import imgMainDescr from "/public/img-main-description.svg"

export default function MainDescription() {
    return <>
        <section className="h-[300px] w-full sm:h-[350px] md:h-[450px] lg:h-[600px] xl:h-[800px] 2xl:h-[800px]">
            <div className="relative flex items-center h-full w-full overflow-hidden ">
                <div className="absolute w-full">
                    <div className="z-0 w-8/12">
                        <Image src={bgMainDescr}/>
                    </div>
                </div>
                <div className="absolute w-full flex justify-end">
                    <div className="w-6/12 flex justify-end">
                        <Image src={imgMainDescr}/>
                    </div>
                </div>
                <div className="absolute z-10 w-6/12 ml-5 flex flex-col h-full justify-evenly lg:ml-8 xl:ml-10 2xl:ml-16">
                    <p className="text-sm">
                        <span className="font-bold">Ahorrar +</span> la mejor app para que gestiones tus consumos y
                        gastos personales.
                    </p>
                    <ul className="list-disc text-sm" >
                        <li>
                            <span>Agregar gastos.</span>
                        </li>
                        <li>
                            <span>Separarlos por categorias.</span>
                        </li>
                        <li>
                            <span>Visualizar consumos históricos.</span>
                        </li>
                    </ul>
                </div>
            </div>

        </section>

    </>
}