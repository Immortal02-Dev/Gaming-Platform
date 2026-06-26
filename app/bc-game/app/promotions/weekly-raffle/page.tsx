import Image from "next/image";

import ImgRaffleCard from "@/public/assets/images/substation/platform/card2.webp";
import ImgTicket from "@/public/assets/images/substation/platform/ticket.webp";
import ImgTickerMore from "@/public/assets/images/substation/platform/ticket_more.webp";

import ImgTickets from "@/public/assets/images/substation/platform/tickets.webp";
import ImgHat from "@/public/assets/images/substation/platform/hat.webp";
import ImgCoin from "@/public/assets/images/substation/platform/coin.webp";

import ImgEmpty from "@/public/assets/images/substation/bc/common/empty_w.webp";

import RaffleRules from "@/components/ui/accordion/RaffleRules";
import Faq from "@/components/ui/accordion/Faq";

export default function WeekRaffle() {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312 ">
      <div className="py-2.5 pr-2.5 max-sm:bg-layer1">
        <div className="block md:flex md:justify-start md:items-center">
          <div className="text-lg text-primary font-extrabold bas shrink-0 grow-0 basis-56 hidden md:flex">
            Weekly Raffle
          </div>
          <div className="flex justify-between text-sm shrink-0">
            <p className="text-secondary">
              Game ID:
              <span className="font-extrabold text-primary">
                20260126120000
              </span>
            </p>
            <div className="cursor-pointer text-brand sm:ml-6 sm:mr-2.5">
              How To Play?
            </div>
          </div>
          <div className="flex carousels-enter-wrap flex-auto">
            {/* <div data-keen-slider-v="" className="carousels">
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -489.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/99371685/s"
                />
                <span className="font-extrabold text-primary">
                  Lyivjhhisycc
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -479.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/100024122/s"
                />
                <span className="font-extrabold text-primary">IgorLavcel</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -469.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/10850872/s"
                />
                <span className="font-extrabold text-primary">Editoll</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -459.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/10850872/s"
                />
                <span className="font-extrabold text-primary">Editoll</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -449.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/73824549/s"
                />
                <span className="font-extrabold text-primary">Robby21</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -439.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/73044675/s"
                />
                <span className="font-extrabold text-primary">Mbe2025</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -429.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/73044675/s"
                />
                <span className="font-extrabold text-primary">Mbe2025</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -419.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/11899341/s"
                />
                <span className="font-extrabold text-primary">MaxxWiin</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -409.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/7440613/s"
                />
                <span className="font-extrabold text-primary">
                  IrfanChaudhary86
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -399.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/12276704/s"
                />
                <span className="font-extrabold text-primary">
                  Ahmed khan🥰
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -389.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/65729010/s"
                />
                <span className="font-extrabold text-primary">Baba ki</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -379.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/65729010/s"
                />
                <span className="font-extrabold text-primary">Baba ki</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -369.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/65729010/s"
                />
                <span className="font-extrabold text-primary">Baba ki</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -359.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/79283888/s"
                />
                <span className="font-extrabold text-primary">
                  Xclbsfyywvcc
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -349.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/95372029/s"
                />
                <span className="font-extrabold text-primary">
                  Xqtdbhmecxcc
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -339.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/103150632/s"
                />
                <span className="font-extrabold text-primary">Ranelb15</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -329.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/3660149/s"
                />
                <span className="font-extrabold text-primary">b3rc3bu</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -319.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/102205610/s"
                />
                <span className="font-extrabold text-primary">Hajimi</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -309.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/102205610/s"
                />
                <span className="font-extrabold text-primary">Hajimi</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -299.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/3264970/s"
                />
                <span className="font-extrabold text-primary">Moe1982</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -289.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/30888539/s"
                />
                <span className="font-extrabold text-primary">BrownB</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -279.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/64190256/s"
                />
                <span className="font-extrabold text-primary">
                  DONKEYSDESIGNS
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -269.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/102188491/s"
                />
                <span className="font-extrabold text-primary">
                  jpahfiwecxmjy2rgmg
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -259.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/99402449/s"
                />
                <span className="font-extrabold text-primary">SM2000</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -249.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/100726462/s"
                />
                <span className="font-extrabold text-primary">
                  PixelMonarch9683
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -239.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/99039759/s"
                />
                <span className="font-extrabold text-primary">
                  Zrpcjhkhrycc
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -229.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/100190186/s"
                />
                <span className="font-extrabold text-primary">ikuucewygl</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -219.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/7212341/s"
                />
                <span className="font-extrabold text-primary">Ctjfnvhrkwb</span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -209.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/45340390/s"
                />
                <span className="font-extrabold text-primary">
                  Harshmeetkaur
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
              <div
                className="flex items-center text-xs shrink-0 grow-0 basis-1/2"
                style={{
                  minHeight: "16px",
                  maxHeight: "16px",
                  transform: "translate3d(0px, -199.381px, 0px)",
                }}
              >
                <img
                  className="rounded-full mr-2 w-4"
                  alt=""
                  src="//img2.distributedresourcestorage.com/avatar/83039126/s"
                />
                <span className="font-extrabold text-primary">
                  Edagagwkkwcc
                </span>
                <p className="text-secondary font-semibold ml-1">
                  got<span className="font-extrabold mx-1 text-brand">1</span>
                  ticket
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="py-2.5">
        <div className="">
          <div
            className="relative bg-cover px-4 center rounded-[10px] bg-bottom bg-no-repeat max-sm:h-80 sm:aspect-[4.6] sm:justify-start!"
            style={{
              backgroundImage:
                'url("/assets/images/substation/platform/bg_w.webp")',
            }}
          >
            <div className="relative border border-solid text-center z-20 rounded-2xl border-third bg-black_alpha20 px-7 backdrop-blur-sm max-sm:-top-6 max-sm:w-full sm:px-11 lg:ml-20 lg:max-w-96 bg-[#B0FFD8]/20">
              <Image
                alt="card"
                className="absolute w-4 left-[8%] top-4 z-0"
                src={ImgRaffleCard}
              />
              <div className="absolute left-1/2 -translate-x-1/2 text-2xl font-extrabold text-alw_white -top-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                <h2 className="text-shadow">SUPER LUCKY DRAW</h2>
              </div>
              <div className="border-b border-solid font-extrabold border-white/10 text-4xl text-[#FFE236]">
                <p
                  className="mt-2.5"
                  style={{
                    backgroundImage:
                      "conic-gradient(from -26.52deg at 48.56% 46.69%, #D1B860 0deg, #E1D17C 31.84deg, #FEFFAF 61.18deg, #FEFFAF 78.99deg, #B18A33 111.56deg, #F9EC92 171.3deg, #FFF49A 210.88deg, #BB9231 242.64deg, #AC7D1B 261.9deg, #FEFFAF 293.47deg, #F0E997 339.07deg, #CAAE56 360deg), linear-gradient(0deg, rgba(255, 250, 220, 0.2), rgba(255, 250, 220, 0.2));color:transparent;background-clip:text",
                  }}
                >
                  ₩29,335,862
                </p>
              </div>
              <div className="mt-2 text-xs text-secondary">
                <p className="text-alw_white">Next Draw Starts in</p>
                <div className="border-b py-2 text-2xl font-extrabold text-alw_white border-white/10">
                  4d:1h:45m:47s
                </div>
              </div>
              <button
                className="button button-brand button-m font-extrabol py-0 text-xl text-primary_brand mx-auto my-2 h-12! px-6! leading-normal!"
                type="button"
              >
                Earn ticket
              </button>
              <p className="mb-3 text-xs font-semibold text-alw_white">
                [105155] tickets have been sent this round!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 text-base font-extrabold text-primary">
            <p>How to Earn Ticket</p>
          </div>
          <div className="mb-2 lg:flex lg:items-center lg:space-x-4">
            <div className="mb-2 flex items-center justify-between bg-layer4 h-28 rounded-lg10 px-7 lg:mb-0! lg:w-1/2">
              <div className="h-full">
                <Image className="h-full w-auto" alt="ticket" src={ImgTicket} />
              </div>
              <div className="flex-1 text-sm font-semibold text-secondary ml-5">
                <p className="">
                  Log in &amp; Wager{" "}
                  <span className="text-brand mx-1.5">₩146,679</span>Daily:
                </p>
                <span className="font-extrabold text-primary">+ 1 Ticket</span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between bg-layer4 h-28 rounded-lg10 px-7 lg:mt-0! lg:w-1/2">
              <div className="h-full">
                <Image
                  className="h-full w-auto"
                  alt="ticket"
                  src={ImgTickerMore}
                />
              </div>
              <div className="flex-1 text-sm font-semibold text-secondary ml-5">
                <p className="">
                  <span>Every wager</span>
                  <span className="text-brand mx-1.5">₩1,466,793</span>
                  <span>:</span>
                </p>
                <p className="font-extrabold text-primary">+ 1 Ticket</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="page-tabs">
            <div
              className="scroll-x tabs-title hide-scroll sm:w-64"
              style={
                {
                  "--tabs-width": "128px",
                  "--tabs-indicator-position": "0%",
                } as React.CSSProperties & {
                  [key: `--${string}`]: string | number;
                }
              }
            >
              <button aria-selected="true" className="tabs-btn btn-like">
                My Tickets
              </button>
              <button className="tabs-btn btn-like">Results</button>
              <div className="tabs-indicator"></div>
            </div>
            <div className="tabs-content"></div>
          </div>

          <div className="tab-item-page-wrap">
            <div className="bg-layer4 p-3 rounded-lg10">
              <div className="">
                <div className="relative h-40 border-solid py-4 rounded-[10px] border-brand/20 bg-brand/10 px-5 sm:flex! sm:h-24! sm:border! sm:border-[#2cd97d1a]! lg:items-center">
                  <div className="lg:flex-w-4/6 flex flex-col justify-center lg:w-4/6">
                    <div className="flex h-8 items-center text-sm leading-none">
                      <div className="mr-3">
                        <Image
                          alt="tickets"
                          className="h-auto w-7"
                          src={ImgTickets}
                        />
                      </div>
                      <p className="mr-3 text-secondary">Total tickets:</p>
                      <p className="font-extrabold text-primary">0</p>
                    </div>
                    <div className="flex h-8 items-center">
                      <div className="mr-3">
                        <Image alt="hat" className="h-auto w-5" src={ImgHat} />
                      </div>
                      <p className="mr-3 text-secondary">
                        Total winning tickets:
                      </p>
                      <p className="font-extrabold text-primary">0</p>
                    </div>
                  </div>
                  <div className="relative flex h-full w-full flex-col justify-center -top-4 lg:top-0! lg:h-auto! lg:w-auto">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <Image
                          alt="coin"
                          className="h-auto w-5"
                          src={ImgCoin}
                        />
                      </div>
                      <p className="mr-3 text-secondary">Total Prize won:</p>
                      <p className="text-2xl font-extrabold text-brand">₩0</p>
                    </div>
                  </div>
                  <div className="absolute left-0 w-full border-b top-[60%] lg:left-[60%]! lg:top-0! lg:h-full lg:w-px!"></div>
                  <div className="absolute flex h-6 w-full justify-between -left-1 top-[53%] z-20 lg:left-[60%]! lg:-top-1 lg:h-full lg:w-6">
                    <div className="absolute h-6 w-6 rounded-full bg-layer4 -left-2 lg:-left-3! lg:-top-2"></div>
                    <div className="absolute h-6 w-6 rounded-full bg-layer4 lg:-bottom-4 lg:-left-3"></div>
                  </div>
                </div>
              </div>
              <div className="relative mt-4">
                <div
                  data-type="indicator"
                  className="scroll-x tabs-title hide-scroll mytickets-tab-wrap"
                  style={
                    {
                      "--tabs-width": "397px",
                      "--tabs-indicator-position": "0%",
                    } as React.CSSProperties & {
                      [key: `--${string}`]: string | number;
                    }
                  }
                >
                  <button aria-selected="true" className="tabs-btn btn-like">
                    Active
                  </button>
                  <button className="tabs-btn btn-like">Past</button>
                  <button className="tabs-btn btn-like">My Winnings</button>
                  <div className="tabs-indicator"></div>
                </div>
                <div className="tabs-content"></div>
                <div>
                  <div className="py-2 font-semibold text-secondary">
                    Wager
                    <span className="mx-1 font-extrabold text-primary">
                      ₩146,341
                    </span>
                    to get your daily raffle ticket.
                  </div>
                  <section className="py-10 text-center center flex-col">
                    <Image className="w-48 h-48" alt="Empty" src={ImgEmpty} />
                    <div className="leading-5 mt-4">
                      Stay tuned—something's coming!
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <p className="my-3 text-left text-lg font-extrabold">Raffle Rules</p>
          <RaffleRules />
        </div>

        <div className="">
          <p className="text-lg font-extrabold my-3 text-left">
            Frequently Asked Questions
          </p>
          <Faq />
        </div>
      </div>
    </div>
  );
}

