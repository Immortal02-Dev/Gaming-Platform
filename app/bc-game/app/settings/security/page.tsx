"use client";

import Link from "next/link";
import AccountRestrictions from "@/components/shared/modals/AccountRestrictions";
import PhoneVerification from "@/components/shared/modals/PhoneVerification";
import { useState } from "react";

export default function SettingSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full py-4 sm:py-0">
      <div className="w-full rounded-lg bg-layer4 p-3 sm:px-6 sm:py-4">
        <div className="flex h-11 items-center border-b border-third pb-3">
          <span className="text-base font-extrabold">Security Setup</span>
          <div className="ml-auto flex h-5 items-center rounded-lg px-2.5 font-semibold text-alw_dark bg-setting-red">
            Weak
          </div>
        </div>
        <div className="settings-security">
          <div className="settings-security-flex">
            <div className="relative mt-3 w-full border-b border-third p-4 pb-6 sm:rounded-lg sm:border-none sm:bg-layer5">
              <div className="flex items-center justify-between">
                <div className="icon fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0003 22.0875C17.0806 22.0875 17.9564 21.2117 17.9564 20.1314C17.9564 19.0511 17.0806 18.1754 16.0003 18.1754C14.92 18.1754 14.0443 19.0511 14.0443 20.1314C14.0443 21.2117 14.92 22.0875 16.0003 22.0875Z" />
                    <path d="M23.5365 12.7032V11.2032C23.5365 7.96311 22.7565 3.66699 16.0003 3.66699C9.24414 3.66699 8.46412 7.96311 8.46412 11.2032V12.7032C5.10403 13.1232 4 14.8273 4 19.0154V21.2475C4 26.1676 5.50004 27.6676 10.4202 27.6676H21.5805C26.5006 27.6676 28.0006 26.1676 28.0006 21.2475V19.0154C28.0006 14.8273 26.8966 13.1232 23.5365 12.7032ZM16.0003 23.7555C13.9963 23.7555 12.3762 22.1235 12.3762 20.1314C12.3762 18.1274 14.0083 16.5073 16.0003 16.5073C17.9924 16.5073 19.6244 18.1394 19.6244 20.1314C19.6244 22.1355 18.0044 23.7555 16.0003 23.7555ZM10.4202 12.5952C10.3242 12.5952 10.2402 12.5952 10.1442 12.5952V11.2032C10.1442 7.6871 11.1402 5.34704 16.0003 5.34704C20.8605 5.34704 21.8565 7.6871 21.8565 11.2032V12.6072C21.7605 12.6072 21.6765 12.6072 21.5805 12.6072H10.4202V12.5952Z" />
                  </svg>
                </div>
                <div className="icon fill-brand">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27.0023 17.3332C26.67 16.4794 26.67 15.5321 27.0023 14.6783L27.1969 14.1519C27.5384 13.2602 27.5259 12.2716 27.1619 11.3887C26.798 10.5058 26.1101 9.79544 25.2391 9.403L24.7239 9.1398C23.9046 8.76224 23.2469 8.1049 22.8692 7.28599L22.6402 6.77105C22.2476 5.90053 21.5368 5.21298 20.6535 4.84919C19.7702 4.48541 18.7811 4.4729 17.8889 4.81425L17.3623 5.00879C16.508 5.34087 15.5603 5.34087 14.7061 5.00879L14.1795 4.81425C13.2831 4.46268 12.2856 4.46985 11.3944 4.83426C10.5031 5.19868 9.78665 5.89232 9.39381 6.77105L9.13049 7.28599C8.75274 8.1049 8.09507 8.76224 7.27576 9.1398L6.76056 9.36867C5.88961 9.76111 5.20172 10.4715 4.83776 11.3544C4.47379 12.2373 4.46128 13.2258 4.8028 14.1176L4.99743 14.644C5.32968 15.4978 5.32968 16.445 4.99743 17.2988L4.8028 17.8252C4.46128 18.717 4.47379 19.7056 4.83776 20.5885C5.20172 21.4713 5.88961 22.1817 6.76056 22.5742L7.27576 22.803C8.10703 23.1975 8.76628 23.8809 9.13049 24.7255L9.35947 25.2405C9.75211 26.111 10.4629 26.7985 11.3462 27.1623C12.2295 27.5261 13.2185 27.5386 14.1108 27.1973L14.6374 27.0027C15.4916 26.6706 16.4394 26.6706 17.2936 27.0027L17.8202 27.1973C18.7125 27.5386 19.7015 27.5261 20.5848 27.1623C21.4681 26.7985 22.1789 26.111 22.5715 25.2405L22.8005 24.7255C23.1952 23.8947 23.8789 23.2357 24.7239 22.8717L25.2391 22.6428C26.1101 22.2504 26.798 21.54 27.1619 20.6571C27.5259 19.7742 27.5384 18.7857 27.1969 17.8939L27.0023 17.3332ZM20.9801 13.4081L14.5458 19.8392C14.4944 19.894 14.4324 19.9376 14.3634 19.9674C14.2945 19.9972 14.2202 20.0126 14.1451 20.0126C14.07 20.0126 13.9957 19.9972 13.9268 19.9674C13.8579 19.9376 13.7958 19.894 13.7444 19.8392L11.0196 17.1501C10.9659 17.0969 10.9233 17.0336 10.8943 16.9639C10.8652 16.8942 10.8502 16.8194 10.8502 16.7438C10.8502 16.6683 10.8652 16.5935 10.8943 16.5238C10.9233 16.4541 10.9659 16.3908 11.0196 16.3376L11.6264 15.7311C11.6777 15.6764 11.7398 15.6328 11.8087 15.6029C11.8777 15.5731 11.952 15.5577 12.0271 15.5577C12.1022 15.5577 12.1765 15.5731 12.2454 15.6029C12.3143 15.6328 12.3764 15.6764 12.4278 15.7311L14.1451 17.4362L19.5719 12.0121C19.6789 11.9072 19.8228 11.8485 19.9726 11.8485C20.1225 11.8485 20.2663 11.9072 20.3733 12.0121L20.9801 12.6185C21.0816 12.725 21.1382 12.8663 21.1382 13.0133C21.1382 13.1604 21.0816 13.3017 20.9801 13.4081Z" />
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-lg font-extrabold">Change Password</p>
              <p className="mt-2 text-secondary">
                Change your password regularly to keep it unique and secure.
              </p>
              <div className="mt-3 h-10 w-full" />
              <div className="mt-3 w-full sm:absolute sm:bottom-4 sm:left-0 sm:px-4">
                <button
                  className="button button-m w-full setting-button"
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="font-extrabold text-primary">
                    Change Password
                  </span>
                </button>
                {isModalOpen && (
                  <AccountRestrictions onClose={() => setIsModalOpen(false)} />
                )}
              </div>
            </div>
            <div className="relative mt-3 w-full border-b border-third p-4 pb-6 sm:rounded-lg sm:border-none sm:bg-layer5">
              <div className="flex items-center">
                <div className="icon fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.2746 5.33398H9.72598C5.96139 5.33398 3.45166 7.21628 3.45166 11.6083V20.3923C3.45166 24.7844 5.96139 26.6667 9.72598 26.6667H22.2746C26.0392 26.6667 28.5489 24.7844 28.5489 20.3923V11.6083C28.5489 7.21628 26.0392 5.33398 22.2746 5.33398ZM22.8644 12.9761L18.9367 16.1133C18.1085 16.7783 17.0544 17.1046 16.0003 17.1046C14.9462 17.1046 13.8796 16.7783 13.0639 16.1133L9.13619 12.9761C8.73464 12.6498 8.67189 12.0475 8.98561 11.6459C9.31187 11.2444 9.90166 11.1691 10.3032 11.4954L14.2309 14.6325C15.1846 15.398 16.8034 15.398 17.7571 14.6325L21.6848 11.4954C22.0864 11.1691 22.6887 11.2318 23.0024 11.6459C23.3287 12.0475 23.266 12.6498 22.8644 12.9761Z" />
                  </svg>
                </div>
                <div className="icon fill-setting-yellow ml-auto">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0005 4C22.6282 4 28.001 9.37279 28.001 16.0005C28.001 22.6282 22.6282 28.001 16.0005 28.001C9.37279 28.001 4 22.6282 4 16.0005C4 9.37279 9.37279 4 16.0005 4ZM15.8393 20.2572C15.4433 20.2572 15.1193 20.3832 14.8493 20.6352C14.5793 20.8873 14.4533 21.2113 14.4533 21.6073C14.4533 22.0033 14.5793 22.3273 14.8493 22.5793C15.1193 22.8313 15.4433 22.9753 15.8393 22.9753C16.2354 22.9753 16.5594 22.8493 16.8294 22.5973C17.0994 22.3453 17.2434 22.0033 17.2434 21.6073C17.2434 21.2113 17.0994 20.8873 16.8474 20.6352C16.5774 20.3832 16.2354 20.2572 15.8393 20.2572ZM15.7999 8.74019C15.7768 8.74019 15.7536 8.74105 15.7313 8.74191C14.8313 8.77962 14.1327 9.53994 14.1713 10.44L14.5013 18.2506H17.0651L17.4234 10.4391C17.4243 10.4143 17.4251 10.3894 17.4251 10.3645C17.4251 9.46708 16.6974 8.74019 15.8008 8.74019H15.7999Z" />
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-lg font-extrabold">Email Verification</p>
              <p className="mt-2 text-secondary">
                Verify your email address is valid and accessible by you.
              </p>
              <div className="mt-3 h-10 w-full" />
              <div className="mt-3 w-full sm:absolute sm:bottom-4 sm:left-0 sm:px-4">
                <Link
                  href="/user-action/email-bind"
                  className="button button-brand button-m w-full"
                  type="button"
                >
                  <span className="">Verify Email</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="settings-security-flex">
            <div className="relative mt-3 w-full border-b border-third p-4 pb-6 sm:rounded-lg sm:border-none sm:bg-layer5">
              <div className="flex items-center">
                <div className="icon fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.2608 3.5918H10.7384C7.31361 3.5918 6.07275 4.83265 6.07275 8.31945V23.6812C6.07275 27.168 7.31361 28.4089 10.7384 28.4089H21.2484C24.6855 28.4089 25.9264 27.168 25.9264 23.6812V8.31945C25.9264 4.83265 24.6855 3.5918 21.2608 3.5918ZM15.9996 25.0585C14.8084 25.0585 13.8281 24.0783 13.8281 22.8871C13.8281 21.6958 14.8084 20.7156 15.9996 20.7156C17.1908 20.7156 18.1711 21.6958 18.1711 22.8871C18.1711 24.0783 17.1908 25.0585 15.9996 25.0585ZM18.4813 8.86542H13.5179C13.0091 8.86542 12.5872 8.44353 12.5872 7.93478C12.5872 7.42603 13.0091 7.00414 13.5179 7.00414H18.4813C18.99 7.00414 19.4119 7.42603 19.4119 7.93478C19.4119 8.44353 18.99 8.86542 18.4813 8.86542Z" />
                  </svg>
                </div>
                <div className="icon fill-setting-yellow ml-auto">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0005 4C22.6282 4 28.001 9.37279 28.001 16.0005C28.001 22.6282 22.6282 28.001 16.0005 28.001C9.37279 28.001 4 22.6282 4 16.0005C4 9.37279 9.37279 4 16.0005 4ZM15.8393 20.2572C15.4433 20.2572 15.1193 20.3832 14.8493 20.6352C14.5793 20.8873 14.4533 21.2113 14.4533 21.6073C14.4533 22.0033 14.5793 22.3273 14.8493 22.5793C15.1193 22.8313 15.4433 22.9753 15.8393 22.9753C16.2354 22.9753 16.5594 22.8493 16.8294 22.5973C17.0994 22.3453 17.2434 22.0033 17.2434 21.6073C17.2434 21.2113 17.0994 20.8873 16.8474 20.6352C16.5774 20.3832 16.2354 20.2572 15.8393 20.2572ZM15.7999 8.74019C15.7768 8.74019 15.7536 8.74105 15.7313 8.74191C14.8313 8.77962 14.1327 9.53994 14.1713 10.44L14.5013 18.2506H17.0651L17.4234 10.4391C17.4243 10.4143 17.4251 10.3894 17.4251 10.3645C17.4251 9.46708 16.6974 8.74019 15.8008 8.74019H15.7999Z" />
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-lg font-extrabold">
                Phone Number Verification
              </p>
              <p className="mt-2 text-secondary">
                Verify your phone number is valid and accessible by you.
              </p>
              <div className="mt-3 h-10 w-full" />
              <div className="mt-3 w-full sm:absolute sm:bottom-4 sm:left-0 sm:px-4">
                <button
                  className="button button-brand button-m w-full"
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="">Verify Phone Number</span>
                </button>

                {isModalOpen && (
                  <PhoneVerification onClose={() => setIsModalOpen(false)} />
                )}
              </div>
            </div>
            <div className="relative mt-3 w-full border-b border-third p-4 pb-6 sm:rounded-lg sm:border-none sm:bg-layer5">
              <div className="flex items-center justify-between">
                <div className="icon fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.1085 6.2924L17.2892 3.73825C16.5824 3.47788 15.4293 3.47788 14.7226 3.73825L7.90327 6.2924C6.589 6.78835 5.52271 8.3258 5.52271 9.72686V19.7699C5.52271 20.7742 6.17984 22.1009 6.98576 22.696L13.8051 27.7919C15.0078 28.697 16.9792 28.697 18.1819 27.7919L25.0012 22.696C25.8071 22.0885 26.4643 20.7742 26.4643 19.7699V9.72686C26.4767 8.3258 25.4104 6.78835 24.1085 6.2924ZM16.9296 17.0793V20.3402C16.9296 20.8486 16.508 21.2701 15.9997 21.2701C15.4913 21.2701 15.0698 20.8486 15.0698 20.3402V17.0793C13.8175 16.6826 12.9 15.5171 12.9 14.1408C12.9 12.4298 14.2886 11.0411 15.9997 11.0411C17.7107 11.0411 19.0994 12.4298 19.0994 14.1408C19.0994 15.5295 18.1819 16.6826 16.9296 17.0793Z" />
                  </svg>
                </div>
                <div className="icon fill-setting-yellow">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0005 4C22.6282 4 28.001 9.37279 28.001 16.0005C28.001 22.6282 22.6282 28.001 16.0005 28.001C9.37279 28.001 4 22.6282 4 16.0005C4 9.37279 9.37279 4 16.0005 4ZM15.8393 20.2572C15.4433 20.2572 15.1193 20.3832 14.8493 20.6352C14.5793 20.8873 14.4533 21.2113 14.4533 21.6073C14.4533 22.0033 14.5793 22.3273 14.8493 22.5793C15.1193 22.8313 15.4433 22.9753 15.8393 22.9753C16.2354 22.9753 16.5594 22.8493 16.8294 22.5973C17.0994 22.3453 17.2434 22.0033 17.2434 21.6073C17.2434 21.2113 17.0994 20.8873 16.8474 20.6352C16.5774 20.3832 16.2354 20.2572 15.8393 20.2572ZM15.7999 8.74019C15.7768 8.74019 15.7536 8.74105 15.7313 8.74191C14.8313 8.77962 14.1327 9.53994 14.1713 10.44L14.5013 18.2506H17.0651L17.4234 10.4391C17.4243 10.4143 17.4251 10.3894 17.4251 10.3645C17.4251 9.46708 16.6974 8.74019 15.8008 8.74019H15.7999Z" />
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-lg font-extrabold">
                Two-factor authentication
              </p>
              <p className="mt-2 text-secondary">
                Enable Two-factor to protect your account from unauthorized
                access.
              </p>
              <div className="mt-3 h-10 w-full" />
              <div className="mt-3 w-full sm:absolute sm:bottom-4 sm:left-0 sm:px-4">
                <button
                  className="button button-brand button-m w-full"
                  type="button"
                >
                  <span className="">Enable 2FA</span>
                </button>
              </div>
            </div>
          </div>
          <div className="settings-security-flex">
            <div className="relative mt-3 w-full border-b border-third p-4 pb-6 sm:rounded-lg sm:border-none sm:bg-layer5">
              <div className="flex items-center">
                <div className="icon fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0001 3.25262C16.4536 3.25265 16.8994 3.3716 17.2921 3.59833L26.3341 8.68817C26.7303 8.91688 27.0583 9.24705 27.2853 9.64423C27.5122 10.0414 27.6302 10.4915 27.6261 10.9489V11.1296C27.6228 14.6002 26.6975 18.0077 24.9454 21.0036C23.1933 23.9995 20.6768 26.4769 17.6535 28.1813L17.2658 28.4001C16.8785 28.6144 16.4428 28.7259 16.0001 28.7233C15.5487 28.7304 15.1031 28.6187 14.7081 28.4001L14.3204 28.1813C11.302 26.4736 8.79057 23.9953 7.04311 20.9997C5.29563 18.004 4.37492 14.5977 4.37416 11.1296V10.9489C4.37007 10.4916 4.4872 10.0413 4.714 9.64423C4.94096 9.24705 5.26998 8.91688 5.66615 8.68817L14.7081 3.59833C15.1009 3.37162 15.5467 3.25262 16.0001 3.25262ZM13.9347 7.52802C13.5282 7.49968 13.1213 7.57504 12.7511 7.74579C12.381 7.91654 12.0595 8.17766 11.8165 8.50555C11.5736 8.83344 11.4166 9.21723 11.3605 9.62177C11.3044 10.0262 11.3509 10.4382 11.4953 10.82C11.6398 11.2019 11.878 11.5418 12.1876 11.8073C12.4723 12.1164 12.6635 12.5008 12.7384 12.9147L12.7062 19.697C12.6799 20.6526 12.9405 21.5947 13.4542 22.4001C13.8719 23.0196 14.4449 23.5186 15.1154 23.8464C15.8309 24.1994 16.6141 24.3933 17.4113 24.4147C18.3644 24.4412 19.3041 24.1795 20.1076 23.6647C20.7252 23.2458 21.2222 22.6717 21.549 21.9997C21.7902 21.5084 21.9581 20.9836 22.046 20.4431C22.0831 20.2218 22.106 19.9983 22.1154 19.7741C22.087 18.8882 21.8163 18.0272 21.3331 17.2849C20.9069 16.6129 19.8397 15.7409 19.2326 15.7409C18.7776 15.7411 18.7775 16.0456 18.7775 16.0456C18.7776 16.1696 18.8809 16.2705 18.9992 16.3854C19.1076 16.4649 19.1957 16.5694 19.255 16.6901C19.3143 16.811 19.3433 16.9451 19.34 17.0798C19.3357 17.1277 19.3315 17.1737 19.3273 17.2175C19.2381 18.2255 19.4459 18.1172 19.7804 18.8718C19.9034 19.1315 19.9754 19.4128 19.9923 19.6999C19.9859 19.8307 19.9713 19.9614 19.9494 20.0905C19.8956 20.4218 19.7931 20.7433 19.6456 21.0446C19.4837 21.385 19.2351 21.6769 18.9249 21.8903C18.472 22.1699 17.9455 22.3066 17.4142 22.2819C16.9453 22.2596 16.4854 22.1426 16.0626 21.9382C15.7227 21.7765 15.4312 21.5269 15.2189 21.2155C14.9391 20.7605 14.8032 20.2309 14.8283 19.697L14.8644 13.0016C14.9101 12.5532 15.0878 12.1286 15.3742 11.7809C15.6326 11.5526 15.8391 11.2706 15.9806 10.9557C16.0865 10.7198 16.154 10.4689 16.1808 10.2126L16.1945 9.95868C16.1947 9.55023 16.0929 9.14818 15.8976 8.78973C15.7023 8.43144 15.4201 8.12832 15.0773 7.9079C14.7343 7.68746 14.3412 7.55636 13.9347 7.52802ZM14.0021 8.76044C14.2375 8.80739 14.4544 8.92328 14.6242 9.09344C14.794 9.26369 14.9094 9.48133 14.9562 9.71747C15.003 9.95348 14.9797 10.1983 14.8878 10.4206C14.796 10.6429 14.6401 10.8328 14.4406 10.9665C14.2409 11.1002 14.0058 11.1715 13.7658 11.1716C13.4437 11.1716 13.1351 11.0433 12.9074 10.8151C12.6797 10.5869 12.551 10.2775 12.5509 9.95477C12.5509 9.71401 12.6226 9.4782 12.756 9.27802C12.8894 9.07791 13.0791 8.92189 13.3009 8.82977C13.5227 8.73772 13.7667 8.71358 14.0021 8.76044Z" />
                  </svg>
                </div>
                <div className="icon fill-setting-yellow ml-auto">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0005 4C22.6282 4 28.001 9.37279 28.001 16.0005C28.001 22.6282 22.6282 28.001 16.0005 28.001C9.37279 28.001 4 22.6282 4 16.0005C4 9.37279 9.37279 4 16.0005 4ZM15.8393 20.2572C15.4433 20.2572 15.1193 20.3832 14.8493 20.6352C14.5793 20.8873 14.4533 21.2113 14.4533 21.6073C14.4533 22.0033 14.5793 22.3273 14.8493 22.5793C15.1193 22.8313 15.4433 22.9753 15.8393 22.9753C16.2354 22.9753 16.5594 22.8493 16.8294 22.5973C17.0994 22.3453 17.2434 22.0033 17.2434 21.6073C17.2434 21.2113 17.0994 20.8873 16.8474 20.6352C16.5774 20.3832 16.2354 20.2572 15.8393 20.2572ZM15.7999 8.74019C15.7768 8.74019 15.7536 8.74105 15.7313 8.74191C14.8313 8.77962 14.1327 9.53994 14.1713 10.44L14.5013 18.2506H17.0651L17.4234 10.4391C17.4243 10.4143 17.4251 10.3894 17.4251 10.3645C17.4251 9.46708 16.6974 8.74019 15.8008 8.74019H15.7999Z" />
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-lg font-extrabold">Anti-Phishing Code</p>
              <p className="mt-2 text-secondary">
                This feature helps you verify the authenticity of communications
                from BC.GAME
              </p>
              <div className="mt-3 h-10 w-full" />
              <div className="mt-3 w-full sm:absolute sm:bottom-4 sm:left-0 sm:px-4">
                <Link
                  href="/settings/phishing/enter"
                  className="button button-brand button-m w-full"
                  type="button"
                >
                  <span className="font-extrabold">
                    Enable Anti-Phishing Code
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-lg bg-layer4 p-3 mt-3 sm:py-4 sm:px-6 sm:mt-4">
        <div className="flex items-center h-11 border-b border-third pb-3">
          <span className="text-base font-extrabold">Sessions</span>
        </div>
        <div className="mt-3">
          <table className="w-full mt-4 text-secondary setting-table">
            <thead>
              <tr
                className="h-12"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <th className="text-left pl-2 left">Device</th>
                <th>Location</th>
                <th>IP Address</th>
                <th>Last Used</th>
                <th className="text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                className="h-12 text-center"
                style={{
                  background: "transparent",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>SE</span>
                </td>
                <td className="text-primary">
                  <span>193.189.100.200</span>
                </td>
                <td className="text-primary">Online</td>
                <td className="text-right pr-2">
                  <p className="text-primary">In Use</p>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>MY</span>
                </td>
                <td className="text-primary">
                  <span>202.87.221.113</span>
                </td>
                <td className="text-primary">5:40:38 PM</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "transparent",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>NO</span>
                </td>
                <td className="text-primary">
                  <span>185.243.218.233</span>
                </td>
                <td className="text-primary">1/26/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>PL</span>
                </td>
                <td className="text-primary">
                  <span>45.141.215.227</span>
                </td>
                <td className="text-primary">1/16/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "transparent",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>SE</span>
                </td>
                <td className="text-primary">
                  <span>171.25.193.36</span>
                </td>
                <td className="text-primary">1/16/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>SE</span>
                </td>
                <td className="text-primary">
                  <span>45.84.107.101</span>
                </td>
                <td className="text-primary">1/15/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "transparent",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>PL</span>
                </td>
                <td className="text-primary">
                  <span>217.182.75.199</span>
                </td>
                <td className="text-primary">1/14/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>SE</span>
                </td>
                <td className="text-primary">
                  <span>171.25.193.131</span>
                </td>
                <td className="text-primary">1/14/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "transparent",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>KR</span>
                </td>
                <td className="text-primary">
                  <span>79.110.55.34</span>
                </td>
                <td className="text-primary">1/13/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
              <tr
                className="h-12 text-center"
                style={{
                  background: "rgba(0, 0, 0, 0.05)",
                }}
              >
                <td className="text-left pl-2 flex items-center h-12 left">
                  <div className="icon size-5 flex-none fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M4 10.2227C4 6.95263 6.65088 4.30176 9.9209 4.30176H21.7627C25.0327 4.30176 27.6836 6.95263 27.6836 10.2227V17.3277C27.6836 20.5978 25.0327 23.2486 21.7627 23.2486H9.9209C6.65088 23.2486 4 20.5978 4 17.3277V10.2227ZM9.9209 6.67012C7.95889 6.67012 6.36836 8.26064 6.36836 10.2227V17.3277C6.36836 19.2897 7.95889 20.8803 9.9209 20.8803H21.7627C23.7247 20.8803 25.3152 19.2897 25.3152 17.3277V10.2227C25.3152 8.26064 23.7247 6.67012 21.7627 6.67012H9.9209ZM4 26.5136C4 25.8596 4.53018 25.3295 5.18418 25.3295H26.4994C27.1534 25.3295 27.6836 25.8596 27.6836 26.5136C27.6836 27.1676 27.1534 27.6978 26.4994 27.6978H5.18418C4.53018 27.6978 4 27.1676 4 26.5136Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold whitespace-nowrap text-primary ml-2">
                    Windows 10 (Chrome 14)
                  </span>
                </td>
                <td className="text-primary">
                  <span>KR</span>
                </td>
                <td className="text-primary">
                  <span>140.174.179.129</span>
                </td>
                <td className="text-primary">1/9/2026</td>
                <td className="text-right pr-2">
                  <button className="ml-auto text-error">Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex items-center gap-x-[0.15rem]  justify-end mt-3">
            <button
              className="button button-m pagination-button pagination-prev"
              disabled
              type="button"
            >
              <div className="icon size-4 text-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
            <div className="pagination">
              <input className="pagination-current" size={2} />
              <span className="text-tertiary">of</span>
              <div className="p-2 min-w-8 h-8 justify-center-center flex items-center">
                <span>02</span>
              </div>
            </div>
            <button
              className="button button-m pagination-button pagination-next"
              type="button"
            >
              <div className="icon size-4 rotate-180 text-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
