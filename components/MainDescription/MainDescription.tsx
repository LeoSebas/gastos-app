import Image from "next/image";
import bgMainDescr from "/public/bg-main-description.svg"
import imgMainDescr from "/public/img-she-bg.png"
import useBreakpoint from "../../hooks/useBreakpoint";

export default function MainDescription() {

    const {breakpoint} = useBreakpoint()

    const MobileMode = () => {
        return <section className="h-[650px] w-full -z-10">
            <div className="relative h-[650px] flex items-stretch h-full w-full">
                <div className="mt-[200px] absolute w-full -z-10 flex justify-end">
                    <div className="flex justify-end">
                        <Image src={imgMainDescr}/>
                    </div>
                </div>
                <div className="absolute w-full ">
                    <div
                        className="absolute z-10 w-8/12 ml-8 flex flex-col h-full justify-evenly lg:ml-8 xl:ml-10 2xl:ml-16">
                        <p className="text-xl">
                            <span className="font-bold">Ahorrar +</span> la mejor app de
                            gastos personales.
                        </p>
                        <ul className="list-disc text-md  w-full">
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
                    <div className="w-10/12">
                        <Image src={bgMainDescr}/>
                    </div>
                </div>
            </div>
        </section>
    }

    return (breakpoint === 'xs' ? <MobileMode/> :
            <section
                className="h-[300px] w-full sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[700px] 2xl:h-[800px] -z-10">
                <div
                    className="relative h-[300px] w-full sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[700px] 2xl:h-[800px] flex items-center h-full w-full overflow-hidden ">
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
                    <div
                        className="absolute z-10 w-6/12 ml-8 flex flex-col h-full justify-evenly lg:ml-8 xl:ml-10 2xl:ml-16">
                        <p className="text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl">
                            <span className="font-bold">Ahorrar +</span> la mejor app para que gestiones tus consumos y
                            gastos personales.
                        </p>
                        <ul className="m-3 list-disc text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
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
    )
}