import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faXmark);
import Cookies from "js-cookie";

import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header";
import OfferPage from "./pages/OfferPage/OfferPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PublishPage from "./pages/PublishPage/PublishPage";

function App() {
  const [visible, setVisible] = useState({ visible: false, page: "" });
  const [token, setToken] = useState(Cookies.get("token") || "");
  const [filters, setFilters] = useState("");

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
        setFilters={setFilters}
      />

      <Routes>
        <Route path="/" element={<HomePage filters={filters} />} />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="/publish" element={<PublishPage token={token} />} />
      </Routes>
      {handleModals()}
    </Router>
  );
}

export default App;
