import { useEffect } from "react";
import axios from "axios";

const baseUri = process.env.REACT_APP_BASE_URI;

function LandingPage() {
  useEffect(() => {
    axios.get(`${baseUri}/hello`).then((res) => console.log(res.data));
  }, []);

  return <div>LandingPage</div>;
}

export default LandingPage;
