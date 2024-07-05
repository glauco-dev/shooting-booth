import React from "react";
import { Box, Button, Img, Input } from "@chakra-ui/react";
import {signInWithEmailAndPassword, validatePassword as vpwdFB,
  } from "firebase/auth";
import { HiMiniUserCircle } from "react-icons/hi2";
import Manager, { auth } from './Manager';
import {useForm} from 'react-hook-form';

const isValidEmail = (emailString) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailString)
const validatePassword = (callback) => async (event) =>
  event.target.value.length >= 6
    ? (await vpwdFB(getAuth(), event.target.value)).isValid
      ? callback(event.target.value)
      : alert("Sua senha não é válida no sistema")
    : alert("Sua senha deve ter pelo menos 6 caracteres");

const validateEmailFromForm = (callback) => (value) => 
  isValidEmail(value)? 
  callback(value): 
  alert('Email inválido')

export const SignupForm = () => {
  
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [image, setImage] = React.useState(null);
    const photoUpRef = React.useRef(null);
    const validateEmail = (event) =>
        isValidEmail(event.target.value)
        ? setEmail(event.target.value)
        : alert("You have entered an invalid email address!");
    
  
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
        <Input type="text" 
          required value={name} 
          onBlur={(ev) => setName(ev.target.value)} 
          name="name" placeholder="name" />
  
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const LoginSubmit = async (email, senha) => {
      signInWithEmailAndPassword(auth, email, senha)
      .then(sucess => {
        Manager.setProperty('user', sucess.user)
      })
      .catch(err => console.log(err))
    }
    return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <form onSubmit={handleSubmit(LoginSubmit)}>
        <Input
        type="email"
        defaultValue={localStorage.getItem("email") || ''}
        name="email"
        placeholder="Email"
        {...register("email", { required: true })}
        />
        <Input
        type="password"
        defaultValue={localStorage.getItem("senha") || ''}
        name="senha"
        placeholder="Senha"
        {...register("password", { required: true })}
        />
        <Button type="submit">
          Login
        </Button>
      </form>
    </Box>
    );
};