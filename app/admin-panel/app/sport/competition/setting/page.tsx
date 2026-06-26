"use client";
import { Suspense } from "react";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef, FormEvent, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Layout from "@/components/Layout";

// Extend Window interface for jQuery/Select2
declare global {
  interface Window {
    $: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    jQuery: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

const BACKEND_URL = ""; // Use relative path for proxy

interface Competition {
  competitionIdx: number;
  regionIdx?: number;
  regionName: string;
  sportIdx?: number;
  sportName: string;
  competitionName: string;
  displayName: string;
  imageUrl: string;
  sort: number | null;
  isMain: number;
  prematchUseYN: number;
  liveUseYN: number;
  updateUserName: string;
  updateDate: string;
}

const InactiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="21px"
    height="21px"
    fill="currentColor"
  >
    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
  </svg>
);

function SportCompetitionSettingPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [regionIdx, setRegionIdx] = useState(
    searchParams.get("regionIdx") || ""
  );
  const [sportIdx, setSportIdx] = useState(searchParams.get("sportIdx") || "");
  const [searchType, setSearchType] = useState(
    searchParams.get("searchType") || "0"
  );
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") || ""
  );
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    competitionIdx: "",
    competitionName: "",
    regionName: "",
    sportName: "",
    displayName: "",
    imageUrl: "",
    sort: "",
    isMain: false,
    prematchUseYN: false,
    liveUseYN: false,
    updateUserName: "",
    updateDate: "",
    regionIdx: "",
    sportIdx: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize select2 after component mounts
    if (typeof window !== "undefined" && window.$) {
      const $ = window.$;
      const initSelect2 = () => {
        if ($.fn && $.fn.select2) {
          $(".default-select2").select2();
        } else {
          // Retry after a short delay if select2 is not yet loaded
          setTimeout(initSelect2, 200);
        }
      };
      initSelect2();
    }
  }, []);

  const fetchCompetitions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (regionIdx) params.set("regionIdx", regionIdx);
      if (sportIdx) params.set("sportIdx", sportIdx);
      if (searchType) params.set("searchType", searchType);
      if (searchText) params.set("searchText", searchText);

      const response = await fetch(
        `${BACKEND_URL}/api/admin/sport-competition-setting?${params.toString()}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch competitions: ${response.status}`);
      }

      const data = await response.json();
      if (data.ReturnCode === 0 && data.data?.items) {
        setCompetitions(data.data.items);
      } else {
        setCompetitions([]);
      }
    } catch (error) {
      console.error("Error fetching competitions:", error);
      setCompetitions([]);
    } finally {
      setLoading(false);
    }
  }, [regionIdx, sportIdx, searchType, searchText]);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  const getCompetitionDetail = (
    competitionIdx: number,
    competitionName: string,
    regionName: string,
    sportName: string,
    displayName: string,
    imageUrl: string,
    sort: number | null,
    isMain: number,
    prematchUseYN: number,
    liveUseYN: number,
    updateUserName: string,
    updateDate: string
  ) => {
    // Find the competition to get regionIdx and sportIdx
    const competition = competitions.find(
      (c) => c.competitionIdx === competitionIdx
    );

    setModalData({
      competitionIdx: competitionIdx.toString(),
      competitionName,
      regionName,
      sportName,
      displayName,
      imageUrl: imageUrl || "",
      sort: sort?.toString() || "",
      isMain: isMain === 1,
      prematchUseYN: prematchUseYN === 1,
      liveUseYN: liveUseYN === 1,
      updateUserName,
      updateDate,
      regionIdx: competition?.regionIdx?.toString() || regionIdx || "",
      sportIdx: competition?.sportIdx?.toString() || sportIdx || "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(formRef.current);

      // Ensure competitionIdx is set
      if (!modalData.competitionIdx) {
        throw new Error("필수 값이 누락되었습니다.");
      }

      const response = await fetch(
        `${BACKEND_URL}/api/admin/sport-competition-setting/${modalData.competitionIdx}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.ReturnMessage || "저장에 실패했습니다.");
      }

      const data = await response.json();
      if (data.ReturnCode === 0 || data.success) {
        alert("저장되었습니다.");
        setIsModalOpen(false);
        // Refresh competitions list
        await fetchCompetitions();
      } else {
        throw new Error(data.ReturnMessage || "저장에 실패했습니다.");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "저장에 실패했습니다.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (regionIdx) params.set("regionIdx", regionIdx);
    if (sportIdx) params.set("sportIdx", sportIdx);
    if (searchType) params.set("searchType", searchType);
    if (searchText) params.set("searchText", searchText);
    router.push(`/sport/competition/setting?${params.toString()}`);
  };


  const modalClasses = `modal fade${isModalOpen ? " show" : ""}`;
  const modalStyle: React.CSSProperties = {
    display: isModalOpen ? "block" : "none",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <Layout>
      <h1 className="page-header">
        <a href="/sport/competition/setting">
          <i className="fa fa-futbol me-2"></i>스포츠 리그 설정
        </a>
        <small></small>
      </h1>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex bg-white p-2">
            <form
              onSubmit={handleSearch}
              action="/sport/competition/setting"
              method="get"
            >
              <div className="d-flex">
                <select
                  name="regionIdx"
                  id="regionIdx"
                  className="form-select w-auto me-2 default-select2"
                  value={regionIdx}
                  onChange={(e) => setRegionIdx(e.target.value)}
                >
                  <option value="1">전체</option>
                  <option value="2">영국</option>
                  <option value="3">독일</option>
                  <option value="4">이탈리아</option>
                  <option value="5">프랑스</option>
                  <option value="6">스페인</option>
                  <option value="7">네덜란드</option>
                  <option value="10">러시아</option>
                  <option value="11">터키</option>
                  <option value="14">브라질</option>
                  <option value="17">벨기에</option>
                  <option value="18">포르투갈</option>
                  <option value="19">그리스</option>
                  <option value="20">아르헨티나</option>
                  <option value="21">오스트리아</option>
                  <option value="22">크로아티아</option>
                  <option value="23">체코</option>
                  <option value="24">덴마크</option>
                  <option value="25">핀란드</option>
                  <option value="27">헝가리</option>
                  <option value="28">아일랜드</option>
                  <option value="33">노르웨이</option>
                  <option value="35">폴란드</option>
                  <option value="38">루마니아</option>
                  <option value="41">스코틀랜드</option>
                  <option value="43">스웨덴</option>
                  <option value="44">스위스</option>
                  <option value="45">우크라이나</option>
                  <option value="46">???</option>
                  <option value="48">??? ??</option>
                  <option value="49">?????? ???</option>
                  <option value="51">??</option>
                  <option value="52">??</option>
                  <option value="55">????</option>
                  <option value="56">???</option>
                  <option value="57">??</option>
                  <option value="58">DR ??</option>
                  <option value="60">?????</option>
                  <option value="61">??????</option>
                  <option value="62">?????</option>
                  <option value="63">??</option>
                  <option value="65">????</option>
                  <option value="66">??</option>
                  <option value="67">???</option>
                  <option value="68">???</option>
                  <option value="69">????</option>
                  <option value="70">???????</option>
                  <option value="71">????</option>
                  <option value="72">???</option>
                  <option value="73">?????</option>
                  <option value="76">?????</option>
                  <option value="77">?????</option>
                  <option value="79">??</option>
                  <option value="80">??</option>
                  <option value="81">???</option>
                  <option value="82">???</option>
                  <option value="83">???? ???</option>
                  <option value="86">??</option>
                  <option value="87">???</option>
                  <option value="88">???</option>
                  <option value="89">??</option>
                  <option value="90">??</option>
                  <option value="91">????</option>
                  <option value="92">???</option>
                  <option value="96">?</option>
                  <option value="97">????</option>
                  <option value="99">??</option>
                  <option value="105">????</option>
                  <option value="106">??</option>
                  <option value="107">???</option>
                  <option value="108">?????</option>
                  <option value="109">??</option>
                  <option value="110">?????</option>
                  <option value="111">??</option>
                  <option value="112">???</option>
                  <option value="113">????</option>
                  <option value="115">????</option>
                  <option value="116">????</option>
                  <option value="117">????</option>
                  <option value="118">??</option>
                  <option value="120">???</option>
                  <option value="121">?????</option>
                  <option value="122">??</option>
                  <option value="125">????</option>
                  <option value="126">????</option>
                  <option value="127">??????</option>
                  <option value="128">???</option>
                  <option value="129">????</option>
                  <option value="130">???</option>
                  <option value="131">???</option>
                  <option value="132">?????</option>
                  <option value="133">???</option>
                  <option value="135">?????</option>
                  <option value="136">?????</option>
                  <option value="137">???</option>
                  <option value="138">??????</option>
                  <option value="139">??????</option>
                  <option value="140">???</option>
                  <option value="141">?????</option>
                  <option value="142">???</option>
                  <option value="143">??</option>
                  <option value="144">??</option>
                  <option value="147">????</option>
                  <option value="150">???</option>
                  <option value="152">???</option>
                  <option value="153">???</option>
                  <option value="154">??</option>
                  <option value="155">?????</option>
                  <option value="157">???</option>
                  <option value="158">????</option>
                  <option value="159">???</option>
                  <option value="162">??</option>
                  <option value="163">????</option>
                  <option value="165">????</option>
                  <option value="166">????</option>
                  <option value="167">???</option>
                  <option value="168">?????</option>
                  <option value="172">????</option>
                  <option value="173">??</option>
                  <option value="174">????</option>
                  <option value="176">?????</option>
                  <option value="177">???</option>
                  <option value="178">??????</option>
                  <option value="179">????</option>
                  <option value="180">??</option>
                  <option value="181">???</option>
                  <option value="183">???</option>
                  <option value="184">????</option>
                  <option value="186">??????</option>
                  <option value="187">???</option>
                  <option value="188">?????</option>
                  <option value="190">????</option>
                  <option value="191">????</option>
                  <option value="192">????</option>
                  <option value="193">???</option>
                  <option value="194">???</option>
                  <option value="198">??????</option>
                  <option value="203">????</option>
                  <option value="205">???????</option>
                  <option value="206">???</option>
                  <option value="207">????</option>
                  <option value="210">????</option>
                  <option value="212">?????</option>
                  <option value="213">?????</option>
                  <option value="214">??? ??</option>
                  <option value="216">????? ???</option>
                  <option value="218">???</option>
                  <option value="224">???</option>
                  <option value="225">???</option>
                  <option value="226">???</option>
                  <option value="227">??</option>
                  <option value="228">?????</option>
                  <option value="229">????</option>
                  <option value="230">??</option>
                  <option value="232">??</option>
                  <option value="236">???</option>
                  <option value="237">??</option>
                  <option value="238">???????</option>
                  <option value="241">???</option>
                  <option value="242">?????</option>
                  <option value="243">??????</option>
                  <option value="244">??</option>
                  <option value="245">??</option>
                  <option value="247">????</option>
                  <option value="248">??????</option>
                  <option value="250">?????</option>
                  <option value="251">???</option>
                  <option value="256">??</option>
                  <option value="257">???</option>
                  <option value="258">????</option>
                  <option value="259">America</option>
                  <option value="260">????</option>
                  <option value="262">?????</option>
                  <option value="263">?????</option>
                  <option value="264">???</option>
                  <option value="273">??</option>
                  <option value="275">????</option>
                  <option value="279">??? ????</option>
                  <option value="282">enter reg name here</option>
                  <option value="284">????????</option>
                  <option value="286">???????</option>
                  <option value="288">??????</option>
                  <option value="290">Montana</option>
                  <option value="292">Pleven</option>
                  <option value="293">Ruse</option>
                  <option value="294">Varna</option>
                  <option value="295">Veliko Tarnovo</option>
                  <option value="296">Burgas</option>
                  <option value="297">Stara Zagora</option>
                  <option value="298">Plovdiv</option>
                  <option value="300">Pazardjik</option>
                  <option value="301">Blagoevgrad</option>
                  <option value="304">Haskovo</option>
                  <option value="305">Kardjali</option>
                  <option value="306">Sofia Oblast</option>
                  <option value="308">Sliven</option>
                  <option value="310">Sofia</option>
                  <option value="312">Gorodok</option>
                </select>

                <select
                  name="sportIdx"
                  id="sportIdx"
                  className="form-select w-auto me-2 default-select2"
                  value={sportIdx}
                  onChange={(e) => setSportIdx(e.target.value)}
                >
                  <option value="1">축구</option>
                  <option value="11">농구</option>
                  <option value="3">야구</option>
                  <option value="5">배구</option>
                  <option value="2">테니스</option>
                  <option value="6">하키</option>
                  <option value="58">이스포츠</option>
                </select>

                <select
                  name="searchType"
                  className="form-select w-auto me-2"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="0">전체</option>
                  <option value="1">리그명</option>
                  <option value="2">노출명</option>
                </select>

                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  className="form-control w-150px me-2"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />

                <button type="submit" className="btn btn-lime" id="btnSearch">
                  <i className="fa-solid fa-magnifying-glass me-2"></i>검색
                </button>
              </div>
            </form>
            <div className="ms-auto"></div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <form ref={formRef} action="sportCompetitionSetting" method="post">
            <input type="hidden" name="_token" value="" />
            <table className="table table-striped table-bordered table-responsive table-hover align-middle bg-white text-center text-nowrap fw-bold">
              <thead className="bg-dark bg-gradient text-white">
                <tr>
                  <th rowSpan={2} className="align-middle">
                    번호
                  </th>
                  <th rowSpan={2} className="align-middle">
                    지역
                  </th>
                  <th rowSpan={2} className="align-middle">
                    종목
                  </th>
                  <th rowSpan={2} className="align-middle">
                    리그명
                  </th>
                  <th rowSpan={2} className="align-middle">
                    노출명
                  </th>
                  <th rowSpan={2} className="align-middle">
                    표시이미지
                  </th>
                  <th rowSpan={2} className="align-middle">
                    순서
                  </th>
                  <th rowSpan={2} className="align-middle">
                    메인
                  </th>
                  <th colSpan={2}>사용여부</th>
                  <th rowSpan={2} className="align-middle">
                    설정
                  </th>
                  <th rowSpan={2} className="align-middle">
                    마지막 수정시간
                  </th>
                </tr>
                <tr>
                  <th>프리매치</th>
                  <th>라이브</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={12} className="text-center">
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      데이터 로딩 중...
                    </td>
                  </tr>
                ) : competitions.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center">
                      데이터가 없습니다.
                    </td>
                  </tr>
                ) : (
                  competitions.map((comp: Competition, index: number) => (
                    <tr key={comp.competitionIdx || index}>
                      <td>{index + 1}</td>
                      <td>{comp.regionName}</td>
                      <td>{comp.sportName}</td>
                      <td>{comp.competitionName}</td>
                      <td>{comp.displayName || ""}</td>
                      <td className="p-1">
                        {comp.imageUrl && (
                          <Image
                            src={comp.imageUrl}
                            width={40}
                            height={30}
                            style={{ width: "auto", height: "30px" }}
                            unoptimized
                            alt="League"
                          />
                        )}
                      </td>
                      <td>{comp.sort || ""}</td>
                      <td className={comp.isMain === 0 ? "text-red" : ""}>
                        {comp.isMain === 0 ? <InactiveIcon /> : null}
                      </td>
                      <td>
                        {comp.prematchUseYN === 1 ? (
                          <i className="fas fa-check text-blue"></i>
                        ) : null}
                      </td>
                      <td>
                        {comp.liveUseYN === 1 ? (
                          <i className="fas fa-check text-blue"></i>
                        ) : null}
                      </td>
                      <td className="p-1" style={{ whiteSpace: "nowrap" }}>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary w-60px text-white"
                          onClick={() =>
                            getCompetitionDetail(
                              comp.competitionIdx,
                              comp.competitionName,
                              comp.regionName,
                              comp.sportName,
                              comp.displayName || "",
                              comp.imageUrl || "",
                              comp.sort,
                              comp.isMain,
                              comp.prematchUseYN,
                              comp.liveUseYN,
                              comp.updateUserName || "",
                              comp.updateDate || ""
                            )
                          }
                        >
                          <i className="fa fa-pencil-alt me-1"></i>수정
                        </button>
                      </td>
                      <td>{comp.updateDate || ""}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </form>
        </div>
      </div>

      <div
        className={modalClasses}
        id="modalCompetition"
        tabIndex={-1}
        aria-hidden={!isModalOpen}
        data-bs-backdrop="static"
        style={modalStyle}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "900px" }}
        >
          <div className="modal-content">
            <div className="panel panel-inverse mb-0">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa-solid fa-futbol me-1"></i>
                  </span>
                  <span id="modalTitle">스포츠 리그 설정</span>
                </h4>
                <div className="panel-heading-btn">
                  <a
                    href="#"
                    className="btn btn-xs btn-icon btn-default"
                    data-toggle="panel-expand"
                    data-tooltip-init="true"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-expand"></i>
                  </a>
                  <a
                    href="#"
                    className="btn btn-xs btn-icon btn-danger"
                    data-bs-dismiss="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCloseModal();
                    }}
                  >
                    <i className="fa fa-times"></i>
                  </a>
                </div>
              </div>
              <div className="panel-body">
                <form
                  ref={formRef}
                  id="sportCompetitionSetting"
                  action="/sport/competition/setting"
                  method="post"
                  encType="multipart/form-data"
                  onSubmit={handleModalSubmit}
                >
                  <input type="hidden" name="_token" value="" />
                  <input
                    type="hidden"
                    id="regionIdx"
                    name="regionIdx"
                    value={modalData.regionIdx}
                  />
                  <input
                    type="hidden"
                    id="sportIdx"
                    name="sportIdx"
                    value={modalData.sportIdx}
                  />
                  <input
                    type="hidden"
                    id="competitionIdx"
                    name="competitionIdx"
                    value={modalData.competitionIdx}
                  />
                  <table className="table table-bordered table-responsive align-middle bg-white text-center fw-bold">
                    <tbody>
                      <tr>
                        <th className="w-150px bg-gray-300">지역명</th>
                        <td className="w-300px" id="regionName">
                          {modalData.regionName}
                        </td>
                        <th className="w-150px bg-gray-300">종목명</th>
                        <td className="w-300px" id="sportName">
                          {modalData.sportName}
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">원 리그명</th>
                        <td id="competitionName">
                          {modalData.competitionName}
                        </td>
                        <th className="bg-gray-300">노출명</th>
                        <td className="p-1">
                          <input
                            type="text"
                            name="displayName"
                            id="displayName"
                            className="form-control"
                            value={modalData.displayName}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                displayName: e.target.value,
                              })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">순서</th>
                        <td className="p-1">
                          <input
                            type="text"
                            name="sort"
                            id="sort"
                            className="form-control w-80px number"
                            value={modalData.sort}
                            onChange={(e) =>
                              setModalData({
                                ...modalData,
                                sort: e.target.value,
                              })
                            }
                          />
                        </td>
                        <th className="bg-gray-300">메인노출</th>
                        <td className="p-1">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              id="isMain"
                              name="isMain"
                              value="1"
                              checked={modalData.isMain}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  isMain: e.target.checked,
                                })
                              }
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">프리매치</th>
                        <td className="p-1">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              id="prematchUseYN"
                              name="prematchUseYN"
                              value="1"
                              checked={modalData.prematchUseYN}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  prematchUseYN: e.target.checked,
                                })
                              }
                            />
                          </div>
                        </td>
                        <th className="bg-gray-300">???</th>
                        <td className="p-1">
                          <div className="form-check-inline me-0 form-switch">
                            <input
                              className="form-check-input w-35px"
                              type="checkbox"
                              id="liveUseYN"
                              name="liveUseYN"
                              value="1"
                              checked={modalData.liveUseYN}
                              onChange={(e) =>
                                setModalData({
                                  ...modalData,
                                  liveUseYN: e.target.checked,
                                })
                              }
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">?? ???</th>
                        <td className="p-1" colSpan={3}>
                          <div className="row">
                            {modalData.imageUrl && (
                              <img
                                id="oldImage"
                                src={modalData.imageUrl}
                                style={{ width: "auto", height: "30px" }}
                                alt=""
                              />
                            )}
                            <input
                              type="file"
                              name="imageUrl"
                              id="imageUrl"
                              ref={imageInputRef}
                              className="form-control w-300px"
                              accept="image/*"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300">???</th>
                        <td id="updateUserName">{modalData.updateUserName}</td>
                        <th className="bg-gray-300">?? ??</th>
                        <td id="updateDate">{modalData.updateDate}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-sm text-white"
                        disabled={isSubmitting}
                      >
                        <i className="fa fa-save me-1"></i>??
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm text-white"
                        data-bs-dismiss="modal"
                        onClick={handleCloseModal}
                      >
                        <i className="fa-solid fa-xmark me-2"></i>??
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="modal-spinner"
        className={`modal${isSubmitting ? " show" : ""}`}
        data-bs-backdrop="static"
        tabIndex={-1}
        aria-hidden={!isSubmitting}
        style={{
          display: isSubmitting ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            ??????. ?? ???????.
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default function SportCompetitionSettingPage() {
  return (
    <Suspense fallback={null}>
      <SportCompetitionSettingPageInner />
    </Suspense>
  );
}
