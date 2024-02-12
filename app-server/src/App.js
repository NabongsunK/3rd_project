import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/store";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
