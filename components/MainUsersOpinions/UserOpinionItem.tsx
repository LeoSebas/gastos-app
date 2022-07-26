import starIcon from "/public/icon-star.png"
import Image from "next/image";

export default function UserOpinionItem({
                                            userName,
                                            stars,
                                            comment
                                        }: { userName: string, stars: number, comment: string }) {
    const StarsRow = ({stars}: { stars: number }) => {


        return <div className="flex p-1">
            <>
                <div className="p-1">
                    <Image  src={starIcon}/>
                </div>
                <div className="p-1">
                    <Image src={starIcon}/>
                </div>
                <div className="p-1">
                    <Image  src={starIcon}/>
                </div>
                <div className="p-1">
                    <Image src={starIcon}/>
                </div>
                <div className="p-1">
                    <Image src={starIcon}/>
                </div>
            </>
        </div>
    }

    return <div className="p-3 flex-1">
        <div className="rounded-xl bg-cyan-100 p-2 flex flex-col">
            <h3 className="font-fedora font-bold p-1">{userName}</h3>
            <StarsRow stars={stars}/>
            <p className="p-1">{comment}</p>
        </div>

    </div>
}