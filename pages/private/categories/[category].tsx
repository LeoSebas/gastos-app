
import {useSelector} from "react-redux";
import {AppState} from "../../../redux";

export default function Category({ categoryName }) {
    const {categories} = useSelector((state : AppState) => state)

    const category = categories.find((element) => element.name === categoryName)

    return <div className="flex flex-col items-center">
        <main className="container p-4 flex flex-1 flex-col items-center justify-center">
            <section className="w-full">
                <p>Pagina de categoria { category.name }</p>

            </section>
        </main>
    </div>
}

export const getServerSideProps =  ({params}) => {
    return {
        props: { categoryName : params.category }
    }
}
