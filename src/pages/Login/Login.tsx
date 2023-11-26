import { withRedirectAuthenticated } from "../../components/RedirectAuthenticated";
import { useAuthContext } from "../../context/AuthContext";

function Login() {
  const { user, login, logout } = useAuthContext();

  console.log(user);

  return (
    <>
      <button
        onClick={() => {
          login({
            username: "test@test.test",
            password: "password"
          });
        }}
      >
        Login
      </button>

      <button onClick={logout}>Logout</button>
    </>
  );
}

export default withRedirectAuthenticated(Login, { redirectUrl: "/products" });
