import ListExpenses from "../../components/ListExpenses";
import SearchBar from "../../components/SearchBar";
import PrivateLayout from "../../layouts/PrivateLayout/PrivateLayout";


export default function Search (){



    return (
        <PrivateLayout>
            <SearchBar/>
            <ListExpenses/>
        </PrivateLayout>
    )
}