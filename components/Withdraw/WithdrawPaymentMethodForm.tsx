"use client";

import { useCreateWithdrawPaymentMethodMutation } from "@/redux/features/withdraw/withdrawApi";
import { fetchBaseQueryError } from "@/redux/services/helpers";
import { useEffect, useState } from "react";
import { HiBanknotes, HiCheckCircle, HiWallet } from "react-icons/hi2";
import RingLoader from "react-spinners/RingLoader";
import { toast } from "react-toastify";

/* ────────── Withdraw Method Form ────────── */
const WithdrawPaymentMethodForm = ({
  type,
}: {
  type: "mobile" | "binance";
}) => {
  const [createMethod, { isLoading, isSuccess, isError, error }] =
    useCreateWithdrawPaymentMethodMutation();
  const [methodName, setMethodName] = useState(
    type === "mobile" ? "Bkash" : "Binance",
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  /* ────────── Submit Method ────────── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMethod({ methodName, accountNumber, walletAddress });
  };

  /* ────────── API Response ────────── */
  useEffect(() => {
    if (isSuccess) {
      toast.success("Withdrawal payment method added successfully");
      setAccountNumber("");
      setWalletAddress("");
    }
    if (isError) {
      toast.error(
        (error as fetchBaseQueryError).data?.message || "Method add failed",
      );
    }
  }, [isSuccess, isError, error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="adnexa-glass-card space-y-4 rounded-[28px] p-4"
    >
      {/* ────────── Method Header ────────── */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          {type === "mobile" ? (
            <HiBanknotes className="text-2xl" />
          ) : (
            <HiWallet className="text-2xl" />
          )}
        </div>
        <div>
          <h3 className="font-black text-white">
            {type === "mobile" ? "Mobile Banking" : "Binance USDT TRC20"}
          </h3>
          <p className="text-xs font-bold text-slate-400">
            Can be added once from user panel.
          </p>
        </div>
      </div>

      {/* ────────── Method Inputs ────────── */}
      {type === "mobile" ? (
        <>
          <select
            className="adnexa-input"
            value={methodName}
            onChange={(e) => setMethodName(e.target.value)}
          >
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
          </select>
          <input
            className="adnexa-input"
            placeholder="Registered mobile number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </>
      ) : (
        <input
          className="adnexa-input"
          placeholder="USDT TRC20 wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
      )}

      {/* ────────── Save Button ────────── */}
      <button
        className="adnexa-primary-button"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? <RingLoader color="#fff" size={24} /> : "Save Method"}
        {!isLoading && <HiCheckCircle className="text-2xl" />}
      </button>
    </form>
  );
};

export default WithdrawPaymentMethodForm;
