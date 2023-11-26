import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, Nullable, User } from "../../utils/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { login as authLogin } from "../../services/auth";

interface AuthContextValues {
  user: Nullable<User>;
  isAuthenticating: boolean;
  login: (payload: LoginPayload) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValues>({
  user: null,
  isAuthenticating: true,
  login: () => {},
  logout: () => {}
});

export const useAuthContext = () => useContext(AuthContext);

function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<Nullable<User>>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") ?? "null");

      setUser(user);
    } catch (error) {
      setUser(null);
    }

    setIsAuthenticating(false);
  }, []);

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: authLogin
  });

  const login = (payload: LoginPayload) => {
    setUser(user);

    mutate(payload, {
      onSuccess(user) {
        try {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        } catch (error) {
          setUser(null);
        }
      },
      onError() {
        localStorage.removeItem("user");
        setUser(null);
      },
      onSettled() {
        setIsAuthenticating(false);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticating,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
