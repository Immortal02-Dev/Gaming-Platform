import Link from "next/link";

export default function LatestRoundRace() {
  return (
    <>
      <div className="mt-2 flex items-center sm:mt-6 mb-0! h-10">
        <h2 className="flex items-center text-base font-extrabold text-primary">
          Latest round & Race
        </h2>
        <span className="ml-auto" />
      </div>

      <div
        className="scroll-x tabs-title hide-scroll ml-auto mt-2 max-w-100 sm:-mt-10!"
        style={
          {
            ["--tabs-indicator-position" as any]: "0%",
            ["--tabs-width" as any]: "133px",
          } as React.CSSProperties
        }
      >
        <button aria-selected="true" className="tabs-btn btn-like">
          Latest Bet
        </button>
        <button className="tabs-btn btn-like">High Roller</button>
        <button className="tabs-btn btn-like">Wager Contest</button>
        <div className="tabs-indicator" />
      </div>

      <div
        className="tabs-content my-3 min-h-96 rounded-xl"
        style={{
          opacity: "1",
        }}
      >
        <div className="relative overflow-hidden text-secondary">
          <table
            className="table [&_td]:px-3 [&_td]:py-3 sm:[&_td]:px-4 w-full table-fixed"
            style={{
              overflowAnchor: "none",
            }}
          >
            <thead>
              <tr>
                <td className="w-[30%] sm:w-auto">Game</td>
                <td>Player</td>
                <td>Bet Amount</td>
                <td className="w-24 sm:w-auto">Multiplier</td>
                <td>Profit</td>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728191542981566"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Joker's Fortune</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/98917730"
                  >
                    Nilda22
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩190</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/ARS.rect.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">0.00x</td>
                <td className="w-30 text-secondary">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">-₩190</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/ARS.rect.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728191169005247"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Mahjong Ways 2</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/58579725"
                  >
                    Kaeka89
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩103</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/IDR.rect.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">0.00x</td>
                <td className="w-30 text-secondary">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">-₩103</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/IDR.rect.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728187585378494"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Duel at Dawn</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/8503803"
                  >
                    Pierdol
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩144</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/DOGS.black.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">0.09x</td>
                <td className="w-30 text-secondary">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">-₩129</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/DOGS.black.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728190186208701"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Volcano Rising</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/97931651"
                  >
                    97931651murshed
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩1,030</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/PKR.rect.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">0.00x</td>
                <td className="w-30 text-secondary">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">-₩1,030</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/PKR.rect.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728190093091519"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/Roulette-CKFJY2up.png"
                    />
                    <span className="ellipsis">Roulette</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/3425469"
                  >
                    Elimpostor
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩143</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/BCD.black.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">0.00x</td>
                <td className="w-30 text-secondary">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">-₩143</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/BCD.black.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728189454462911"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Sugar Fiesta 1000</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/103242446"
                  >
                    McNoPa
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩863</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/SOL.black.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">0.00x</td>
                <td className="w-30 text-secondary">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">-₩863</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/SOL.black.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728124234787263"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Dead or Alive 2</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/71658298"
                  >
                    Beuqbfjygucc
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩171</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/DOGE.black.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">2.00x</td>
                <td className="w-30 text-brand">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">+₩171</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/DOGE.black.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728189025348797"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/Roulette-CKFJY2up.png"
                    />
                    <span className="ellipsis">Roulette</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/72078404"
                  >
                    Oceansviews
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩33,467</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/BCD.black.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">0.00x</td>
                <td className="w-30 text-secondary">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">-₩33,467</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/BCD.black.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728168443864509"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Sugar Rush</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <span className="text-secondary">Hidden</span>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩865</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/THB.rect.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">2.15x</td>
                <td className="w-30 text-brand">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">+₩994</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/THB.rect.png"
                    />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-layer5-table">
                <td className="w-[30%] sm:w-auto">
                  <Link
                    className="ellipsi flex items-center text-primary hover:underline inactive"
                    href="/game-detail/1855728179999996863"
                  >
                    <img
                      className="mr-1 inline-block w-5"
                      src="https://bc.game/assets/BlackJack-eZoANKaD.png"
                    />
                    <span className="ellipsis">Buffalo Blaze: Wild Wealth</span>
                  </Link>
                </td>
                <td className="ellipsis text-primary">
                  <Link
                    className="hover:underline inactive"
                    href="/user/profile/100093021"
                  >
                    Timmy5621
                  </Link>
                </td>
                <td>
                  <div className="center">
                    <span className="overflow-hidden text-nowrap">₩2,812</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/BTC.black.png"
                    />
                  </div>
                </td>
                <td className="w-24 sm:w-auto">5.38x</td>
                <td className="w-30 text-brand">
                  <div className="flex items-center justify-end">
                    <span className="text-nowrap">+₩12,333</span>
                    <img
                      className="ml-1 h-5 flex-none"
                      src="https://bc.game/coin/BTC.black.png"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
