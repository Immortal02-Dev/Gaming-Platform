import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/lib/useFavorites";

interface OutcomeOdds {
  name: string;
  value: string | number;
}

interface Team {
  name: string;
  logo: string;
  score?: number | string;
}

export interface SportCardProps {
  id?: string;
  sport?: string;
  country?: string;
  league?: string;
  teams?: Team[];
  status?: string;
  isLive?: boolean;
  isFavorite?: boolean;
  href?: string;
  marketName?: string;
  outcomes?: OutcomeOdds[];
  hasPlayerProps?: boolean;
  hasBetBuilder?: boolean;
}

const DEFAULT_MOCK: Required<
  Pick<
    SportCardProps,
    | "sport"
    | "country"
    | "league"
    | "teams"
    | "status"
    | "href"
    | "marketName"
    | "outcomes"
  >
> &
  SportCardProps = {
  sport: "soccer",
  country: "Italy",
  league: "Serie A",
  teams: [
    {
      name: "Como 1907",
      logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2704.png",
      score: 1,
    },
    {
      name: "AC Milan",
      logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1643.png",
      score: 0,
    },
  ],
  status: "Tomorrow, 03:45",
  isLive: false,
  isFavorite: false,
  href: "/sports/soccer/italy/serie-a/como-1907-ac-milan-2621331054107168783",
  marketName: "1x2",
  outcomes: [
    { name: "1", value: "2.92" },
    { name: "draw", value: "3.15" },
    { name: "2", value: "2.48" },
  ],
  hasPlayerProps: true,
  hasBetBuilder: true,
};

export default function SportCard(props: SportCardProps) {
  const {
    sport = DEFAULT_MOCK.sport,
    country = DEFAULT_MOCK.country,
    league = DEFAULT_MOCK.league,
    teams = DEFAULT_MOCK.teams,
    status = DEFAULT_MOCK.status,
    isLive = DEFAULT_MOCK.isLive,
    isFavorite = DEFAULT_MOCK.isFavorite,
    href = DEFAULT_MOCK.href,
    marketName = DEFAULT_MOCK.marketName,
    outcomes = DEFAULT_MOCK.outcomes,
    hasPlayerProps = DEFAULT_MOCK.hasPlayerProps,
    hasBetBuilder = DEFAULT_MOCK.hasBetBuilder,
  } = props;

  const { toggleFavorite, isFavorite: checkFavorite } = useFavorites();
  const favorited = props.id ? checkFavorite(props.id) : isFavorite;

  return (
    <div className="min-w-0 justify-stretch">
      <div className="relative h-51 align-top">
        <div className="sport-card__details" data-editor-id="eventCard">
          <div className="relative flex text-[10px] px-2">
            <div className="sport-card__category">
              <div
                data-editor-id="eventCardCategory"
                className="sport-category__head"
              >
                <div className="sport-head__title">
                  <span className="inline-block me-1">
                    <svg
                      data-cy={`sport-${sport}`}
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="block"
                      style={{
                        fill: "currentcolor",
                        color: "inherit",
                        width: "auto",
                        height: "16px",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.04 21.3793C12.368 22.0323 13.8288 22.393 15.3425 22.4261L17.8734 19.5272C17.9026 17.8165 17.5076 16.1267 16.7246 14.6139L11.7195 13.4485C10.675 14.4949 9.86495 15.7551 9.35078 17.1439L11.04 21.3793ZM10.7764 22.204L9.08458 23.6141C10.9111 25.274 13.3374 26.2857 16 26.2857C16.511 26.2857 17.0133 26.2485 17.5043 26.1765L15.3359 23.2833C13.7356 23.25 12.1884 22.8783 10.7764 22.204ZM5.7343 16.6469H8.62297C9.20019 15.1755 10.086 13.8441 11.2164 12.7406V9.62205C10.2129 9.37945 9.1786 9.29054 8.14698 9.35692C6.6294 11.1491 5.71429 13.4677 5.71429 16C5.71429 16.2173 5.72102 16.433 5.7343 16.6469ZM22.9116 19.3483C23.8049 18.4384 24.5225 17.3714 25.0254 16.2017L23.6597 11.542C22.5016 10.9523 21.2395 10.587 19.9272 10.4698L17.6048 14.4567C18.3 15.8824 18.6825 17.4437 18.7275 19.033L22.9116 19.3483ZM23.4088 20.0636V23.1348C25.0358 21.4457 26.0906 19.2017 26.2613 16.7145L25.7741 16.6293C25.2096 17.9111 24.4065 19.0765 23.4088 20.0636ZM23.9985 9.53268C22.4866 7.66509 20.3338 6.33759 17.8747 5.88473C17.5281 6.28981 17.2149 6.71981 16.9371 7.17124L19.7454 9.596C21.1338 9.68779 22.4749 10.0354 23.7142 10.6149L23.9985 9.53268ZM16.0845 6.92604C16.3235 6.51838 16.5885 6.12608 16.8785 5.75128C16.5889 5.72678 16.2959 5.71429 16 5.71429C13.2876 5.71429 10.8204 6.76421 8.98261 8.47983C9.78915 8.49238 10.5923 8.59246 11.3784 8.77945C11.4114 8.75319 11.4487 8.73155 11.4894 8.71569L16.0845 6.92604ZM16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28Z"
                      />
                    </svg>
                  </span>
                  <span className="flex items-center overflow-hidden break-all tracking-wider text-xs leading-4 h-4">
                    {country}
                    <span className="flex-none mx-1 opacity-50">-</span>
                    {league}
                  </span>
                </div>
              </div>
            </div>
            <div className="sport-card__category">
              <div className="flex items-center ml-1">
                <div className="block items-center pointer-events-auto align-middle ml-4 first:ml-0">
                  <span
                    className="cursor-pointer block align-middle h-4"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (props.id) {
                        toggleFavorite(props.id);
                      }
                    }}
                  >
                    <svg
                      data-cy="favorite"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn(
                        favorited ? "opacity-100" : "opacity-[0.3]",
                      )}
                      style={{
                        fill: "currentcolor",
                        color: favorited
                          ? "rgb(255, 190, 3)"
                          : "var(--sport-favotire_color)",
                        width: "auto",
                        height: "16px",
                      }}
                    >
                      <path d="M7.76043 2.16184C7.84134 1.94605 8.15866 1.94605 8.23957 2.16184L9.578 5.73142C9.61341 5.82584 9.70513 5.88993 9.80944 5.89314L13.753 6.01428C13.9914 6.0216 14.0895 6.31184 13.9011 6.45253L10.7847 8.77979C10.7023 8.84135 10.6672 8.94505 10.6963 9.04146L11.7951 12.6859C11.8616 12.9062 11.6048 13.0856 11.4075 12.9568L8.14304 10.8255C8.05669 10.7691 7.94331 10.7691 7.85696 10.8255L4.5925 12.9568C4.39516 13.0856 4.13844 12.9062 4.20486 12.6859L5.3037 9.04146C5.33277 8.94505 5.29773 8.84135 5.2153 8.77979L2.09891 6.45253C1.91052 6.31184 2.00858 6.0216 2.24698 6.01428L6.19056 5.89314C6.29487 5.88993 6.38659 5.82584 6.422 5.73142L7.76043 2.16184Z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Link
            className="sport-card__link"
            data-editor-id="eventCardContent"
            href={href || "#"}
          >
            <div className="flex gap-1 h-4 pointer-events-none">
              <div className="flex" style={{ flex: "0 0 auto" }}>
                <div
                  data-editor-id="eventCardStatusLabel"
                  className="sports-card__StatusLabel"
                >
                  <div
                    className="sports-card__StatusText"
                    data-editor-id="eventCardStatusLabel"
                  >
                    {status}
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-1 gap-1">
                {hasPlayerProps && (
                  <svg
                    data-editor-id="playerPropsLabel"
                    data-cy="player-props"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-1x10e4w-1 cBKOGh bt1557"
                    style={{
                      fill: "currentcolor",
                      color: "rgb(33, 168, 247)",
                      width: "auto",
                      height: "16px",
                    }}
                  >
                    <g clipPath="url(#clip0_684_298)">
                      <path d="M8.75791 7.55997H7.36843V6.19997H8.75791C9.15323 6.19997 9.4737 6.50442 9.4737 6.87997C9.4737 7.25553 9.15323 7.55997 8.75791 7.55997Z"></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29505 1.91671C5.21096 1.72006 5.01216 1.60023 4.80183 1.59998C4.75855 1.59987 4.71455 1.60482 4.67065 1.6153L2.53732 2.12438C2.44354 2.14676 2.3579 2.19305 2.28955 2.25829L0.156214 4.29463C-0.0359493 4.47806 -0.0528933 4.77007 0.116874 4.97263L2.25021 7.51806C2.42303 7.72426 2.73233 7.7701 2.96251 7.62362L3.73333 7.1331V13.8909C3.73333 14.172 3.97211 14.4 4.26667 14.4H11.7333C12.0279 14.4 12.2667 14.172 12.2667 13.8909V7.1331L13.0375 7.62362C13.2677 7.7701 13.577 7.72426 13.7498 7.51806L15.8831 4.97263C16.0529 4.77007 16.036 4.47806 15.8438 4.29463L13.7105 2.25829C13.6421 2.19305 13.5565 2.14676 13.4627 2.12438L11.349 1.62C11.2995 1.6063 11.2492 1.59981 11.1996 1.59998C10.9793 1.59999 10.7773 1.73121 10.6996 1.93292L10.6939 1.94378C10.68 1.96987 10.6554 2.01266 10.6178 2.06676C10.5428 2.17498 10.4169 2.3272 10.2227 2.4821C9.84264 2.78505 9.1646 3.12737 8.00131 3.12737C6.83802 3.12737 6.15998 2.78505 5.77997 2.4821C5.58568 2.3272 5.45986 2.17498 5.38478 2.06676C5.34725 2.01266 5.32262 1.96987 5.3087 1.94378C5.30176 1.93076 5.29685 1.92054 5.29505 1.91671ZM6.10528 4.99997V10.4H7.36843V8.75997H8.75791C9.85085 8.75997 10.7369 7.91827 10.7369 6.87997C10.7369 5.84168 9.85085 4.99997 8.75791 4.99997H6.10528Z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_684_298">
                        <rect width="16" height="16"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                )}
                {hasBetBuilder && (
                  <svg
                    data-editor-id="betBuilderLabel"
                    data-cy="bet-builder"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sc-1x10e4w-1 cBKOGh bt1558"
                    style={{
                      fill: "currentcolor",
                      color: "rgb(33, 168, 247)",
                      width: "auto",
                      height: "16px",
                    }}
                  >
                    <path d="M7.33263 2C6.62253 2 6.04688 2.57565 6.04688 3.28575V4.14292C6.04688 4.85303 6.62253 5.42868 7.33263 5.42868H12.4756C13.1857 5.42868 13.7614 4.85303 13.7614 4.14292V3.28575C13.7614 2.57565 13.1857 2 12.4756 2H7.33263Z"></path>
                    <path d="M3.47266 7.5714C3.47266 6.8613 4.04831 6.28564 4.75841 6.28564H9.90143C10.6115 6.28564 11.1872 6.8613 11.1872 7.5714V8.42857C11.1872 9.13867 10.6115 9.71432 9.90143 9.71432H4.75841C4.04831 9.71432 3.47266 9.13867 3.47266 8.42857V7.5714Z"></path>
                    <path d="M0.902344 11.857C0.902344 11.1469 1.478 10.5713 2.1881 10.5713H7.33111C8.04122 10.5713 8.61687 11.1469 8.61687 11.857V12.7142C8.61687 13.4243 8.04122 14 7.33111 14H2.1881C1.478 14 0.902344 13.4243 0.902344 12.7142V11.857Z"></path>
                  </svg>
                )}
              </div>

              {isLive && (
                <div
                  className="flex items-center ml-1 pointer-events-none ms-0 me-2"
                  style={{ flex: "0 0 auto" }}
                >
                  <svg
                    data-cy="ic-live-simple"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#FF4E4E"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      display: "block",
                      fill: "rgb(205, 48, 48)",
                      color: "rgb(205, 48, 48)",
                      width: "auto",
                      height: "16px",
                    }}
                  >
                    <path d="M12.9628 3.20912C12.6766 2.93029 12.2125 2.93029 11.9263 3.20912C11.6401 3.48794 11.6401 3.94001 11.9263 4.21883C12.436 4.71538 12.8404 5.30487 13.1163 5.95365C13.3921 6.60242 13.5341 7.29777 13.5341 8C13.5341 8.70223 13.3921 9.39758 13.1163 10.0464C12.8404 10.6951 12.436 11.2846 11.9263 11.7812C11.6401 12.06 11.6401 12.5121 11.9263 12.7909C12.2125 13.0697 12.6766 13.0697 12.9628 12.7909C13.6087 12.1617 14.121 11.4148 14.4706 10.5928C14.8201 9.77079 15 8.88975 15 8C15 7.11025 14.8201 6.22921 14.4706 5.40719C14.121 4.58517 13.6087 3.83827 12.9628 3.20912Z"></path>
                    <path d="M10.0422 5.11529C10.3284 4.83647 10.7925 4.83647 11.0787 5.11529C11.4708 5.49724 11.7818 5.95068 11.994 6.44972C12.2062 6.94876 12.3155 7.48363 12.3155 8.02379C12.3155 8.56395 12.2062 9.09881 11.994 9.59786C11.7818 10.0969 11.4708 10.5503 11.0787 10.9323C10.7925 11.2111 10.3284 11.2111 10.0422 10.9323C9.75595 10.6535 9.75595 10.2014 10.0422 9.92257C10.2982 9.67322 10.5012 9.37719 10.6397 9.0514C10.7783 8.72561 10.8496 8.37642 10.8496 8.02379C10.8496 7.67115 10.7783 7.32197 10.6397 6.99617C10.5012 6.67038 10.2982 6.37436 10.0422 6.12501C9.75595 5.84618 9.75595 5.39412 10.0422 5.11529Z"></path>
                    <path d="M8.05198 9.51147C8.90891 9.51147 9.60359 8.83477 9.60359 8.00002C9.60359 7.16526 8.90891 6.48856 8.05198 6.48856C7.19504 6.48856 6.50036 7.16526 6.50036 8.00002C6.50036 8.83477 7.19504 9.51147 8.05198 9.51147Z"></path>
                    <path d="M6.05604 5.11529C5.76981 4.83647 5.30574 4.83647 5.0195 5.11529C4.62741 5.49724 4.31638 5.95068 4.10418 6.44972C3.89198 6.94876 3.78276 7.48363 3.78276 8.02379C3.78276 8.56395 3.89198 9.09881 4.10418 9.59786C4.31638 10.0969 4.62741 10.5503 5.0195 10.9323C5.30574 11.2111 5.76981 11.2111 6.05604 10.9323C6.34228 10.6535 6.34228 10.2014 6.05604 9.92257C5.80007 9.67322 5.59702 9.37719 5.45848 9.0514C5.31995 8.72561 5.24865 8.37642 5.24865 8.02379C5.24865 7.67115 5.31995 7.32197 5.45848 6.99617C5.59702 6.67038 5.80007 6.37436 6.05604 6.12501C6.34228 5.84618 6.34228 5.39412 6.05604 5.11529Z"></path>
                    <path d="M3.03717 3.20912C3.3234 2.93029 3.78748 2.93029 4.07371 3.20912C4.35994 3.48794 4.35994 3.94001 4.07371 4.21883C3.56397 4.71538 3.15962 5.30487 2.88375 5.95365C2.60788 6.60242 2.46589 7.29777 2.46589 8C2.46589 8.70223 2.60788 9.39758 2.88375 10.0464C3.15962 10.6951 3.56397 11.2846 4.07371 11.7812C4.35994 12.06 4.35994 12.5121 4.07371 12.7909C3.78748 13.0697 3.3234 13.0697 3.03717 12.7909C2.39131 12.1617 1.87898 11.4148 1.52944 10.5928C1.1799 9.77078 1 8.88975 1 8C1 7.11025 1.1799 6.22921 1.52944 5.40719C1.87898 4.58517 2.39131 3.83827 3.03717 3.20912Z"></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="relative flex flex-1 pointer-events-none mt-3 overflow-hidden">
              <div className="flex-1 font-semibold">
                {teams.map((team, index) => (
                  <div key={index} className="flex items-center mb-2 last:mb-0">
                    <div className="flex items-center gap-2 h-6 relative text-sm leading-6 flex-1">
                      <div className="relative block flex-none size-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={team.name}
                          height={24}
                          width={24}
                          className="block object-contain size-6 rounded-sm"
                          src={team.logo}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(team.name)}&size=48&background=1a472a&color=fff&bold=true&length=2`;
                          }}
                        />
                      </div>
                      <div className="sport-card__cname h-6 leading-6 truncate">
                        {team.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {isLive && (
                <div className="font-semibold flex-none">
                  <div
                    data-editor-id="widgetScore"
                    className="sport-card__score"
                  >
                    {teams.map((team, index) => (
                      <div key={index} className="sport-card__scoreBox">
                        <span>{team.score ?? 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Link>
          <div>
            <div
              className="sport-card__marketTitle w-auto ps-2! text-start!"
              data-editor-id="simpleMarketTitle"
            >
              <div className="sport-card__marketName">{marketName}</div>
            </div>
            <div className="flex items-end gap-2 mt-2">
              <div className="relative" style={{ flex: "1 1 0%" }}>
                <div
                  className={cn(
                    "w-full grid gap-2",
                    outcomes.length === 2 ? "grid-cols-2" : "grid-cols-3",
                  )}
                >
                  {outcomes.map((outcome, index) => (
                    <div
                      key={index}
                      data-editor-id="outcomePlate"
                      className="sports-card__outcomePlate h-10!"
                    >
                      <div className="bt1575"></div>
                      <div
                        data-editor-id="outcomePlateName"
                        className="sports-card__outcomeName"
                      >
                        <span className="overflow-hidden break-all h-[14.4px]">
                          {outcome.name}
                        </span>
                      </div>
                      <div
                        className="overflow-hidden h-[14.4px] flex flex-col self-center leading-[1.2] text-end text-xs font-semibold"
                        style={{ flex: "0 0 auto" }}
                      >
                        <span>{outcome.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sport-card__marketToggle">
                <div
                  className="sport-card__ToggleIcon opacity-[0.5]"
                  style={{ width: "16px", height: "16px" }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
