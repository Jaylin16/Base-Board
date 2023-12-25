import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { redirect } from "react-router-dom";

export default function AuthenticationCheck(
  SpecificComponent,
  option,
  adminRoute = null
) {
  /* option 
    null => 아무나 출입 가능
    true => 로그인 유저만 출입 가능
    false => 로그인 유저는 출입 불가능
*/
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth()).then((res) => {
      console.log(res);

      if (!res.payload.isAuth) {
        if (option) {
          return redirect("/login");
        } else {
          return redirect("/");
        }
      } else {
        if (!option) {
          return redirect("/");
        }
      }
    });
  }, [dispatch, option]);

  return SpecificComponent;
}
