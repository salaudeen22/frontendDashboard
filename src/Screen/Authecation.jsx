import React, { useState } from "react";
import SignIn from "../Component/SignIn";
import Signup from "../Component/Signup";

function Authentication() {
  const [login, setLogin] = useState(false);
  return (
    <div className="AuthContent">
      <div className="left"></div>
      <div className="right">
        {!login ? (
          <>
         <SignIn/>
            Don't have an Account? 
                 <span
              onClick={() => {
                setLogin(true);
              }}
            >
              Sign up
            </span>
          </>
        ) : (
          <>
          <Signup/>
            Already have an Account!
            <span
              onClick={() => {
                setLogin(false);
              }}
            >
              Sign in
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default Authentication;
