import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { create } from "../../services";

import { useNavigate } from "react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Credentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const REQUIRED_FIELD_FIRSTNAME = "first name is required";
const REQUIRED_FIELD_LASTNAME = "last name is required";
const REQUIRED_FIELD_EMAIL = "Email is required";
const REQUIRED_FIELD_PASSWORD = "Password is required";

const schema = yup
  .object({
    firstName: yup.string().required(REQUIRED_FIELD_FIRSTNAME),
    lastName: yup.string().required(REQUIRED_FIELD_LASTNAME),
    email: yup.string().required(REQUIRED_FIELD_EMAIL),
    password: yup.string().required(REQUIRED_FIELD_PASSWORD),
  })
  .required();

function SignUp() {
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: yupResolver(schema),
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: (credentials: Credentials) =>
      create({ url: "sign-up", body: credentials }),
    onSuccess: (_, variables: Credentials) => {
      reset();
      navigate("/signUp-success", {
        state: { email: variables.email },
      });
    },
  });

  const onSubmit: SubmitHandler<Credentials> = (credentials) => {
    mutation.mutate(credentials);
  };

  return (
    <section className="min-h-screen flex items-start justify-center mt-15">
      <div className="w-full max-w-3xl  bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-12">
        <h1 className="text-2xl font-medium text-gray-900 mb-10">
          Create an account.
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center gap-10">
            <label htmlFor="" className="w-48">
              First name
            </label>
            <div className="flex flex-col flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="First name"
                className="flex-1 max-w-2xl border border-gray-200 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400"
                {...register("firstName")}
              />
              <p className="text-red-600">{errors.firstName?.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <label htmlFor="" className="w-48">
              Last name
            </label>
            <div className="flex flex-col flex-1 max-w-2xl">
              <input
                type="Last name"
                placeholder="Last name"
                className="flex-1 max-w-2xl border border-gray-200 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400"
                {...register("lastName")}
              />
              <p className="text-red-600">{errors.lastName?.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <label htmlFor="" className="w-48">
              Email address
            </label>
            <div className="flex flex-col flex-1 max-w-2xl">
              <input
                type="Email address"
                placeholder="example@mail.com"
                className="flex-1 max-w-2xl border border-gray-200 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400"
                {...register("email")}
              />
              <p className="text-red-600">{errors.email?.message}</p>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <label htmlFor="" className="w-48 ">
              Password
            </label>
            <div className="flex flex-col flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type={showPassword ? "texte" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-gray-900 placeholder-gray-400"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-10">
            <button type="button" className="text-green-600 hover:underline">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-10 py-3"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
