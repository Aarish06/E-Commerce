import { SignIn } from '@clerk/clerk-react';
import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;