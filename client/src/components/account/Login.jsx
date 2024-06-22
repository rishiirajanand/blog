import React, { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api.js";
import { DataContext } from "../../context/DataProvider.jsx";

import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
});
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

function Login({isUserAuthenticated}) {
  const imageUrl =
    "https://png.pngtree.com/png-vector/20230304/ourmid/pngtree-colorful-blog-speech-bubble-vector-png-image_6633021.png";

  const [account, toggleAccount] = useState("login");
  const [error, setError] = useState("");

  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);

  const {setAccount} = useContext(DataContext)
  const navigate = useNavigate()

  const toggleSignup = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup);
  };

  const signupUser = async () => {
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("Something went wrong !!! please try again later");
    }
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);

    if (response) {
      setError("");

      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );

      setAccount({ name: response.data.name, username: response.data.username });
      isUserAuthenticated(true)
      navigate('/')

    } else {
      setError("Something went wrong! please try again later");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageUrl} alt="logo" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              variant="standard"
              label="Enter username"
            />
            <TextField
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              variant="standard"
              label="Enter password"
            />

            {error && <Typography>{error}</Typography>}

            <LoginButton onClick={() => loginUser()} variant="contained">
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton onClick={toggleSignup}>create a account</SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              onChange={(e) => onInputChange(e)}
              name="name"
              variant="standard"
              label="Enter name"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              name="username"
              variant="standard"
              label="Enter username"
            />
            <TextField
              onChange={(e) => onInputChange(e)}
              name="password"
              variant="standard"
              label="Enter password"
            />

            {error && <Typography>{error}</Typography>}

            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton onClick={toggleSignup} variant="contained">
              already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
}

export default Login;
