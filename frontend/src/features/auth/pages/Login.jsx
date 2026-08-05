import AuthLayout from "../components/AuthLayout";
import AuthCard from "../components/AuthCard";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Login to continue listening."
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}