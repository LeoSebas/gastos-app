import '../styles/globals.css'
import {Provider} from "react-redux";
import {appStore} from "../redux";

function MyApp({ Component, pageProps }) {
  return <Provider store={appStore}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
