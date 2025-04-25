import React, { useState } from "react";
import { Input, Button, Spinner } from "../shared";
import { login } from "../../service/auth";
import { ApiError } from "../../types";

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) {
      setError("");
    }
    if (formData.email === "" || formData.password === "") {
      setError("Please fill in all fields");
      return;
    }
    console.log(formData);
    try {
      setIsLoading(true);
      const response = await login(formData.email, formData.password);
      console.log(response);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email Address"
        icon="mail"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        icon="lock"
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />
      {error && (
        <div className="bg-red-100 rounded-lg px-2 py-3">
          <p className="text-red-500 font-medium text-sm text-center">
            {error}
          </p>
        </div>
      )}
      <Button
        disabled={isLoading}
        className="bg-primary-base phone:mt-2 tablet:mt-6 laptop:mt-6 text-white flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Spinner />
            <span>Logging in...</span>
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};
