"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { LuSend } from "react-icons/lu";

interface InputValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}

const EmailForm = () => {
  const [values, setValues] = useState<InputValues>({
    email: "",
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="sticky top-28 rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src={"/images/avatar.png"}
            alt="User"
            width={50}
            height={50}
            className="object-cover rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold text-text">Sarah Johnson</h3>
            <p className="text-text/60">Property Agent</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Input
            onChange={handleChange}
            id="contact-name"
            label="Your Name"
            name="name"
            value={values.name}
          />
          <Input
            onChange={handleChange}
            id="contact-email"
            label="Your Email"
            name="email"
            value={values.email}
          />
          <Input
            onChange={handleChange}
            id="contact-phone"
            label="Your Phone"
            name="phone"
            value={values.phone}
          />
          <Input
            onChange={handleChange}
            id="contact-message"
            label="Your Message"
            name="message"
            value={values.message}
            as="textarea"
          />
        </div>
        <Button className="mt-3" fullWidth={true} icon={<LuSend />}>
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;
