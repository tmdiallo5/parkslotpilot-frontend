import { useMutation } from "@tanstack/react-query";

import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { create } from "../services";

function Active() {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const email = location.state?.email;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputUseRef = useRef<any>([]);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (activationCode: string) =>
      create({ url: "activate", body: { email, code: activationCode } }),
    onSuccess: () => {
      setErrorMessage("");
      navigate("/accountActivated");
    },
    onError: () => {
      setErrorMessage("The code is incorrect. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputUseRef.current[0]?.focus();
    },
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      inputUseRef.current[index + 1]?.focus();
    }
    const activationCode = newCode.join("");
    if (
      activationCode.length === 6 &&
      !newCode.includes("") &&
      !mutation.isPending
    ) {
      mutation.mutate(activationCode);
    }
  };

  return (
    <section className="min-h-screen flex items-start justify-center mt-15">
      <div className="w-full max-w-3xl  bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-12 text-center">
        <h1 className="text-3xl font-bold text-center text-slate-700 mb-4">
          Activate Your Account
        </h1>

        <p className="text-center text-gray-500 mb-1">
          Enter the verification code we sent to your email:
        </p>
        <p className="text-center font-semibold text-slate-700 mb-6">{email}</p>
        <hr className="mb-6" />
        <form>
          <div className="flex justify-center gap-3 mb-4">
            {code.map((digit, index) => (
              <input
                className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                key={index}
                ref={(el) => {
                  inputUseRef.current[index] = el;
                }}
                value={digit}
                type="text"
                inputMode="numeric"
                maxLength={1}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Active;
