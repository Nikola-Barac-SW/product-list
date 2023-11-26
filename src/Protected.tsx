import { Navigate } from "react-router-dom";

type AuthGuardProps = {
  isLoggedIn: boolean;
  children: React.ReactNode;
};


const Protected: any = ({
  isLoggedIn,
  children,
}: React.PropsWithChildren<AuthGuardProps>) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default Protected;