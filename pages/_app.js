import '../styles/globals.css'
import {Provider} from "react-redux";
import {appStore, persistor} from "../redux";
import {PersistGate} from "redux-persist/integration/react";

function MyApp({Component, pageProps}) {

    return <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
        </PersistGate>
    </Provider>
}

export default MyApp
