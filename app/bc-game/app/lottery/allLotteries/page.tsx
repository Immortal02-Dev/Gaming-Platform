import { LotteryCard } from "@/components/modules/lottery/LotteryCard";
import { LotteryItem } from "@/types/game";
import Countries from "@/public/assets/images/flag/countries.png";
import LotteryLogo from "@/public/assets/images/substation/lottery/logo.webp";

export default function LotteryAllLotteries() {
  const lotteries: LotteryItem[] = [
    {
      id: 1,
      title: "5 De Oro 5/48",
      drawTime: "16h 16m 37s",
      prize: "₩1,327,172",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-937px" },
      buttons: ["Bet 2 balls", "Bet 3 balls"],
    },
    {
      id: 2,
      title: "5 De Oro 5/48",
      drawTime: "12h 05m 10s",
      prize: "₩1,327,172",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-265px" },
      buttons: ["Bet 2 balls", "Bet 3 balls"],
    },
    {
      id: 3,
      title: "All or Nothing Day Texas 12/24",
      drawTime: "08h 22m 15s",
      prize: "₩5,500,000",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-961px" },
      buttons: ["Bet 2 balls", "Bet 3 balls"],
    },
    {
      id: 4,
      title: "BC Lottery Jackpot",
      drawTime: "1d 04h 20m",
      prize: "₩147,463K",
      iconSrc: LotteryLogo,
      isExclusive: true,
      buttons: ["Bet Now"],
    },
    {
      id: 5,
      title: "Mega Millions USA",
      drawTime: "05h 10m 45s",
      prize: "₩950,000,000",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-97px" },
      buttons: ["Quick Pick", "Manual"],
    },
    {
      id: 6,
      title: "EuroJackpot",
      drawTime: "22h 15m 00s",
      prize: "€45,000,000",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-432px" },
      buttons: ["Play Now"],
    },
    {
      id: 7,
      title: "Powerball NY",
      drawTime: "02h 45m 30s",
      prize: "$1.2 Billion",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-530px" },
      buttons: ["Bet 1 ball", "Bet 5 balls"],
    },
    {
      id: 8,
      title: "SuperEnalotto",
      drawTime: "18h 30m 12s",
      prize: "₩2,800,000",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-122px" },
      buttons: ["Bet Now"],
    },
    {
      id: 9,
      title: "Lotto 6/49 Canada",
      drawTime: "10h 00m 00s",
      prize: "₩7,250,000",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-770px" },
      buttons: ["Bet 2 balls", "Bet 3 balls"],
    },
    {
      id: 10,
      title: "Thunderball UK",
      drawTime: "01h 55m 40s",
      prize: "£500,000",
      iconSrc: Countries,
      iconStyle: { left: "-1px", top: "-937px" },
      buttons: ["Quick Bet"],
    },
  ];

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="min-h-screen">
        <div className="allLotteriesPageWrap mt-4 sm:mt-0 bg-layer2">
          <div className="top-box flex justify-between flex-col gap-5 pb-4 sticky sm:top-14 top-0 pt-4 -mt-4 z-20 bg-layer2">
            <h1 className="text-lg font-extrabold text-primary ">
              All Lotteries
            </h1>
          </div>

          <div className="min-h-52">
            <div className="relative grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {lotteries.map((lottery) => (
                <LotteryCard key={lottery.id} {...lottery} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

