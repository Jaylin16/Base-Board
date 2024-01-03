import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useLocation, useNavigate } from "react-router-dom";

export default function Auth(
  SpecificComponent,
  option,
  adminRoute = null
) {
  /* option 
    null 0 => 아무나 출입 가능
    true 1 => 로그인 유저만 출입 가능
    false 2 => 로그인 유저는 출입 불가능
*/
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(option !== 0) {
      dispatch(auth()).then((res) => {

      if (option === 2 && res.payload.isAuth) {
        if(location.pathname === "/"){
          return 
        } else {
          navigate("/");
        }

      } else {
        return;
      }}
      )
    }

  },[location, option])


  return SpecificComponent;
}
