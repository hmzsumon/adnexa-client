/* eslint-disable react/no-unescaped-entities */


const TradingConditions = () => {
    return (
      <div className="px-10 space-y-10">
        <div>
          <h3 className="text-primary text-3xl font-semibold">
            Trading Conditions
          </h3>
          <p className="mt-2">
            Here's a list of the better-than-market trading conditions you can
            currently enjoy on your accounts.
          </p>
        </div>
        <div className="border p-5 w-full md:w-[500px]">
          <h4 className="font-semibold text-xl text-primary">Negative Balance Protection</h4>
          <p className="text-sm my-2">
            You can never lose more money than you put into your account. If a
            stop out causes all your positions to close in a negative balance,
            we will restore it to 0.
          </p>
          <a className="hover:underline underline-offset-4 text-info text-sm" href="">Learn more</a>
        </div>
      </div>
    );
};

export default TradingConditions;