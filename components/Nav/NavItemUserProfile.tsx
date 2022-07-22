import {appSlice, User} from "../../redux";
import {useState} from "react";
import NavItem from "./NavItem";
import {useDispatch} from "react-redux";

export default function NavItemUserProfile({user}: { user: User }) {
    const [showOptions, setShowOptions] = useState(false)
    const dispatch = useDispatch()

    const handleOnClick = () => {
        setShowOptions(!showOptions)
    }
    const UserOptions = () => {
        return <div className="fixed">
            <NavItem title="Inicio" href="/home"/>
            <NavItem title="Cerrar sesión" onClick={() => {
                dispatch(appSlice.actions.userChanged(null))
            }}></NavItem>
        </div>
    }
    return <>
        <div className="hover:cursor-pointer rounded-xl border border-black">
            <div className="p-3" onClick={handleOnClick}>
                <span className="">{`Hola! ${user.name} :)`}</span>
            </div>
            {showOptions ? <UserOptions/> :<></>}
        </div>

    </>
}