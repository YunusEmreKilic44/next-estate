"use client";
import { useAuthModal } from "@/store/useAuthModalStore";
import Modal from "./Modal";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";

interface LoginValues {
  email: string;
  password: string;
}

type LoginErrors = Partial<Record<keyof LoginValues, string>>;

const LoginModal = () => {
  const { openRegister, isLoginOpen, closeLogin } = useAuthModal();
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: LoginErrors = {};

    // validate the email

    if (!values.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address!";
    }

    // validate the password

    if (!values.password.trim()) {
      newErrors.password = "Password is required!";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Modal title="Login" onClose={closeLogin} isOpen={isLoginOpen}>
      {/* header */}
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
        <p className="text-sm text-gray-500">Login to your accent</p>
      </div>

      <form className="space-y-8">
        <Input
          id="login-email"
          onChange={handleChange}
          name="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          disabled={loading}
        />
        <Input
          id="login-password"
          onChange={handleChange}
          name="password"
          label="Password"
          value={values.password}
          error={errors.password}
          disabled={loading}
          type="password"
        />
        <Button fullWidth type="submit" loading={loading}>
          Continue
        </Button>
      </form>

      {/* divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500">Or</span>
        </div>
      </div>

      <Button
        variant="outline"
        fullWidth
        disabled={loading}
        icon={<FcGoogle size={22} />}
      >
        Continue with Google
      </Button>

      <p className="text-gray-400 text-center text-sm mt-6">
        Don&apos;t have an account?
        <span
          className="text-primary font-semibold cursor-pointer hover:underline"
          onClick={openRegister}
        >
          Register
        </span>
      </p>
    </Modal>
  );
};

export default LoginModal;
