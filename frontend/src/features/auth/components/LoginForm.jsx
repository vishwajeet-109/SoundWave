import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import useAuth from "@/hooks/useAuth";
import { loginSchema } from "../validation/loginSchema";

export default function LoginForm() {
  const navigate = useNavigate();

  const {
    login,
    fetchCurrentUser,
    loading,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await login(values);

      await fetchCurrentUser();

      toast.success("Welcome back!");

      navigate("/", {
        replace: true,
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-950
            px-4
            py-3
            outline-none
            transition
            focus:border-green-500
          "
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-950
            px-4
            py-3
            outline-none
            transition
            focus:border-green-500
          "
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Forgot Password */}

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-green-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login Button */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-xl
          bg-green-500
          py-3
          font-semibold
          text-black
          transition
          hover:bg-green-400
          disabled:opacity-60
        "
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Register */}

      <p className="text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-green-500 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}