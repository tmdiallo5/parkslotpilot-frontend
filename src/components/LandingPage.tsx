import React, { useState } from "react";
import parkingImg from "../images/parking3.jpg";
import { search } from "../services";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";

type Credentials = {
  address: string;
  startDateTime: string;
  endDateTime: string;
};

type Address = {
  id: number;
  street: string;
  zip: string;
  city: string;
};

const REQUIERED_FIELD_address = "address is required";
const REQUIERED_FIELD_startDateTime = "start time is required";
const REQUIERED_FIELD_endDateTime = "end time is required";

const schema = yup
  .object({
    address: yup.string().required(REQUIERED_FIELD_address),
    startDateTime: yup.string().required(REQUIERED_FIELD_startDateTime),
    endDateTime: yup.string().required(REQUIERED_FIELD_endDateTime),
  })
  .required();

function LandingPage() {
  const navigate = useNavigate();

  const [bookingType, setBookingType] = useState("Hourly");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddresse] = useState<Address | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: yupResolver(schema),
  });

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length < 2) {
      setAddresses([]);
      return;
    }
    const data = await search({
      url: `search-address?keyword=${value}`,
    });
    setAddresses(data);
  };

  const onSubmit: SubmitHandler<Credentials> = async (credentials) => {
    if (!selectedAddress) {
      alert("Please select an address from the list");
      return;
    }

    navigate(
      `/AvailableSpotsPage?addressId=${selectedAddress.id}&startDateTime=${credentials.startDateTime}&endDateTime=${credentials.endDateTime}`,
    );
  };

  return (
    <section className="bg-gray-50 pb-12 sm:pb-16 lg:pb-24 ">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-10 lg:py-12">
        <div className="grid items-start lg:items-stretch gap-6 lg:gap-10 lg:grid-cols-2">
          {/* left */}
          <article className="rounded-2xl bg-white p-4 sm:p-6 lg:p-8 shadow-sm">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5"
            >
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                  Find your parking space easily
                </h1>
                <p className="text-sm sm:text-base text-slate-500">
                  Book a secure spot in seconds
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBookingType("hourly")}
                  className={` min-h-11 text-sm font-semibold rounded-lg px-3 py-2 transition ${
                    bookingType == "hourly"
                      ? "bg-green-100 text-gray-900"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Hourly/Daily
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType("montly")}
                  className={`min-h-11 text-sm font-semibold rounded-lg px-3 py-2 transition ${
                    bookingType == "montly"
                      ? "bg-green-100 text-gray-900"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Montly
                </button>
              </div>

              <div className="rounded-lg border border-gray-300 bg-white px-4 py-3">
                <label className="block text-xs font-medium text-emerald-700">
                  Park at
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Enter a place"
                    className="w-full bg-transparent text-base font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
                    {...register("address", {
                      onChange: handleSearch,
                    })}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search-icon lucide-search"
                  >
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                </div>
                <div>
                  {addresses.length > 0 &&
                    addresses.map((address) => (
                      <button
                        key={address.id}
                        type="button"
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => {
                          setSelectedAddresse(address);
                          setValue(
                            "address",
                            `${address.street}, ${address.zip}, ${address.city}`,
                          );
                          setAddresses([]);
                        }}
                      >
                        {address.street}, {address.zip}, {address.city}
                      </button>
                    ))}
                </div>
              </div>

              {/* from and until */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-300 bg-white px-4 py-3">
                  <label className="block text-xs font-medium text-emerald-700">
                    From
                  </label>
                  <input
                    type="datetime-local"
                    className="mt-1 w-full bg-transparent text-base font-semibold placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
                    {...register("startDateTime")}
                  />
                </div>
                <div className="rounded-lg border border-gray-300 bg-white px-4 py-3 gap-4">
                  <label className="block text-xs font-medium text-emerald-700">
                    Until
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder:font-normal placeholder:text-gray-400 focus:outline-none"
                    {...register("endDateTime")}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full min-h-12 rounded-md bg-green-700 py-3.5 font-semibold text-white transition hover:bg-green-600"
              >
                Show available parking spaces
              </button>
            </form>
          </article>

          {/* right */}
          <div className="flex items-start justify-start">
            <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <img
                src={parkingImg}
                alt="parking"
                className="h-full w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
