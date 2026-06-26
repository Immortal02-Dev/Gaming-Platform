export default function ResponsibleBudgetCalculator() {
  return (
    <div className="rounded-xl bg-layer4">
      <div className="w-full rounded-lg bg-layer4 p-4">
        <p className="font-extrabold text-secondary">Budget Calculator</p>
        <div className="w-full sm:mt-4 sm:flex sm:gap-8">
          <div className="flex-1">
            <p className="font-semibold">Income</p>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Wages after deductions</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Pensions</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Benefits</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Other income</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Total income</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full" data-disabled="true">
              <input disabled inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
          </div>
          <div className="mt-4 flex-1 sm:mt-0 sm:w-1/2 sm:flex-none">
            <p className="font-semibold">Expenses</p>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Rent/mortgage</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Utility bills</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Loans/credit</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Other expenses</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full">
              <input inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
            <div className="mt-3 flex h-5 w-full items-center justify-between font-semibold text-secondary">
              <span>Total expenses</span>
              <span>₩0</span>
            </div>
            <div className="input mt-1.5 w-full" data-disabled="true">
              <input disabled inputMode="decimal" placeholder="0.00" />
              <img
                className="-order-1 w-6"
                src="https://bc.game/coin/KRW.rect.png"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 h-px w-full bg-third" />
        <div className="mt-4 w-full rounded-md bg-layer5 p-3">
          <p className="font-semibold">Disposable income</p>
          <div className="mt-2 flex items-center">
            <img
              className="-order-1 w-6"
              src="https://bc.game/coin/KRW.rect.png"
            />
            <span className="ml-2 text-lg font-extrabold">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
