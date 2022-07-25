import Image, {StaticImageData} from "next/image";

export default function CoreFeatureItem({iconSrc, description } : {iconSrc:StaticImageData, description: string}) {
    return <div className="p-2 flex items-center justify-center">
        <div className="flex-1">
            <Image src={iconSrc}></Image>
        </div>

        <p className="m-3 flex-[3]">{description}</p>
    </div>
}