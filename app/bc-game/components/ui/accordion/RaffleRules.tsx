export default function RaffleRules() {
  return (
    <div className="w-full rounded-xl bg-layer4 p-4">
      <div className="mx-auto w-full max-w-full">
        <div className="w-full space-y-4">
          <div className="overflow-hidden rounded-xl">
            <div className="w-full cursor-pointer px-3 flex justify-between items-center rounded-md text-sm font-extrabold rounded-b-none bg-layer4 py-3">
              <span className="text-base font-semibold">How to Enter</span>
              <div className="flex-none size-6 flex items-center justify-center bg-button_bright rounded-md">
                <div className="icon transition-all size-4! duration-300 fill-secondary rotate-180">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="overflow-hidden px-3 rounded-b-xl bg-layer4 text-sm"
              style={{}}
            >
              <div className="flex flex-col gap-y-3 pb-3">
                <div className="text-sm font-semibold text-secondary">
                  <p>
                    “Daily login and wager $100” to earn 1 ticket and a maximum
                    up to 7 tickets per week under this condition.
                  </p>
                  <p>
                    For every $1000 USD you wager, you will receive one extra
                    ticket. The number of tickets you will get increases with
                    your wager amount.
                  </p>
                  <p>Every entry will correlate to an entry number.</p>
                  <p>Your entry numbers can be found on the same page.</p>
                  <p>
                    Maximum tickets accumulated per user can be up to 100
                    tickets per week.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl">
            <div className="w-full cursor-pointer px-3 flex justify-between items-center rounded-md text-sm font-extrabold rounded-b-none bg-layer4 py-3">
              <span className="text-base font-semibold">
                Weekly Raffle Draw
              </span>
              <div className="flex-none size-6 flex items-center justify-center bg-button_bright rounded-md">
                <div className="icon transition-all size-4! duration-300 fill-secondary rotate-180">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="overflow-hidden px-3 rounded-b-xl bg-layer4 text-sm"
              style={{}}
            >
              <div className="flex flex-col gap-y-3 pb-3">
                <div className="text-sm font-semibold text-secondary">
                  <p>
                    Weekly raffle draws every Monday at 12:00:00 UTC; the
                    winners will be announced on the same page.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl">
            <div className="w-full cursor-pointer px-3 flex justify-between items-center rounded-md text-sm font-extrabold rounded-b-none bg-layer4 py-3">
              <span className="text-base font-semibold">
                Terms and Conditions
              </span>
              <div className="flex-none size-6 flex items-center justify-center bg-button_bright rounded-md">
                <div className="icon transition-all size-4! duration-300 fill-secondary rotate-180">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="overflow-hidden px-3 rounded-b-xl bg-layer4 text-sm"
              style={{}}
            >
              <div className="flex flex-col gap-y-3 pb-3">
                <div className="text-sm font-semibold text-secondary">
                  <p>You must have an account in BC.GAME.</p>
                  <p>
                    The weekly raffle includes all types of wager in “Casino”
                    and “Sports”.
                  </p>
                  <p>
                    BC.GAME reserves the right to hold void, suspend, cancel, or
                    amend this promotion where it deems necessary to do so.
                  </p>
                  <p>
                    Entries will be declared void if the entrant is found
                    engaging in fraud, misrepresentation, hacking, or
                    exploitation.
                  </p>
                  <p>
                    BC.GAME reserves the right to perform additional KYC/AML
                    checks as a condition of receiving the weekly raffle reward.
                  </p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between px-3 py-4 font-semibold">
        <span className="font-bold text-title max-w-[320px] flex-[300px] text-sm leading-5">
          Winning Prize Details:
        </span>
        <div className="flex max-w-6 flex-1 items-center justify-center">
          <div className="flex size-6 items-center justify-center rounded-md bg-button_bright">
            <span>
              <div className="icon size-4! fill-secondary -rotate-180">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                </svg>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-hidden" style={{}}>
        <div className="rounded-lg10 bg-layer3 p-2.5">
          <table className="w-full">
            <thead className="w-full">
              <tr className="w-full">
                <th className="w-1/2 flex-1 text-left">Result</th>
                <th className="w-1/2 flex-1 text-left">Prize</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12">
                <td className="text-base font-extrabold text-brand">No. 1</td>
                <td className="text-lg font-extrabold text-brand">
                  ₩7,326,910
                </td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 2</td>
                <td className="text-sm text-brand">₩5,128,837</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 3</td>
                <td className="text-sm text-brand">₩2,930,764</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 4</td>
                <td className="text-sm text-brand">₩2,198,073</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 5</td>
                <td className="text-sm text-brand">₩1,465,382</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 6</td>
                <td className="text-sm text-brand">₩732,691</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 7</td>
                <td className="text-sm text-brand">₩732,691</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 8</td>
                <td className="text-sm text-brand">₩732,691</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 9</td>
                <td className="text-sm text-brand">₩732,691</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 10</td>
                <td className="text-sm text-brand">₩732,691</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 11 ~ No. 20</td>
                <td className="text-sm text-brand">₩146,538</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 21 ~ No. 50</td>
                <td className="text-sm text-brand">₩73,269</td>
              </tr>
              <tr className="h-12">
                <td className="text-sm text-primary">No. 51 ~ No. 150</td>
                <td className="text-sm text-brand">₩29,307</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
