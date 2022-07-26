import '../styles/globals.css'
import {Provider} from "react-redux";
import {appStore, persistor} from "../redux";
import {PersistGate} from "redux-persist/integration/react";
import PrivateLayout from "../layouts/PrivateLayout/MainLayout";
import { useSelector } from "react-redux";
import { AppState } from "../redux";

function MyApp({Component, pageProps}) {

    return (
        <Provider store={appStore}>
            <PersistGate loading={null} persistor={persistor}>
                <PrivateLayout>
                    <Component {...pageProps} />
                </PrivateLayout>
            </PersistGate>
        </Provider>
    )
}

export default MyApp
