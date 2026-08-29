"use client";
import { useAuthModal } from "@/store/useAuthModalStore";
import Modal from "./Modal";
import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { FcGoogle } from "react-icons/fc";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>;

const RegisterModal = () => {
  const { openLogin, isRegisterOpen, closeRegister } = useAuthModal();

  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: RegisterErrors = {};

    //validate the name field

    if (!values.name.trim()) {
      newErrors.name = "Name is required!";
    } else if (values.name.length < 2) {
      newErrors.password = "Name must be at least 2 characters!";
    }

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
    <Modal title="Register" onClose={closeRegister} isOpen={isRegisterOpen}>
      {/* header */}
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">
          Welcome to NextEstate
        </h2>
        <p className="text-sm text-gray-500">Create an account</p>
      </div>

      <form className="space-y-8">
        <Input
          id="login-name"
          onChange={handleChange}
          name="name"
          label="Name"
          value={values.name}
          error={errors.name}
          disabled={loading}
        />
        <Input
          id="login-email"
          onChange={handleChange}
          name="email"
          label="Email"
          value={values.email}
          error={errors.email}
          type="email"
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
        Already have an account?
        <span
          className="text-primary font-semibold cursor-pointer hover:underline"
          onClick={openLogin}
        >
          Login
        </span>
      </p>
    </Modal>
  );
};

export default RegisterModal;
