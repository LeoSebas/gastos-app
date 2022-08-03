import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../../redux"
import { getProfile } from "../../../services/user"
import style from "./profile.module.css"

export interface Profile {
    "name":string,
    "lastName":string,
    "createdAt": Date,
    "email":string,
    "_id": string
}




export default function Profile (){ 
    const token = useSelector((state: AppState) => state.user.token)
    const [error, setError] = useState("")
    const [profile, setProfile] = useState<Profile>()
    const formattedDate = new Date(profile?.createdAt).toLocaleDateString()
    const fetchProfile = async (token:string):Promise<any> => { 
        const response = await getProfile(token)
        if(!response) {
            setError("Ha ocurrido un error") //Si no hay ninguna respuesta, algo fallo horriblemente
        } else if (response.data.error){
            setError(response.data.msg)
        } else {
            setError("")
            setProfile(response.data)
        }
    }
    useEffect(() => {
      fetchProfile(token)
    }, [])
    return (
        <div className={style.Profile}>
            <p>Nombre: {profile?.name}</p>
            <p>Apellido: {profile?.lastName}</p>
            <p>e-mail: {profile?.email}</p>
            <p>Fecha de creación: {formattedDate}</p>
        </div>
    )
}