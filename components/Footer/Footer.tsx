import Image from "next/image";
import BgFooter from "/public/bg-footer.svg"

export default function Footer() {
    return (<footer className="w-full bottom-0 mt-auto">
            <div className="relative h-full">
                <div className="w-full absolute z-10 h-full flex flex-col justify-evenly">
                    <div className="flex justify-center items-center">
                        <p>
                            <span>Términos y Condiciones </span>|
                            <span> Privacidad </span>|
                            <span> Ver FAQs</span>
                        </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <p className="text-gray-600 ">@2022 Devligths Bootcamp - G1</p>
                    </div>
                </div>
                <Image priority={true} className="w-full" layout="responsive" src={BgFooter}/>
            </div>
    </footer>
    )
}