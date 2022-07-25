import {useDispatch, useSelector} from "react-redux";
import {appSlice, AppState} from "../../../redux";
import {useRouter} from "next/router";
import { getCategories } from "../../../services/categories";
import { useEffect } from "react";


export default function Home() {
    /// Selector para consultar el user
    const currentUser = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch()
    const router = useRouter()
    const categories = async () => {
        const response = await getCategories(currentUser.token)
        console.log(response)
        if( !response || response?.data.error) {
            console.log(response.data.msg)
        } else {
            dispatch(appSlice.actions.setCategories(response.data.categories))
        }
    }
    
    useEffect(() => {
        categories()
      }, [])


    if (!currentUser) {
        router.push('/login')
        return <></>
    }

    return (
            <div className="flex flex-col items-center">
                <main className="container h-full p-4 flex flex-1 flex-col items-center justify-center">
                    <section>
                        <p>Pagina de inicio</p>
                    </section>
                </main>
            </div>
    )
}

