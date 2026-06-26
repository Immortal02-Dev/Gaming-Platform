import { StaticImageData } from "next/image";

export interface Game {
  id: string | number;
  title: string;
  image: string;
  href: string;
  userCount: number;
  isNew?: boolean;
}

export interface Banner {
  id: string | number;
  title?: string;
  description?: string;
  image: string;
  href: string;
  buttonText?: string;
  gradientColor?: string;
  badgeImage?: string;
  isPromo?: boolean; // Para sa mga banner na may "Learn More" logic
}

export interface LotteryItem {
  id: number | string;
  title: string;
  drawTime: string;
  prize: string;
  iconSrc: StaticImageData;
  iconStyle?: React.CSSProperties; // Para sa mga flag na kailangan ng offset
  isExclusive?: boolean;
  buttons: string[];
}
