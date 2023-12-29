import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Auth from "../../../hoc/Auth"

const baseUri = process.env.REACT_APP_BASE_URI;

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUri}/hello`).then((res) => console.log(res.data));
  }, []);

  const onLoginHandler = () => {
    return navigate("/login");
  };

  const onLogoutHandler = () => {
    axios.get(`${baseUri}/logout`).then((res) => console.log(res.data));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>LandingPage</h2>
      <button onClick={onLoginHandler}>Login</button>
      <button onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default LandingPage;
