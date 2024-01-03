import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    axios.get(`${baseUri}/logout`).then((res) => alert(res.data.message));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        flexDirection: "column"
      }}
    >
      <h2>LandingPage</h2>
      <button style={{width: "15%"}} onClick={onLoginHandler}>Login</button>
      <br />
      <button style={{width: "15%"}} onClick={onLogoutHandler}>Logout</button>
    </div>
  );
}

export default LandingPage;
