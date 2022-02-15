import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = ( props ) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="container" >
        <div className="row justify-content-center">
            <button
                onClick={handleModals}
                id="register"
                className={signUpModal ? "btn btn-success" : null}
            >
                S'inscrire
            </button>
            <button
                onClick={handleModals}
                id="login"
                className={signInModal ? "btn btn-success" : null}
            >
                Se connecter
            </button>
        </div> 
        <div className="row justify-content-center">
            {signUpModal && <SignUpForm />}
            
        </div> 
        <div className="row justify-content-center">
            {signInModal && <SignInForm />}
        </div>                    
    </div>
  );
};

export default Log;