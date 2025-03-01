import React, { useState } from "react";

import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData(() => {});
  };

  const validValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
      }
      navigate("/otp-verification");
    } catch (error) {
      AxiosToastError(error);
      console.log(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2 my-20">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg mb-4"> Verify your OTP</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP:</label>
            <div className="flex items-center gap-2">
              {data.map((element, index) => {
                return (
                  <input
                    type="otp"
                    id="otp"
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>
        <p>
          Already have an account?
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
