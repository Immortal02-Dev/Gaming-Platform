"use client";

import { useState, useMemo, useEffect } from "react";
import { useSwap, SwapRate } from "@/lib/useSwap";
import { useAuth } from "@/contexts/AuthContext";

export default function WalletSwap() {
  const { rates, loading, executeSwap } = useSwap();
  const { isLoggedIn, token } = useAuth();
  const [fromCoin, setFromCoin] = useState("USDT");
  const [toCoin, setToCoin] = useState("BCD");
  const [amount, setAmount] = useState<string>("0");
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [swapping, setSwapping] = useState(false);

  // Fetch balances (In a real app, this might be in a useWallet hook)
  useEffect(() => {
    if (!isLoggedIn || !token) return;
    const fetchBalances = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/balances`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const balMap: Record<string, number> = {};
          data.data.forEach((b: any) => balMap[b.currency] = parseFloat(b.amount));
          setBalances(balMap);
        }
      } catch (err) {}
    };
    fetchBalances();
  }, [isLoggedIn, token]);

  const activeRate = useMemo(() => {
    return rates.find(r => r.from_coin === fromCoin && r.to_coin === toCoin);
  }, [rates, fromCoin, toCoin]);

  const receiveAmount = useMemo(() => {
    if (!activeRate || !amount) return 0;
    const val = parseFloat(amount);
    if (isNaN(val)) return 0;
    const fee = (val * activeRate.fee_percentage) / 100;
    return (val - fee) * activeRate.rate;
  }, [activeRate, amount]);

  const handleSwap = async () => {
    if (!isLoggedIn) return alert("Please log in");
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return alert("Invalid amount");

    setSwapping(true);
    const res = await executeSwap(fromCoin, toCoin, val);
    setSwapping(false);

    if (res.success) {
      alert("Swap successful!");
      setAmount("0");
    } else {
      alert(res.message || "Swap failed");
    }
  };

  return (
    <div className="relative rounded-xl my-4 sm:mt-0 bg-transparent sm:bg-layer4 sm:p-6 lg:px-8">
      <div className="">
        <div className="mb-2 text-secondary flex justify-between">
          From<div className="text-secondary">≈₩{(parseFloat(amount) || 0) * 1400}</div>
        </div>
        <div className="input text-xl text-primary p-1 h-12! pl-2.5 hover:border-second bg-[#FAFAFA] dark:bg-[#363B3C] flex items-center">
          <input 
            className="bg-transparent border-none outline-none w-full"
            inputMode="decimal" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            className="button button-m select bg-input_bright h-10 cursor-pointer rounded-lg bg-input_button center border-none *:bg-transparent"
            type="button"
          >
            <div className="flex items-center">
              <img
                className="h-5 w-5"
                src={`https://bc.game/coin/${fromCoin}.black.png`}
                onError={(e) => (e.currentTarget.src = "https://bc.game/coin/USDT.black.png")}
              />
              <span className="mr-2 text-base font-extrabold ml-1">{fromCoin}</span>
            </div>
            <div className="size-6 ml-auto bg-input_button center rounded-md ">
              <div className="icon size-4 transition-all -rotate-90">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
        <div className="flex justify-between gap-1 mt-1">
          {[25, 50, 75, 100].map(pct => (
            <button
              key={pct}
              className="button button-second button-m h-8! flex-1 border border-third"
              type="button"
              onClick={() => setAmount(((balances[fromCoin] || 0) * pct / 100).toString())}
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>
      
      <div className="relative h-10 center my-3">
        <div className="absolute left-0 right-0 top-1/2 border-t border-third" />
        <div className="bg-layer5 rounded-lg border center absolute-center size-10 border-third">
          <button 
            className="w-full h-full flex center"
            onClick={() => {
              const oldFrom = fromCoin;
              setFromCoin(toCoin);
              setToCoin(oldFrom);
            }}
          >
            <div className="text-primary ease-in duration-300 rotate-0">
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.94" d="M6.69357 15.0562H5.17314H3.11055H1.57834C1.43691 15.0562 1.29547 15.1034 1.16582 15.1741C0.776879 15.4216 0.647231 15.9638 0.871169 16.3881L3.46414 21.1615C3.53486 21.2911 3.62915 21.3972 3.74701 21.4679C4.12417 21.7036 4.61919 21.5622 4.84313 21.1615L7.41253 16.3881C7.48324 16.2584 7.5186 16.1052 7.5186 15.9402C7.5186 15.4569 7.15323 15.0562 6.69357 15.0562Z" fill="#31EE88" />
                <path opacity="0.94" d="M18.8218 9.88197V14.0307C18.8218 16.1287 17.8554 17.1541 15.9342 17.1541C14.013 17.1541 13.0348 16.1051 13.0348 14.0307V8.63263C13.0348 5.37963 11.0783 3.28168 8.061 3.28168C5.04373 3.28168 3.099 5.39141 3.099 8.63263V13.2057H5.16159V8.63263C5.16159 6.61718 6.18699 5.50927 8.061 5.50927C9.39285 5.50927 10.9604 6.07501 10.9604 8.63263V14.0307C10.9604 17.3309 12.8698 19.3699 15.9342 19.3699C18.9986 19.3699 20.908 17.3191 20.8844 14.0307V9.88197H18.81H18.8218Z" fill="#C5DADE" />
                <path opacity="0.94" d="M23.1357 7.58353L20.6016 2.86904C20.5309 2.7276 20.4248 2.62153 20.2952 2.53902C19.8944 2.29151 19.3759 2.43295 19.1401 2.86904L16.5943 7.54817C16.5236 7.6896 16.4764 7.84283 16.4764 7.99605C16.4764 8.49107 16.8418 8.90359 17.3133 8.90359H20.8963H22.1456H22.4167C22.5581 8.90359 22.6996 8.86823 22.8292 8.78572C23.2182 8.53821 23.3596 7.99605 23.1239 7.58353H23.1357Z" fill="#31EE88" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="">
        <div className="mb-2 text-secondary flex justify-between">To</div>
        <div className="input text-xl text-primary p-1 h-12! pl-2.5 hover:border-second bg-[#FAFAFA] dark:bg-[#363B3C] flex items-center">
          <input 
            className="bg-transparent border-none outline-none w-full"
            readOnly 
            value={receiveAmount.toFixed(4)} 
          />
          <button
            className="button button-m select bg-input_bright h-10 cursor-pointer rounded-lg bg-input_button center border-none *:bg-transparent"
            type="button"
          >
            <div className="flex items-center">
              <img
                className="h-5 w-5"
                src={`https://bc.game/coin/${toCoin}.black.png`}
                onError={(e) => (e.currentTarget.src = "https://bc.game/coin/BCD.black.png")}
              />
              <span className="mr-2 text-base font-extrabold ml-1">{toCoin}</span>
            </div>
            <div className="size-6 ml-auto bg-input_button center rounded-md ">
              <div className="icon size-4 transition-all -rotate-90">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
        <div className="flex justify-between rounded-md py-2 mb-4 mt-3">
          <div className="flex text-xs">
            <div className="mr-1 text-secondary whitespace-nowrap">
              {fromCoin} Balance:
            </div>
            <div className="font-bold text-primary">{(balances[fromCoin] || 0).toFixed(4)}</div>
          </div>
          <div className="flex text-xs">
            <div className="mr-1 text-secondary whitespace-nowrap">
              {toCoin} Balance:
            </div>
            <div className="font-bold text-primary">{(balances[toCoin] || 0).toFixed(4)}</div>
          </div>
        </div>
      </div>

      <div className="text-base border-t border-third pt-4 sm:text-sm">
        <div className="mb-1 flex justify-between py-1 rounded">
          <span className="text-secondary">Rate</span>
          <span className="flex items-center text-primary">
            <div className="relative h-4 w-4">
              <svg width="100%" height="100%" viewBox="0 0 32 32">
                <circle cx={16} cy={16} r={12} fill="none" stroke="transparent" strokeWidth={4} />
                <circle
                  cx={16}
                  cy={16}
                  r={12}
                  fill="none"
                  stroke="#24EE89"
                  strokeWidth={4}
                  strokeLinecap="round"
                  transform="rotate(-90 16 16)"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                  strokeDasharray="75.39822368615503"
                  strokeDashoffset="38.24783756001941"
                />
              </svg>
            </div>
            <span className="ml-1">1 {fromCoin} ≈ {activeRate?.rate || "?"} {toCoin}</span>
          </span>
        </div>
        <div className="mb-1 flex justify-between py-1 rounded">
          <span className="text-secondary">Estimated Time</span>
          <span className="text-primary">Instantly</span>
        </div>
        <div className="mb-1 flex justify-between py-1 rounded">
          <span className="text-secondary">Swap fee</span>
          <span className="text-primary">{activeRate?.fee_percentage || "0"} %</span>
        </div>
      </div>
      <button
        disabled={swapping || !amount || parseFloat(amount) <= 0}
        className="button button-brand button-m mt-4 w-full center mx-auto sm:mt-3"
        type="button"
        onClick={handleSwap}
      >
        {swapping ? "Processing..." : "Swap Now"}
      </button>
    </div>
  );
}
