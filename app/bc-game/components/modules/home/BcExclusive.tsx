import CardCarousel from "@/components/ui/carousel/CardCarousel";

const bc_exclusive = [
  {
    id: "bc1",
    title: "Crash",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc2",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/a09aa93f72.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc3",
    title: "New",
    image: "https://imgxcut.com/game/image/329847a6f1.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  {
    id: "bc4",
    title: "Crash",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc5",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/a09aa93f72.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc6",
    title: "Hash Dice",
    image: "https://imgxcut.com/game/image/e354ed7ebb.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  {
    id: "bc7",
    title: "Crash",
    image: "https://imgxcut.com/game/image/a016f83c71.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc8",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/a09aa93f72.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc9",
    title: "Hash Dice",
    image: "https://imgxcut.com/game/image/a016f83c71.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  {
    id: "bc10",
    title: "Crash",
    image: "https://imgxcut.com/game/image/a016f83c71.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc11",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/a09aa93f72.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc13",
    title: "Hash Dice",
    image: "https://imgxcut.com/game/image/a016f83c71.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  // ...
];

export default function BcExclusive() {
  return (
    <CardCarousel
      title="BC Exclusive"
      games={bc_exclusive}
      sectionId="bc-exclusive-home"
      path="bc-exclusive"
    />
  );
}
