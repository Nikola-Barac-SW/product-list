import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuthContext();

  const isLoggedIn = user !== null;

  return (
    <header>
      {isLoggedIn ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </header>
  );
}

export default Header;
