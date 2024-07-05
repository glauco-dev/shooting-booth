import React from "react";
import manager from './Manager';
import "./AppShell.sass";
import { LoginForm, SignupForm } from "./LoginSignUpForms";


export default () => {
  const [user, changeUser] = React.useState();
  manager.subscribe("user", changeUser);
  const [whichForm, setWhichForm] = React.useState(true);
  manager.subscribe("loginForm", setWhichForm);
  return <>
    {
      !user ? 
      whichForm ? <LoginForm /> 
      : <SignupForm />
      : <App/>
    }
  </>
};
