import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header";
import OfferPage from "./pages/OfferPage/OfferPage";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faXmark);
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Cookies from "js-cookie";

function App() {
  const [visible, setVisible] = useState({ visible: false, page: "" });
  const [token, setToken] = useState(Cookies.get("token") || "");

  const handleModals = () => {
    if (visible.visible && visible.page === "signup") {
      return (
        <SignupPage
          visible={visible}
          setVisible={setVisible}
          setToken={setToken}
        />
      );
    } else if (visible.visible && visible.page === "login") {
      return (
        <LoginPage
          visible={visible}
          setVisible={setVisible}
          setToken={setToken}
        />
      );
    } else {
      return "";
    }
  };

  return (
    <Router>
      <Header
        visible={visible}
        setVisible={setVisible}
        token={token}
        setToken={setToken}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer/:id" element={<OfferPage />} />
      </Routes>
      {handleModals()}
    </Router>
  );
}

export default App;
