export default function ReferralRules() {
  return (
    <div className="flex flex-col gap-4 bg-layer2 font-semibold">
      <div className="flex flex-col gap-4 md:flex-row">
        <section className="relative rounded-xl bg-layer4 px-4 py-3 md:w-3/5">
          <h2 className="mb-4 border-b border-input pb-2 text-base font-extrabold text-secondary">
            Commission Reward Rate
          </h2>
          <div className="flex flex-col gap-3">
            <h2 className="text-base font-extrabold">Casino</h2>
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="flex-1">
                <p className="mb-2 text-secondary">The Original Games</p>
                <div className="center gap-1 rounded-lg border border-input bg-layer5 p-3 text-xs">
                  <span className="text-secondary">Wager</span>
                  <span className="text-secondary">× 1% ×</span>
                  <span>Commission Rate</span>
                  <span className="text-secondary">×</span>
                  <span>28%</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="mb-2 text-secondary">
                  3rd Party Slots, Live Casino
                </p>
                <div className="center gap-1 rounded-lg border border-input bg-layer5 p-3 text-xs">
                  <span className="text-secondary">Wager</span>
                  <span className="text-secondary">× 1% ×</span>
                  <span className="w">Commission Rate</span>
                  <span className="text-secondary">×</span>
                  <span className="w">60%</span>
                </div>
              </div>
            </div>
            <div className="data">
              <p className="text-base font-extrabold">All Sports</p>
              <div className="center gap-1 rounded-lg border border-input bg-layer5 p-3 text-xs">
                <span className="text-secondary">Wager</span>
                <span className="text-secondary">× 1% ×</span>
                <span>Commission Rate</span>
                <span className="text-secondary">×</span>
                <span className="w">100%</span>
              </div>
              <div className="text-secondary mt-1">
                0 House Edge Wager does not calculate commission.
              </div>
            </div>
          </div>
          <div className="center mt-4 w-full flex-col text-secondary">
            <button
              className="button button-second button-m right-4 top-2 h-8! sm:absolute"
              type="button"
            >
              <span className="font-extrabold">View Rules</span>
              <div className="icon ml-1 size-5! -rotate-90 fill-secondary transition-all ">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
        </section>
        <section className="relative rounded-xl bg-layer4 px-4 py-3 md:w-2/5">
          <div className="mb-4 flex items-center justify-between border-b border-input pb-2">
            <div className="center gap-2 text-base font-extrabold text-secondary">
              <div className="icon size-4.5! fill-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.58375 4H23.423C24.3345 4.08531 25.0392 4.49266 25.537 5.22203C25.7248 5.49672 25.8567 5.80156 25.9327 6.13656C25.9795 6.34406 26.0028 6.62156 26.0025 6.96906C25.9975 12.955 25.9977 18.9748 26.003 25.0286C26.0033 25.367 25.9803 25.6403 25.9341 25.8484C25.6659 27.0494 24.6478 27.9002 23.415 28H8.58047C7.87016 27.9381 7.27609 27.6659 6.79828 27.1834C6.26703 26.6472 6.00156 25.9767 6.00188 25.172C6.00281 19.1298 6.00219 13.0839 6 7.03422C6 6.64078 6.02312 6.34141 6.06937 6.13609C6.14531 5.80078 6.27719 5.49594 6.465 5.22156C6.96469 4.49187 7.67094 4.08469 8.58375 4ZM10.755 7C10.5247 7 10.2966 7.04539 10.0838 7.13358C9.87099 7.22177 9.67767 7.35103 9.51486 7.51398C9.35205 7.67692 9.22294 7.87035 9.13492 8.08321C9.0469 8.29607 9.00169 8.52419 9.00187 8.75453L9.00281 10.2484C9.00319 10.7132 9.18805 11.1587 9.51679 11.4872C9.84552 11.8156 10.2912 12.0002 10.7559 12.0002L21.247 12.0006C21.712 12.0006 22.1579 11.8159 22.4867 11.4871C22.8155 11.1584 23.0002 10.7125 23.0002 10.2475V8.75313C23.0002 8.28817 22.8155 7.84225 22.4867 7.51348C22.1579 7.1847 21.712 7 21.247 7H10.755ZM11.2547 16.7847C11.2472 17.1995 11.1891 17.5975 11.58 17.8652C12.0286 18.1722 12.6066 17.927 12.7298 17.4123C12.7758 17.2225 12.7472 16.9825 12.7519 16.7762C12.7522 16.7575 12.7619 16.7483 12.7809 16.7486C12.9522 16.7514 13.1177 16.7512 13.2773 16.7481C13.8 16.7369 14.1684 16.1613 13.9261 15.6784C13.77 15.3677 13.4934 15.2373 13.1564 15.2477C13.0305 15.2517 12.9036 15.2523 12.7758 15.2495C12.7589 15.2489 12.7506 15.2402 12.7509 15.2233C12.7523 15.0798 12.7486 14.9388 12.7523 14.7972C12.7739 13.9534 11.6681 13.6919 11.3142 14.4522C11.2134 14.6687 11.2561 14.9861 11.2519 15.2289C11.2518 15.2338 11.2497 15.2385 11.2463 15.242C11.2428 15.2455 11.2381 15.2475 11.2331 15.2477C10.8539 15.2612 10.4292 15.175 10.1644 15.5345C9.78609 16.0483 10.1208 16.7584 10.7803 16.7509C10.9241 16.7494 11.0708 16.7491 11.2205 16.75C11.2436 16.75 11.255 16.7616 11.2547 16.7847ZM21.9942 16.2213C21.9942 16.0304 21.9184 15.8474 21.7835 15.7125C21.6485 15.5775 21.4655 15.5017 21.2747 15.5017H18.7284C18.6339 15.5017 18.5404 15.5203 18.4531 15.5565C18.3658 15.5926 18.2865 15.6456 18.2197 15.7125C18.1528 15.7793 18.0998 15.8586 18.0637 15.9459C18.0275 16.0332 18.0089 16.1268 18.0089 16.2213V16.2766C18.0089 16.3711 18.0275 16.4646 18.0637 16.5519C18.0998 16.6392 18.1528 16.7185 18.2197 16.7853C18.2865 16.8522 18.3658 16.9052 18.4531 16.9413C18.5404 16.9775 18.6339 16.9961 18.7284 16.9961H21.2747C21.4655 16.9961 21.6485 16.9203 21.7835 16.7853C21.9184 16.6504 21.9942 16.4674 21.9942 16.2766V16.2213ZM10.9177 22.0216C10.7352 22.2113 10.5491 22.397 10.3594 22.5789C10.2184 22.7136 10.127 22.8227 10.0852 22.9061C9.77062 23.5328 10.3884 24.1942 11.0311 23.9444C11.148 23.8988 11.29 23.788 11.4572 23.612C11.6334 23.4258 11.8105 23.2475 11.9883 23.0772C11.9989 23.0672 12.0092 23.0673 12.0192 23.0777C12.2483 23.307 12.4789 23.5372 12.7111 23.7681C13.1372 24.1919 13.7934 24.0091 13.9716 23.4498C14.0494 23.2042 13.9688 22.9098 13.7822 22.7214C13.5569 22.4933 13.3216 22.2572 13.0763 22.0131C13.0729 22.0098 13.071 22.0052 13.071 22.0004C13.071 21.9956 13.0729 21.9909 13.0763 21.9873C13.3088 21.7552 13.5409 21.5225 13.7728 21.2894C14.3466 20.7133 13.7541 19.7758 12.9909 20.0467C12.8828 20.0852 12.7764 20.1583 12.6717 20.2661C12.463 20.4811 12.2445 20.7 12.0164 20.9228C12.012 20.927 12.0062 20.9293 12.0001 20.9292C11.9941 20.9291 11.9883 20.9267 11.9841 20.9223C11.7125 20.6477 11.475 20.4105 11.2716 20.2108C10.9744 19.9197 10.492 19.9342 10.2047 20.237C9.92203 20.5352 9.93938 20.9983 10.2286 21.2875C10.4702 21.5284 10.6997 21.7575 10.9172 21.9747C10.9325 21.9903 10.9327 22.0059 10.9177 22.0216ZM21.9942 20.7213C21.9942 20.5304 21.9184 20.3474 21.7835 20.2125C21.6485 20.0775 21.4655 20.0017 21.2747 20.0017H18.7284C18.6339 20.0017 18.5404 20.0203 18.4531 20.0565C18.3658 20.0926 18.2865 20.1456 18.2197 20.2125C18.1528 20.2793 18.0998 20.3586 18.0637 20.4459C18.0275 20.5332 18.0089 20.6268 18.0089 20.7213V20.7766C18.0089 20.8711 18.0275 20.9646 18.0637 21.0519C18.0998 21.1392 18.1528 21.2185 18.2197 21.2853C18.2865 21.3522 18.3658 21.4052 18.4531 21.4413C18.5404 21.4775 18.6339 21.4961 18.7284 21.4961H21.2747C21.4655 21.4961 21.6485 21.4203 21.7835 21.2853C21.9184 21.1504 21.9942 20.9674 21.9942 20.7766V20.7213ZM21.9929 23.229C21.9932 23.1345 21.9749 23.0409 21.9391 22.9534C21.9032 22.866 21.8505 22.7865 21.7839 22.7195C21.7174 22.6524 21.6382 22.5991 21.551 22.5627C21.4639 22.5262 21.3704 22.5073 21.2759 22.5069L18.7325 22.4981C18.5416 22.4974 18.3584 22.5726 18.2229 22.707C18.0875 22.8415 18.0111 23.0242 18.0104 23.2151L18.0102 23.2723C18.0099 23.3668 18.0282 23.4604 18.064 23.5478C18.0999 23.6352 18.1526 23.7147 18.2192 23.7818C18.2858 23.8488 18.3649 23.9021 18.4521 23.9386C18.5393 23.975 18.6328 23.994 18.7272 23.9943L21.2707 24.0032C21.4615 24.0039 21.6448 23.9287 21.7802 23.7942C21.9156 23.6597 21.992 23.477 21.9927 23.2862L21.9929 23.229Z" />
                </svg>
              </div>
              <p>Commission Calculator</p>
            </div>
            <div className="flex gap-2">
              <img className="h-4 w-4" src="/coin/USDT.black.png" />
              <span className="w">USDT</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex w-10 flex-auto flex-col gap-1">
                <span className="text-secondary">Wager (USDT)</span>
                <div className="input">
                  <input inputMode="decimal" />
                </div>
              </div>
              <span className="mt-5 flex-none text-nowrap text-secondary">
                × 1% ×
              </span>
              <div className="flex w-10 flex-auto flex-col gap-1">
                <span className="text-secondary">Commission Rate</span>
                <div className="input">
                  <input inputMode="decimal" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <span className="text-secondary">Game</span>
              <button
                className="button button-m select bg-input_bright w-full "
                type="button"
              >
                Original Games (28%)
                <div className="size-6 ml-auto bg-input_button center rounded-md ">
                  <div className="icon size-4! transition-all -rotate-90">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary">=</span>
              <span className="text-xl font-extrabold">0.70 USDT</span>
            </div>
          </div>
        </section>
      </div>
      <section className="relative rounded-xl bg-layer4 px-4 py-3">
        <h2 className="mb-4 border-b border-input pb-2 text-base font-extrabold text-secondary">
          How to Get your Referral Reward
        </h2>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 gap-4 rounded-lg bg-layer5 p-4">
            <div className="text-5xl text-brand">1</div>
            <div className="text">
              <span className="mr-1 text-xl font-extrabold text-brand">
                Share
              </span>
              <span className="text-xl font-extrabold">to friends</span>
              <br />
              <p className="text-secondary">
                Share your referral link or code to your friends
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-4 rounded-lg bg-layer5 p-4">
            <div className="text-5xl text-brand">2</div>
            <div className="text">
              <span className="mr-1 text-xl font-extrabold">Get</span>
              <span className="text-xl font-extrabold text-brand">$1000</span>
              <br />
              <p className="text-secondary">
                Your awards will be locked for now
              </p>
            </div>
          </div>
          <div className="flex flex-1 gap-4 rounded-lg bg-layer5 p-4">
            <div className="text-5xl text-brand">3</div>
            <div className="text">
              <span className="mr-1 text-xl font-extrabold">Level Up &</span>
              <span className="text-xl font-extrabold text-brand">Receive</span>
              <br />
              <p className="text-secondary">
                Your friend’s VIP level will unlock your awards (see rules
                below)
              </p>
            </div>
          </div>
        </div>
        <table className="mt-4 w-full rounded-lg bg-layer3 text-center">
          <thead className="text-secondary">
            <tr>
              <th className="px-3 py-2 text-left">Friend’s Level</th>
              <th className="px-3 py-2">Total Wager</th>
              <th className="px-3 py-2 text-right">Unlock Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level1.png"
                />
                <span>VIP 04</span>
              </td>
              <td className="p-3">1000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+0.50</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level1.png"
                />
                <span>VIP 08</span>
              </td>
              <td className="p-3">5000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+2.50</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level1.png"
                />
                <span>VIP 14</span>
              </td>
              <td className="p-3">17000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+5.00</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level1.png"
                />
                <span>VIP 22</span>
              </td>
              <td className="p-3">49000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+12.00</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level1.png"
                />
                <span>VIP 30</span>
              </td>
              <td className="p-3">129000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+25.00</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level2.png"
                />
                <span>VIP 38</span>
              </td>
              <td className="p-3">321000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+50.00</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level2.png"
                />
                <span>VIP 46</span>
              </td>
              <td className="p-3">769000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+80.00</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level2.png"
                />
                <span>VIP 54</span>
              </td>
              <td className="p-3">1793000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+120.00</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level2.png"
                />
                <span>VIP 62</span>
              </td>
              <td className="p-3">4097000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+205.00</span>
              </td>
            </tr>
            <tr>
              <td className="flex items-center justify-start gap-1 p-3">
                <img
                  className="h-5 w-4"
                  src="https://bc.game/substation/bc/bonus/affiliate/level3.png"
                />
                <span>VIP 70</span>
              </td>
              <td className="p-3">9217000</td>
              <td className="flex items-center justify-end gap-1 p-3">
                <img
                  className="h-4 w-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAWlBMVEUAAAD/0AD/0AD/zwD/0AD/0AD/0AD/zwD/zwD/zwD/zwD/0ACtkBA/OybkuwUkJisyMShbUSBzYxvxxQKEcRiRexW7mg4yMSmDcBmfhRNNRiRNRiPIpQvWsQirkYVxAAAAC3RSTlMA798gn8+/UEAwoLyXPrUAAAChSURBVBjTPU9ZFoQwCEOttlro6jrL/a85A1jzk5DHIwQEzvTej8ZCwzD5G/2gztz5B90sO+ogqsd7PauwHlQCqwnAikOUCyXxHBgmjAGxppW1gZHpil/ElgpClei91tsDpVAoxk01BwpwO9UbYWHad/7rlfW8YzpTQAypsLYAk/wViQ4KHNgKBcz5qlroqb1/ntq8J6lScIAGu4z/K8bJ8AMHAAw3NPWaiAAAAABJRU5ErkJggg=="
                />
                <span className="font-extrabold text-brand">+500.00</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

