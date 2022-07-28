import Image from "next/image";
import BgFooter from "/public/bg-footer.svg"

export default function Footer() {
    return (<footer className=" w-full">
            <div className="">
                <Image priority={true} className="w-full" layout="responsive" src={BgFooter}/>
            </div>
    </footer>
    )
}