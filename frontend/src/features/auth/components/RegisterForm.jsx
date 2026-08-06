import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import useAuth from "@/hooks/useAuth";
import { registerSchema } from "../validation/registerSchema";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { register: registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      toast.success("Registration successful.");

      reset();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Full Name
        </label>

        <input
          {...register("name")}
          type="text"
          placeholder="John Doe"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-green-500"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Email
        </label>

        <input
          {...register("email")}
          type="email"
          placeholder="example@email.com"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-green-500"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Password
        </label>

        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-green-500"
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Confirm Password
        </label>

        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-green-500"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-[#22C55E] py-3 font-semibold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-[#22C55E] hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}