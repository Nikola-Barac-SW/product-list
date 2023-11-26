import { useState } from "react";
import { withRedirectAuthenticated } from "../../components/RedirectAuthenticated";
import { useAuthContext } from "../../context/AuthContext";
import { LoginPayload } from "../../utils/types";

function Login() {
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    username: "test@test.test",
    password: "password"
  });
  const { login, logout } = useAuthContext();

  const handleInput = (key: keyof LoginPayload, value: string) => {
    setLoginPayload({ ...loginPayload, [key]: value });
  };

  return (
    <>
      <label>Username</label>
      <input
        defaultValue={loginPayload.username}
        type="text"
        onChange={(event) => {
          handleInput("username", event?.target.value);
        }}
      />

      <label>Password</label>
      <input
        defaultValue={loginPayload.password}
        type="password"
        onChange={(event) => {
          handleInput("password", event?.target.value);
        }}
      />

      <button
        onClick={() => {
          login(loginPayload);
        }}
      >
        Login
      </button>

      <button onClick={logout}>Logout</button>
    </>
  );
}

export default withRedirectAuthenticated(Login, { redirectUrl: "/products" });
