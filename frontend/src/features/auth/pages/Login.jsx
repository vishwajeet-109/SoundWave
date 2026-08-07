import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Login to continue listening."
    >
      <LoginForm />
    </AuthCard>
  );
}