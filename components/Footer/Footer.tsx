import Image from "next/image";
import BgFooter from "/public/bg-footer.svg"

export default function Footer() {
    return (<footer className="w-full h-[80px]">
            <div className="">
                <Image className="w-full" layout="responsive" src={BgFooter}/>
            </div>

    </footer>
    )
}