import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";

export default function Auth(
  SpecificComponent,
  option,
  // adminRoute = null
) {
  /* option 
    null 0 => 아무나 출입 가능
    true 1 => 로그인 유저만 출입 가능
    false 2 => 로그인 유저는 출입 불가능
*/
  console.log("option=======>", option);

  const dispatch = useDispatch();

  useEffect(() => {
    
    if(option !== 0) {
      dispatch(auth()).then((res) => console.log("res.payload.isAuth ====> ",res.payload.isAuth))
    }
  },[])


  return SpecificComponent;
}
