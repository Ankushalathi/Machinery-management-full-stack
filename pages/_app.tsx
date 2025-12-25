import { Provider } from "react-redux";
import { store } from "../redux/store";  // Redux store import karo
import Layout from "../pages/components/SideNavLayout/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>   {/* Redux Provider Wrap Karo */}
      <Layout>
       <div className="-z-50">
       <Component {...pageProps} />
       </div>
      </Layout>
    </Provider>
  );
}
