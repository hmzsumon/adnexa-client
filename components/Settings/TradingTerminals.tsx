

const TradingTerminals = () => {
    return (
      <div className="px-10 space-y-10">
        <div>
          <p className=" text-primary font-semibold">Default terminal</p>
          <p className="text-sm text-slate-600 mt-2">
            Set the default trading terminal for all your MT4 and MT5 accounts.
          </p>
        </div>
        <div className="my-5 border">
          <div className="px-5 py-7 grid grid-cols-3 items-center">
            <p className="text-slate-600 text-sm">MT5 Accounts</p>
            <p className="text-primary font-medium">
              Set your default terminal
            </p>
            <button className="px-5 py-2 border w-[fit-content] ml-auto duration-300 hover:bg-[#F1F2F2] rounded text-slate-500">
              Change
            </button>
          </div>
          <div className="px-5 py-7 grid grid-cols-3 border-t items-center">
            <p className="text-slate-600 text-sm">MT4 Accounts</p>
            <p className="text-primary font-medium text-sm">
              Set your default terminal
            </p>
            <button className="px-5 py-2 border w-[fit-content] ml-auto duration-300 hover:bg-[#F1F2F2] rounded text-slate-500">
              Change
            </button>
          </div>
        </div>
      </div>
    );
};

export default TradingTerminals;