import React from "react";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function App() {
  return (
    <div>
      temp
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
