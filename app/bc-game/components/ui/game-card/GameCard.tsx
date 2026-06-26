import React from "react";
import Link from "next/link";
import { Game } from "@/types/game";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div>
      <Link
        href={game.href}
        className="game-item group relative flex size-full flex-col items-center overflow-hidden rounded-lg transition-all hover:-translate-y-2"
      >
        <img className="w-full" alt={game.title} src={game.image} />

        {game.isNew && (
          <div className="explore-show absolute top-1 left-1 hidden rounded-md px-1 py-0.5 text-xs font-extrabold shadow-sm shadow-alw_dark/50 text-alw_white bg-[#E31351] group-hover:block z-10">
            New
          </div>
        )}

        <div className="absolute bottom-1 right-1 flex h-5 items-center rounded-md bg-black_alpha20 px-1.5">
          <div className="icon size-4! fill-alw_white">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.1137 20.6693C26.6674 23.8341 24.4618 26.132 21.3885 26.6484C18.4196 27.1469 13.5818 27.1469 10.6138 26.6484C7.5397 26.132 5.3341 23.8349 5.88853 20.6702C6.35798 17.9846 8.63481 16.3107 11.4143 16.4548C13.4451 16.56 14.6923 16.8239 16.1371 16.8239C17.5981 16.8239 18.5718 16.5592 20.588 16.4548C23.3674 16.3091 25.6443 17.9838 26.1137 20.6693ZM16.1007 4.66211C19.021 4.66211 21.3885 7.02959 21.3885 9.9499C21.3885 12.8702 19.021 15.2377 16.1007 15.2377C13.1804 15.2377 10.8121 12.8694 10.8121 9.9499C10.8121 7.0304 13.1796 4.66211 16.1007 4.66211Z"></path>
            </svg>
          </div>
          <span className="text-xs font-semibold text-alw_white">
            {game.userCount}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="center absolute left-0 top-0 h-full w-full cursor-pointer bg-[#00000099] opacity-0 group-hover:opacity-100">
          <div className="center absolute left-0 top-0 flex h-[40%] w-full px-2 text-center font-extrabold leading-4 text-[white]">
            {game.title}
          </div>
          <div className="center flex h-9 w-9 rounded-full bg-white_alpha20 transition-all duration-300 group-hover:scale-150">
            <div className="icon size-full! fill-alw_white">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.9106 13.9439L13.964 6.44441C13.5849 6.18474 13.1412 6.03268 12.681 6.0047C12.2209 5.97673 11.7617 6.07391 11.3534 6.28572C10.945 6.49753 10.603 6.81589 10.3645 7.2063C10.1259 7.59671 9.99987 8.04429 10 8.50052V23.4995C9.99987 23.9557 10.1259 24.4033 10.3645 24.7937C10.603 25.1841 10.945 25.5025 11.3534 25.7143C11.7617 25.9261 12.2209 26.0233 12.681 25.9953C13.1412 25.9673 13.5849 25.8153 13.964 25.5556L24.9106 18.0561C25.2467 17.8261 25.5214 17.5189 25.7111 17.1608C25.9009 16.8027 26 16.4044 26 16C26 15.5956 25.9009 15.1973 25.7111 14.8392C25.5214 14.4811 25.2467 14.1739 24.9106 13.9439Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
