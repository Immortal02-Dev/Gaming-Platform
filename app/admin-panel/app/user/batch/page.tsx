"use client";

import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";

declare global {
  interface Window {
    fnSelectUser?: (userIdx: string | number, text: string, child: string) => void;
    removeCommas?: (str: string) => string;
  }
}

export default function UserBatchPage() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Make functions available globally for popup callbacks
    window.fnSelectUser = (userIdx: string | number, text: string, child: string) => {
      fnSelectUser(userIdx.toString(), text, child);
    };

    // Load bank options
    loadBankOptions();
  }, []);

  const loadBankOptions = async () => {
    // This would typically load from an API
    // For now, keeping the structure as in HTML
  };

  const fninit = () => {
    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    if (checkAll) checkAll.checked = false;
    fnDeSelectUser();
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    if (userDistributor) userDistributor.value = "";
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    if (userGrade) userGrade.value = "";
    const chargeApiIdx = document.getElementById("chargeApiIdx") as HTMLSelectElement;
    if (chargeApiIdx) chargeApiIdx.value = "";
  };

  const userSelectPopup = () => {
    const nWidth = "750";
    const nHeight = "655";
    const curX = window.screenLeft;
    const curY = window.screenTop;
    const curWidth = document.body.clientWidth;
    const curHeight = document.body.clientHeight;
    const nLeft = curX + curWidth / 2 - parseInt(nWidth) / 2;
    const nTop = curY + curHeight / 2 - parseInt(nHeight) / 2;

    window.open(
      "/user/select?cancel=true&onlyPartner=true&checkOne=true",
      "userSelect",
      `top=${nTop}, left=${nLeft}, width=${nWidth}, height=${nHeight}, status=no, menubar=no, toolbar=no`
    );
  };

  const fnSelectUser = (userIdx: string, text: string, child: string) => {
    const userID = document.getElementById("userID") as HTMLInputElement;
    const userIdxInput = document.getElementById("userIdx") as HTMLInputElement;
    const childInput = document.getElementById("child") as HTMLInputElement;
    const checkAll = document.getElementById("checkAll") as HTMLInputElement;

    if (userID) userID.value = text;
    if (userIdxInput) userIdxInput.value = userIdx;
    if (childInput) childInput.value = child;
    if (checkAll) checkAll.checked = false;
  };

  const fnDeSelectUser = () => {
    const userID = document.getElementById("userID") as HTMLInputElement;
    const userIdxInput = document.getElementById("userIdx") as HTMLInputElement;
    const childInput = document.getElementById("child") as HTMLInputElement;

    if (userID) userID.value = "";
    if (userIdxInput) userIdxInput.value = "";
    if (childInput) childInput.value = "";
  };

  const makeRequest = async (url: string, data: any) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const ret = await response.json();

      if (ret.ReturnCode == 0) {
        alert("적용 완료");
        fninit();
        return true;
      } else {
        alert(ret.ReturnMessage);
        return false;
      }
    } catch (error: any) {
      alert(error.responseJSON?.message || "오류가 발생했습니다.");
      return false;
    }
  };

  const validateSelection = () => {
    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;

    if (
      !checkAll?.checked &&
      (!userIdx?.value && !userDistributor?.value && !userGrade?.value)
    ) {
      alert("대상을 선택하세요.");
      return false;
    }
    return true;
  };

  const fnChargeBank = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const bankIdx = document.getElementById("bankIdx") as HTMLSelectElement;

    await makeRequest("/userBatch.html/chargeBank", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      bankIdx: bankIdx?.value || "",
    });
  };

  const fnFirstCharge = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const firstChargeBonus = document.getElementById("firstChargeBonus") as HTMLSelectElement;

    await makeRequest("/userBatch.html/firstCharge", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      firstChargeBonus: firstChargeBonus?.value || "",
    });
  };

  const fnFirstChargeCommission = async (gameGroupIdx: number) => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const commissionInput = document.querySelector(`[name='firstChargeCommission[${gameGroupIdx}]']`) as HTMLInputElement;
    const limitInput = document.querySelector(`[name='firstChargeBonusLimit[${gameGroupIdx}]']`) as HTMLInputElement;

    const limitValue = limitInput?.value ? (window.removeCommas ? window.removeCommas(limitInput.value) : limitInput.value.replace(/,/g, "")) : "";

    const success = await makeRequest("/userBatch.html/firstChargeCommission", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      gameGroupIdx: gameGroupIdx,
      firstChargeCommission: commissionInput?.value || "",
      firstChargeBonusLimit: limitValue,
    });

    if (success) {
      if (commissionInput) commissionInput.value = "";
      if (limitInput) limitInput.value = "";
    }
  };

  const fnEveryCharge = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const everyChargeBonus = document.getElementById("everyChargeBonus") as HTMLSelectElement;

    await makeRequest("/userBatch.html/everyCharge", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      everyChargeBonus: everyChargeBonus?.value || "",
    });
  };

  const fnEveryChargeCommission = async (gameGroupIdx: number) => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const commissionInput = document.querySelector(`[name='everyChargeCommission[${gameGroupIdx}]']`) as HTMLInputElement;
    const limitInput = document.querySelector(`[name='everyChargeBonusLimit[${gameGroupIdx}]']`) as HTMLInputElement;

    const limitValue = limitInput?.value ? (window.removeCommas ? window.removeCommas(limitInput.value) : limitInput.value.replace(/,/g, "")) : "";

    const success = await makeRequest("/userBatch.html/everyChargeCommission", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      gameGroupIdx: gameGroupIdx,
      everyChargeCommission: commissionInput?.value || "",
      everyChargeBonusLimit: limitValue,
    });

    if (success) {
      if (commissionInput) commissionInput.value = "";
      if (limitInput) limitInput.value = "";
    }
  };

  const fnComp = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const comp = document.getElementById("comp") as HTMLInputElement;

    await makeRequest("/userBatch.html/comp", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      comp: comp?.value || "",
    });
  };

  const fnPartnerAddAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerAddAuth = document.getElementById("partnerAddAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerAddAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      partnerAddAuth: partnerAddAuth?.value || "",
    });
  };

  const fnPartnerAddAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerAddAuthLock = document.getElementById("partnerAddAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerAddAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: partnerAddAuthLock?.value || "",
    });
  };

  const fnPartnerModifyAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerModifyAuth = document.getElementById("partnerModifyAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerModifyAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      partnerModifyAuth: partnerModifyAuth?.value || "",
    });
  };

  const fnPartnerModifyAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerModifyAuthLock = document.getElementById("partnerModifyAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerModifyAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: partnerModifyAuthLock?.value || "",
    });
  };

  const fnPartnerPasswordModifyAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerPasswordModifyAuth = document.getElementById("partnerPasswordModifyAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerPasswordModifyAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      partnerPasswordModifyAuth: partnerPasswordModifyAuth?.value || "",
    });
  };

  const fnPartnerPasswordModifyAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerPasswordModifyAuthLock = document.getElementById("partnerPasswordModifyAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerPasswordModifyAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: partnerPasswordModifyAuthLock?.value || "",
    });
  };

  const fnPartnerCommissionAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerCommissionAuth = document.getElementById("partnerCommissionAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerCommissionAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      partnerCommissionAuth: partnerCommissionAuth?.value || "",
    });
  };

  const fnPartnerCommissionAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const partnerCommissionAuthLock = document.getElementById("partnerCommissionAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/partnerCommissionAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: partnerCommissionAuthLock?.value || "",
    });
  };

  const fnUserAddAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userAddAuth = document.getElementById("userAddAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userAddAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userAddAuth: userAddAuth?.value || "",
    });
  };

  const fnUserAddAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userAddAuthLock = document.getElementById("userAddAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userAddAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userAddAuthLock?.value || "",
    });
  };

  const fnUserMultiRegisterAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userMultiRegisterAuth = document.getElementById("userMultiRegisterAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userMultiRegisterAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userMultiRegisterAuth?.value || "",
    });
  };

  const fnUserModifyAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userModifyAuth = document.getElementById("userModifyAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userModifyAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userModifyAuth: userModifyAuth?.value || "",
    });
  };

  const fnUserModifyAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userModifyAuthLock = document.getElementById("userModifyAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userModifyAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userModifyAuthLock?.value || "",
    });
  };

  const fnUserPasswordModifyAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userPasswordModifyAuth = document.getElementById("userPasswordModifyAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userPasswordModifyAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userPasswordModifyAuth: userPasswordModifyAuth?.value || "",
    });
  };

  const fnUserPasswordModifyAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userPasswordModifyAuthLock = document.getElementById("userPasswordModifyAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userPasswordModifyAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userPasswordModifyAuthLock?.value || "",
    });
  };

  const fnUserCommissionAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userCommissionAuth = document.getElementById("userCommissionAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userCommissionAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userCommissionAuth: userCommissionAuth?.value || "",
    });
  };

  const fnUserCommissionAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userCommissionAuthLock = document.getElementById("userCommissionAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userCommissionAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userCommissionAuthLock?.value || "",
    });
  };

  const fnUserMoneyChargeAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userMoneyChargeAuth = document.getElementById("userMoneyChargeAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userMoneyChargeAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userMoneyChargeAuth: userMoneyChargeAuth?.value || "",
    });
  };

  const fnUserMoneyChargeAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userMoneyChargeAuthLock = document.getElementById("userMoneyChargeAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userMoneyChargeAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userMoneyChargeAuthLock?.value || "",
    });
  };

  const fnUserCasinoMoneyChargeAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userCasinoMoneyChargeAuth = document.getElementById("userCasinoMoneyChargeAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userCasinoMoneyChargeAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userCasinoMoneyChargeAuth: userCasinoMoneyChargeAuth?.value || "",
    });
  };

  const fnUserCasinoMoneyChargeAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userCasinoMoneyChargeAuthLock = document.getElementById("userCasinoMoneyChargeAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userCasinoMoneyChargeAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userCasinoMoneyChargeAuthLock?.value || "",
    });
  };

  const fnPointChangeAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const pointChangeAuth = document.getElementById("pointChangeAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/pointChangeAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      pointChangeAuth: pointChangeAuth?.value || "",
    });
  };

  const fnPointChangeAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const pointChangeAuthLock = document.getElementById("pointChangeAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/pointChangeAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: pointChangeAuthLock?.value || "",
    });
  };

  const fnPointChangeUserWebAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const pointChangeUserWebAuth = document.getElementById("pointChangeUserWebAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/pointChangeUserWebAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      pointChangeUserWebAuth: pointChangeUserWebAuth?.value || "",
    });
  };

  const fnPointChangeUserWebAuthLock = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const pointChangeUserWebAuthLock = document.getElementById("pointChangeUserWebAuthLock") as HTMLSelectElement;

    await makeRequest("/userBatch.html/pointChangeUserWebAuthLock", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: pointChangeUserWebAuthLock?.value || "",
    });
  };

  const fnExchangePasswordUseYN = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const exchangePasswordUseYN = document.getElementById("exchangePasswordUseYN") as HTMLSelectElement;

    await makeRequest("/userBatch.html/exchangePasswordUseYN", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      exchangePasswordUseYN: exchangePasswordUseYN?.value || "",
    });
  };

  const fnUserSitePasswordEditYN = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userSitePasswordEditYN = document.getElementById("userSitePasswordEditYN") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userSitePasswordEditYN", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userSitePasswordEditYN: userSitePasswordEditYN?.value || "",
    });
  };

  const fnUserGradeModify = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userGradeModify = document.getElementById("userGradeModify") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userGradeModify", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userGradeModify: userGradeModify?.value || "",
    });
  };

  const fnChargeApiIdx = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const chargeApiIdx = document.getElementById("chargeApiIdx") as HTMLSelectElement;

    await makeRequest("/userBatch.html/chargeApiIdx", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      chargeApiIdx: chargeApiIdx?.value || "",
    });
  };

  const fnUserStatusIdx = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userStatusIdx = document.getElementById("userStatusIdx") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userStatusIdx", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userStatusIdx: userStatusIdx?.value || "",
    });
  };

  const fnUserGameGrade = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userGameGradeGameGroupIdx = document.getElementById("userGameGradeGameGroupIdx") as HTMLSelectElement;
    const userGameGradeUserGradeIdx = document.getElementById("userGameGradeUserGradeIdx") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userGameGrade", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      gameGroupIdx: userGameGradeGameGroupIdx?.value || "",
      userGameGradeIdx: userGameGradeUserGradeIdx?.value || "",
    });
  };

  const fnIntegrateChargeBonus = async (userIntegrateChargeNumber: number) => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const bonusText = document.getElementById(`userIntegrateChargeBonusText_${userIntegrateChargeNumber}`) as HTMLInputElement;
    const bonus = document.getElementById(`userIntegrateChargeBonus_${userIntegrateChargeNumber}`) as HTMLInputElement;
    const bonusMax = document.getElementById(`userIntegrateChargeBonusMax_${userIntegrateChargeNumber}`) as HTMLInputElement;

    const bonusMaxValue = bonusMax?.value ? (window.removeCommas ? window.removeCommas(bonusMax.value) : bonusMax.value.replace(/,/g, "")) : "";

    const success = await makeRequest("/userBatch.html/userIntegrateChargeBonus", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      userIntegrateChargeNumber: userIntegrateChargeNumber,
      userIntegrateChargeBonusText: bonusText?.value || "",
      userIntegrateChargeBonus: bonus?.value || "",
      userIntegrateChargeBonusMax: bonusMaxValue,
    });

    if (success) {
      if (bonusText) bonusText.value = "";
      if (bonus) bonus.value = "";
      if (bonusMax) bonusMax.value = "";
    }
  };

  const fnIsUseChargeBonus = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const isUseChargeBonus = document.getElementById("isUseChargeBonus") as HTMLSelectElement;

    await makeRequest("/userBatch.html/isUseChargeBonus", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: isUseChargeBonus?.value || "",
    });
  };

  const fnUserIntegrateChargeBonusUseYN = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userIntegrateChargeBonusUseYN = document.getElementById("userIntegrateChargeBonusUseYN") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userIntegrateChargeBonusUseYN", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userIntegrateChargeBonusUseYN?.value || "",
    });
  };

  const fnUserIntegrateChargeBonusAuth = async () => {
    if (!validateSelection()) return;
    if (!confirm("일괄 적용 하시겠습니까?")) return;

    const checkAll = document.getElementById("checkAll") as HTMLInputElement;
    const userIdx = document.getElementById("userIdx") as HTMLInputElement;
    const userDistributor = document.getElementById("userDistributor") as HTMLSelectElement;
    const userGrade = document.getElementById("userGrade") as HTMLSelectElement;
    const userIntegrateChargeBonusAuth = document.getElementById("userIntegrateChargeBonusAuth") as HTMLSelectElement;

    await makeRequest("/userBatch.html/userIntegrateChargeBonusAuth", {
      checkAll: checkAll?.checked ? 1 : 0,
      userIdx: userIdx?.value || "",
      userDistributor: userDistributor?.value || "",
      userGrade: userGrade?.value || "",
      value: userIntegrateChargeBonusAuth?.value || "",
    });
  };

  return (
    <Layout>
      <style jsx>{`
        .input-group .select2-container {
          margin: 0 !important;
        }
        .input-group .select2-selection {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .input-group > .select2-container--bootstrap {
          width: auto;
        }
        .input-group > .select2-container--bootstrap .select2-selection--single {
          height: 100%;
          line-height: inherit;
          padding: 0.5rem 1rem;
        }
        .w-220px {
          width: 220px !important;
        }
      `}</style>

      <h1 className="page-header">
        <a href="/user/batch">
          <i className="fa fa-users me-2"></i>회원 일괄 적용
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col-md-7">
          <div
            className="panel panel-inverse"
            data-sortable-id="form-1"
            data-sortable="false"
          >
            <div className="panel-heading">
              <h4 className="panel-title">
                <span className="me-2 pull-left">
                  <i className="fa fa-cog"></i>
                </span>
                회원 일괄 적용
              </h4>
              <div className="panel-heading-btn">
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-default"
                  data-toggle="panel-expand"
                  data-tooltip-init="true"
                >
                  <i className="fa fa-expand"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-warning"
                  data-toggle="panel-collapse"
                >
                  <i className="fa fa-minus"></i>
                </a>
                <a
                  href="javascript:;"
                  className="btn btn-xs btn-icon btn-danger"
                  data-toggle="panel-remove"
                >
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="panel-body">
              <div className="row mb-2 bg-gray-300 py-2 rounded">
                <label className="col-form-label w-220px">대상 선택</label>
                <div className="col d-inline-flex">
                  <div className="form-check form-check-inline col-form-label">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="checkAll"
                      value="1"
                    />
                    <label className="form-check-label" htmlFor="checkAll">
                      전체
                    </label>
                  </div>

                  <div className="input-group me-2" style={{ width: "300px" }}>
                    <input
                      type="text"
                      name="userID"
                      id="userID"
                      onClick={userSelectPopup}
                      className="form-control"
                      required
                      readOnly
                      value=""
                    />
                    <input
                      type="hidden"
                      name="userIdx"
                      id="userIdx"
                      className="form-control"
                      value=""
                    />
                    <input
                      type="hidden"
                      name="child"
                      id="child"
                      className="form-control"
                      value=""
                    />
                    <a className="btn btn-primary" onClick={userSelectPopup}>
                      <i className="fas fa-check me-2"></i>선택
                    </a>
                  </div>

                  <select
                    name="userDistributor"
                    id="userDistributor"
                    className="form-select w-auto me-2"
                  >
                    <option value="">파트너 단계</option>
                    <option value="0">파트너 전체</option>
                    <option value="1">부본사</option>
                    <option value="2">총판</option>
                    <option value="3">대리점1단계</option>
                    <option value="4">대리점2단계</option>
                    <option value="5">대리점3단계</option>
                    <option value="6">대리점4단계</option>
                    <option value="7">대리점5단계</option>
                  </select>

                  <select
                    name="userGrade"
                    id="userGrade"
                    className="form-select w-auto me-2"
                  >
                    <option value="">유저 레벨</option>
                    <option value="0">유저 전체</option>
                    <option value="1">1레벨</option>
                    <option value="2">2레벨</option>
                    <option value="3">3레벨</option>
                    <option value="4">4레벨</option>
                    <option value="5">5레벨</option>
                    <option value="6">6레벨</option>
                    <option value="7">7레벨</option>
                    <option value="8">8레벨</option>
                    <option value="9">9레벨</option>
                    <option value="10">10레벨</option>
                    <option value="11">11레벨</option>
                    <option value="12">12레벨</option>
                    <option value="13">13레벨</option>
                    <option value="14">14레벨</option>
                    <option value="15">15레벨</option>
                  </select>

                  <button className="btn btn-danger ms-auto" onClick={fninit}>
                    선택 초기화
                  </button>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-form-label w-220px">충전 계좌 지정</label>
                <div className="col d-inline-flex">
                  <select
                    name="bankIdx"
                    id="bankIdx"
                    className="form-select w-auto me-2"
                  >
                    <option value="">충전 계좌 선택</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnChargeBank}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">첫충 보너스</label>
                <div className="col d-inline-flex">
                  <label className="col-form-label w-auto pe-1">금일환전</label>
                  <select
                    name="firstChargeBonus"
                    id="firstChargeBonus"
                    className="form-select w-80px"
                  >
                    <option value="">선택</option>
                    <option value="1">가능</option>
                    <option value="0">불가</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success ms-2"
                    onClick={fnFirstCharge}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((gameGroupIdx) => {
                const gameNames = ["", "스포츠", "카지노", "슬롯", "미니게임", "보드게임"];
                return (
                  <div key={gameGroupIdx} className="form-group row mb-1">
                    <div className="col-md-3">
                      <div className="input-group">
                        <label className="input-group-text col-form-label px-2">
                          {gameNames[gameGroupIdx]}
                        </label>
                        <input
                          type="text"
                          name={`firstChargeCommission[${gameGroupIdx}]`}
                          className="form-control commission"
                          defaultValue=""
                        />
                        <label className="input-group-text col-form-label px-2">
                          %
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="input-group">
                        <label className="input-group-text col-form-label">
                          최대 보너스 금액
                        </label>
                        <input
                          type="text"
                          name={`firstChargeBonusLimit[${gameGroupIdx}]`}
                          className="form-control amount"
                          defaultValue=""
                        />
                        <label className="input-group-text col-form-label px-2">
                          P
                        </label>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => fnFirstChargeCommission(gameGroupIdx)}
                        >
                          <i className="fa fa-save me-1"></i>저장
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row mb-2 mt-2">
                <label className="col-form-label w-220px">매충 보너스</label>
                <div className="col d-inline-flex">
                  <label className="col-form-label w-auto pe-1">금일환전</label>
                  <select
                    name="everyChargeBonus"
                    id="everyChargeBonus"
                    className="form-select w-80px"
                  >
                    <option value="">선택</option>
                    <option value="1">가능</option>
                    <option value="0">불가</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success ms-2"
                    onClick={fnEveryCharge}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
              {[1, 2, 3, 4, 5].map((gameGroupIdx) => {
                const gameNames = ["", "스포츠", "카지노", "슬롯", "미니게임", "보드게임"];
                return (
                  <div key={gameGroupIdx} className="form-group row mb-1">
                    <div className="col-md-3">
                      <div className="input-group">
                        <label className="input-group-text col-form-label px-2">
                          {gameNames[gameGroupIdx]}
                        </label>
                        <input
                          type="text"
                          name={`everyChargeCommission[${gameGroupIdx}]`}
                          className="form-control commission"
                          defaultValue=""
                        />
                        <label className="input-group-text col-form-label px-2">
                          %
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="input-group">
                        <label className="input-group-text col-form-label">
                          최대 보너스 금액
                        </label>
                        <input
                          type="text"
                          name={`everyChargeBonusLimit[${gameGroupIdx}]`}
                          className="form-control amount"
                          defaultValue=""
                        />
                        <label className="input-group-text col-form-label px-2">
                          P
                        </label>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => fnEveryChargeCommission(gameGroupIdx)}
                        >
                          <i className="fa fa-save me-1"></i>저장
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row mb-2 mt-2">
                <label className="col-form-label w-220px">통합 보너스</label>
                <div className="col d-inline-flex">
                  <label className="col-form-label w-auto pe-1">사용유무</label>
                  <select
                    name="userIntegrateChargeBonusUseYN"
                    id="userIntegrateChargeBonusUseYN"
                    className="form-select w-auto"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success ms-2"
                    onClick={fnUserIntegrateChargeBonusUseYN}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>

                  <label className="col-form-label w-auto pe-1 ms-3">
                    사용권한
                  </label>
                  <select
                    name="userIntegrateChargeBonusAuth"
                    id="userIntegrateChargeBonusAuth"
                    className="form-select w-auto"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success ms-2"
                    onClick={fnUserIntegrateChargeBonusAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="form-group row mb-1">
                  <div className="col-md-5 d-inline-flex">
                    <div className="input-group">
                      <label className="input-group-text col-form-label px-2">
                        통합충전{num}
                      </label>
                      <input
                        type="text"
                        id={`userIntegrateChargeBonusText_${num}`}
                        className="form-control"
                        placeholder="충전 문구 지정"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-md-2 d-inline-flex">
                    <div className="input-group ms-2">
                      <input
                        type="text"
                        id={`userIntegrateChargeBonus_${num}`}
                        className="form-control commission"
                        defaultValue=""
                      />
                      <label className="input-group-text col-form-label px-2">
                        %
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5 d-inline-flex">
                    <div className="input-group ms-2">
                      <label className="input-group-text col-form-label">
                        최대 보너스 금액
                      </label>
                      <input
                        type="text"
                        id={`userIntegrateChargeBonusMax_${num}`}
                        className="form-control amount"
                        defaultValue=""
                      />
                      <label className="input-group-text col-form-label px-2">
                        P
                      </label>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => fnIntegrateChargeBonus(num)}
                      >
                        <i className="fa fa-save me-1"></i>저장
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="row mb-2 mt-2">
                <label className="col-form-label w-220px">회원 콤프</label>
                <div className="col d-inline-flex">
                  <input
                    type="text"
                    name="comp"
                    id="comp"
                    className="form-control commission w-80px"
                  />
                  <label className="col-form-label w-auto px-1 me-2">%</label>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnComp}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">파트너 등록</label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerAddAuth"
                    id="partnerAddAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerAddAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">파트너 등록 잠금</label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerAddAuthLock"
                    id="partnerAddAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerAddAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">파트너 수정</label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerModifyAuth"
                    id="partnerModifyAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerModifyAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">파트너 수정 잠금</label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerModifyAuthLock"
                    id="partnerModifyAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerModifyAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  파트너 비밀번호 수정
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerPasswordModifyAuth"
                    id="partnerPasswordModifyAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerPasswordModifyAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  파트너 비밀번호 수정 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerPasswordModifyAuthLock"
                    id="partnerPasswordModifyAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerPasswordModifyAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  파트너 수수료 등록/수정
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerCommissionAuth"
                    id="partnerCommissionAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerCommissionAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  파트너 수수료 등록/수정 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="partnerCommissionAuthLock"
                    id="partnerCommissionAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPartnerCommissionAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">회원 등록</label>
                <div className="col d-inline-flex">
                  <select
                    name="userAddAuth"
                    id="userAddAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserAddAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">회원 등록 잠금</label>
                <div className="col d-inline-flex">
                  <select
                    name="userAddAuthLock"
                    id="userAddAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserAddAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  회원 일괄 등록 권한
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userMultiRegisterAuth"
                    id="userMultiRegisterAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserMultiRegisterAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">회원 수정</label>
                <div className="col d-inline-flex">
                  <select
                    name="userModifyAuth"
                    id="userModifyAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserModifyAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">회원 수정 잠금</label>
                <div className="col d-inline-flex">
                  <select
                    name="userModifyAuthLock"
                    id="userModifyAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserModifyAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  회원 비밀번호 수정
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userPasswordModifyAuth"
                    id="userPasswordModifyAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserPasswordModifyAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  회원 비밀번호 수정 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userPasswordModifyAuthLock"
                    id="userPasswordModifyAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserPasswordModifyAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  회원 수수료 등록/수정
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userCommissionAuth"
                    id="userCommissionAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserCommissionAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  회원 수수료 등록/수정 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userCommissionAuthLock"
                    id="userCommissionAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserCommissionAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  게임머니 지급 / 회수
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userMoneyChargeAuth"
                    id="userMoneyChargeAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserMoneyChargeAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  게임머니 지급 / 회수 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userMoneyChargeAuthLock"
                    id="userMoneyChargeAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserMoneyChargeAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  카지노머니 지급 / 회수
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userCasinoMoneyChargeAuth"
                    id="userCasinoMoneyChargeAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 불가
                    </option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserCasinoMoneyChargeAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  카지노머니 지급 / 회수 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userCasinoMoneyChargeAuthLock"
                    id="userCasinoMoneyChargeAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserCasinoMoneyChargeAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  포인트 전환 사용유무
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="pointChangeAuth"
                    id="pointChangeAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      이용 가능
                    </option>
                    <option value="1">이용 불가</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPointChangeAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  포인트 전환 사용유무 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="pointChangeAuthLock"
                    id="pointChangeAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPointChangeAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  포인트 전환 유저웹 표시여부
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="pointChangeUserWebAuth"
                    id="pointChangeUserWebAuth"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      표시
                    </option>
                    <option value="1">미표시</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPointChangeUserWebAuth}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  포인트 전환 유저웹 표시여부 잠금
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="pointChangeUserWebAuthLock"
                    id="pointChangeUserWebAuthLock"
                    className="form-select w-auto me-2"
                  >
                    <option value="">사용 안함</option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnPointChangeUserWebAuthLock}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  환전 비밀번호 사용여부
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="exchangePasswordUseYN"
                    id="exchangePasswordUseYN"
                    className="form-select w-auto me-2"
                  >
                    <option value="0" selected>
                      미사용
                    </option>
                    <option value="1">사용</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnExchangePasswordUseYN}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">
                  충전 보너스 사용유무
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="isUseChargeBonus"
                    id="isUseChargeBonus"
                    className="form-select w-auto me-2"
                  >
                    <option value="0">이용 불가</option>
                    <option value="1">이용 가능</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnIsUseChargeBonus}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">
                  비밀번호 변경 사용여부
                  <span className="text-red">(유저웹)</span>
                </label>
                <div className="col d-inline-flex">
                  <select
                    name="userSitePasswordEditYN"
                    id="userSitePasswordEditYN"
                    className="form-select w-auto me-2"
                  >
                    <option value="" selected>
                      사이트 설정
                    </option>
                    <option value="0">이용 불가</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserSitePasswordEditYN}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">회원 레벨 등록</label>
                <div className="col d-inline-flex">
                  <select
                    id="userGradeModify"
                    className="form-select w-auto me-2"
                  >
                    <option value="1">1레벨</option>
                    <option value="2">2레벨</option>
                    <option value="3">3레벨</option>
                    <option value="4">4레벨</option>
                    <option value="5">5레벨</option>
                    <option value="6">6레벨</option>
                    <option value="7">7레벨</option>
                    <option value="8">8레벨</option>
                    <option value="9">9레벨</option>
                    <option value="10">10레벨</option>
                    <option value="11">11레벨</option>
                    <option value="12">12레벨</option>
                    <option value="13">13레벨</option>
                    <option value="14">14레벨</option>
                    <option value="15">15레벨</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserGradeModify}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>

                <label className="col-form-label w-220px">게임별 회원 레벨</label>
                <div className="col d-inline-flex">
                  <select
                    id="userGameGradeGameGroupIdx"
                    className="form-select w-auto me-2"
                  >
                    <option value="1">스포츠</option>
                    <option value="2">카지노</option>
                    <option value="3">슬롯</option>
                    <option value="4">미니게임</option>
                    <option value="5">보드게임</option>
                  </select>
                  <select
                    id="userGameGradeUserGradeIdx"
                    className="form-select w-auto me-2"
                  >
                    <option value="1">1레벨</option>
                    <option value="2">2레벨</option>
                    <option value="3">3레벨</option>
                    <option value="4">4레벨</option>
                    <option value="5">5레벨</option>
                    <option value="6">6레벨</option>
                    <option value="7">7레벨</option>
                    <option value="8">8레벨</option>
                    <option value="9">9레벨</option>
                    <option value="10">10레벨</option>
                    <option value="11">11레벨</option>
                    <option value="12">12레벨</option>
                    <option value="13">13레벨</option>
                    <option value="14">14레벨</option>
                    <option value="15">15레벨</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserGameGrade}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-form-label w-220px">회원 상태 변경</label>
                <div className="col d-inline-flex">
                  <select id="userStatusIdx" className="form-select w-auto me-2">
                    <option value="1">가입대기</option>
                    <option value="2">정상</option>
                    <option value="3">정지</option>
                    <option value="4">탈퇴</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={fnUserStatusIdx}
                  >
                    <i className="fa fa-save me-1"></i>저장
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="modal-spinner"
        className="modal"
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            처리중입니다. 잠시 기다려주십시오.
          </button>
        </div>
      </div>
    </Layout>
  );
}

