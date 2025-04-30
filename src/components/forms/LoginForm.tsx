import React, { useState } from "react";
import { Input, Button, Spinner } from "../shared";
import { login } from "../../service/auth";
import { ApiError } from "../../types";
import { setUserCookie } from "../../utils/user";
import { useNavigate } from "react-router";
export const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) {
      setError("");
    }
    if (formData.username === "" || formData.password === "") {
      setError("Please fill in all fields");
      return;
    }
    try {
      setIsLoading(true);
      const response = await login(formData.username, formData.password);
      if (response.status === 200) {
        setUserCookie(response.data.token);
        setSuccess(true);
        navigate("/dashboard");
      }
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
        label="Username"
        icon="mail"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={formData.username}
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
      {success && (
        <div className="bg-green-100 rounded-lg px-2 py-3">
          <p className="text-green-500 font-medium text-sm text-center">
            Login successful!
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
