import { Montserrat, Poppins } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "900"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "900"],
});

export const Laviossa = localFont({
  src: "./fonts/Laviossa-Medium.otf",
});

export const GoodTimes = localFont({
  src: "./fonts/Good Times Rg.otf",
});
