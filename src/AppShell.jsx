import React from "react";
import manager from './Manager';
import "./AppShell.sass";
import { LoginForm, SignupForm } from "./LoginSignUpForms";
import { ChakraProvider } from '@chakra-ui/react'
import App from './AppIndex'

export default () => {
  const [user, changeUser] = React.useState('');
  manager.subscribe("user", changeUser);
  const [whichForm, setWhichForm] = React.useState(true);
  manager.subscribe("loginForm", setWhichForm);

  console.log(JSON.stringify(user));
  
  return <ChakraProvider>
    {
      !user ? 
      whichForm ? <LoginForm /> 
      : <SignupForm />
      : <App/>
    }
  </ChakraProvider>
};
