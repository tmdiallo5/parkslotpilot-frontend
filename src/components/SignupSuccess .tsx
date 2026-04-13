import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

function SignupSuccess() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-start justify-center mt-15">
      <div className="w-full max-w-3xl  bg-white rounded-lg border border-gray-200 shadow-sm p-8 mb-12 text-center">
        <div className="mx-auto flex my-2 h-20 w-20 items-center justify-center rounded-full bg-green-700">
          <Check className="h-10 w-10 text-white" strokeWidth={4} />
        </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-10">
          Sign up successfully!
        </h1>
        <p className="mb-3 text-xl text-gray-600">Welcome to ParkSlotPilot!</p>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-500">
          Your account has been successfully created. Please check your email
          and enter the verification code to activate your account.
        </p>
        <button
          onClick={() => navigate("/active", { state: { email } })}
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md px-10 py-3"
        >
          Activate your account
        </button>
      </div>
    </section>
  );
}

export default SignupSuccess;
