import {appSlice, User} from "../../redux";
import {useState} from "react";
import NavItem from "./NavItem";
import {useDispatch} from "react-redux";
import userPhoto from "../../public/user-photo.png"
import Image from "next/image";

export default function NavItemUserProfile({user}: { user: User }) {
    const [showOptions, setShowOptions] = useState(false)
    const dispatch = useDispatch()

    const handleOnClick = () => {
        setShowOptions(!showOptions)
    }
    const UserOptions = () => {
        return <div className="absolute z-[1500] bg-white rounded-b-2xl border border-black flex flex-col ">
            <NavItem title="Inicio" href="/private/home"/>
            <NavItem title="Cerrar sesión" onClick={() => {
                dispatch(appSlice.actions.userChanged(null))
            }}></NavItem>
        </div>
    }
    return <><div className="relative">
        <div className=" hover:cursor-pointer rounded-2xl border border-black flex flex-col">
            <div className=" p-1 flex justify-center  items-center whitespace-nowrap" onClick={handleOnClick}>
                <span className=" flex justify-center items-center flex-nowrap">
                    <Image src={userPhoto} width={40} height={40} className="rounded-xl"></Image>
                </span>
                <span className="ml-2 "><p className="m-0">{`Hola! ${user.name} :)`}</p></span>

            </div>

        </div>
        {showOptions ? <UserOptions/> :<></>}
    </div>


    </>
}