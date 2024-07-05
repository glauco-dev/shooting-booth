import React from "react";
import { Box, Button, Img, Input } from "@chakra-ui/react";
import {validatePassword as vpwdFB,
  } from "firebase/auth";
import { HiMiniUserCircle } from "react-icons/hi2";
import db from './Manager';

export const SignupForm = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState(null);
    const photoUpRef = React.useRef(null);
    const validateEmail = (event) =>
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
        ? setEmail(event.target.value)
        : alert("You have entered an invalid email address!");
    const validatePassword = async (event) =>
      event.target.value.length >= 6
        ? (await vpwdFB(getAuth(), event.target.value)).isValid
          ? setPassword(event.target.value)
          : alert("Sua senha não é válida no sistema")
        : alert("Sua senha deve ter pelo menos 6 caracteres");
  
    const FileUploader = () => (
      <Box className="profileImage" >
        {image ? <Img src={{ image }} alt="" onClick={() => photoUpRef.current.click()} /> : <HiMiniUserCircle onClick={() => photoUpRef.current.click()}/>}
        <Input
          ref={photoUpRef}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          capture
          name="image"
          placeholder="image"
        />
      </Box>
    );
  
    return (
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        <Input type="text" required value={name} name="name" placeholder="name" />
  
        <FileUploader />
        <Input
          type="email"
          onBlur={validateEmail}
          value={email}
          name="email"
          placeholder="email"
        />
        <Input
          type="password"
          onBlur={validatePassword}
          value={password}
          name="password"
          placeholder="password"
        />
        <Input type="submit" value="Signup" />
      </Box>
    );
  };
  
export const LoginForm = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    db.readLocalProperty("email").then((email) => setEmail(email))
    db.readLocalProperty("password").then((password) => setPassword(password))

    return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Input
        type="email"
        value={email}
        onChange={() => db.set("email", email)}
        name="email"
        placeholder="Email"
        />
        <Input
        type="password"
        value={password}
        onChange={() => db.set("password", password)}
        name="password"
        placeholder="Senha"
        />
        <Button value="Login" />
    </Box>
    );
};