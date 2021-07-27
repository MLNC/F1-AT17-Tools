import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./aws-exports";
import {
  AmplifySignIn,
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifyForgotPassword,
} from "@aws-amplify/ui-react";

Amplify.configure(config);
ReactDOM.render(
  <React.StrictMode>
    <AmplifyAuthenticator>
      <App />
      <AmplifySignOut />

      <AmplifySignIn slot="sign-in" hideSignUp headerText="F1 牛逼" />
      <AmplifyForgotPassword
        headerText="忘记密码请联系Orca，这页没做"
        slot="forgot-password"
        handleSend={() => {
          console.log("no");
        }}
        handleSubmit={() => {
          console.log("no");
        }}
      ></AmplifyForgotPassword>
    </AmplifyAuthenticator>
  </React.StrictMode>,
  document.getElementById("root")
);
