"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";

interface GameType {
  id: number;
  name: string;
  isClosed: number; // 0: 운영중, 1: 점검중
  category?: string;
}

interface GameTypeSettingResponse {
  gameTypeIdx: number;
  gameTypeName: string;
  gameCategory: string;
  gameTypeClose: number;
}

const INITIAL_GAMES: GameType[] = [
  { id: 1, name: "크로스", isClosed: 0 },
  { id: 9, name: "스페셜", isClosed: 0 },
  { id: 7, name: "라이브", isClosed: 0 },
  { id: 6, name: "프리매치", isClosed: 0 },
  { id: 2, name: "카지노", isClosed: 0 },
  { id: 3, name: "슬롯", isClosed: 0 },
  { id: 4, name: "파워볼(PBG)", isClosed: 0 },
  { id: 10, name: "EOS파워볼5분", isClosed: 0 },
  { id: 11, name: "EOS파워볼3분", isClosed: 0 },
  { id: 12, name: "코인파워볼5분", isClosed: 0 },
  { id: 13, name: "코인파워볼3분", isClosed: 0 },
  { id: 14, name: "코인사다리5분", isClosed: 0 },
  { id: 15, name: "코인사다리3분", isClosed: 0 },
  { id: 5, name: "플레이홀덤", isClosed: 1 },
  { id: 8, name: "파파홀덤", isClosed: 1 },
  { id: 18, name: "와일드홀덤", isClosed: 1 },
  { id: 19, name: "웹맞고", isClosed: 1 },
  { id: 20, name: "웹바둑이", isClosed: 1 },
  { id: 22, name: "로얄홀덤", isClosed: 0 },
];

export default function GameSettingPage() {
  const [games, setGames] = useState<GameType[]>(INITIAL_GAMES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGameSettings();
  }, []);

  const fetchGameSettings = async (options?: { withSpinner?: boolean }) => {
    const showSpinner = options?.withSpinner !== false;
    if (showSpinner) {
      setLoading(true);
    }

    try {
      const response = await fetch("/api/admin/game-setting", {
        credentials: "include",
      });
      const data = await response.json();

      if (data.ReturnCode === 0 && Array.isArray(data.data)) {
        const items: GameTypeSettingResponse[] = data.data;
        // Merge fetched data with initial list to preserve order/names
        setGames((prevGames) =>
          prevGames.map((game) => {
            const fetchedGame = items.find((g) => g.gameTypeIdx === game.id);
            return fetchedGame
              ? {
                  ...game,
                  isClosed:
                    typeof fetchedGame.gameTypeClose === "number"
                      ? fetchedGame.gameTypeClose
                      : 0,
                  category: fetchedGame.gameCategory,
                }
              : game;
          })
        );
      } else {
        alert(data.ReturnMessage || "게임 설정을 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("Failed to fetch game settings:", error);
      alert("게임 설정을 불러오는 중 오류가 발생했습니다.");
    } finally {
      if (showSpinner) {
        setLoading(false);
      }
    }
  };

  const handleStatusToggle = async (gameId: number, value: number) => {
    if (!confirm("상태 변경 하시겠습니까?")) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/game-setting/${gameId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          key: "gameTypeClose",
          value,
        }),
      });

      const data = await response.json();
      if (data.ReturnCode === 0) {
        await fetchGameSettings({ withSpinner: false });
        alert(data.ReturnMessage || "상태 변경 완료");
      } else {
        alert(data.ReturnMessage || "상태 변경 실패");
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("상태 변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* begin page-header */}
      <h1 className="page-header">
        <a href="/game/setting">
          <i className="fa fa-dice me-2"></i>게임 설정
        </a>
        <small></small>
      </h1>
      {/* end page-header */}

      {/* begin row */}
      <div className="row">
        {games.map((game) => (
          <div className="col-2" key={game.id}>
            <div className="panel panel-inverse">
              <div className="panel-heading">
                <h4 className="panel-title">
                  <span className="me-2 pull-left">
                    <i className="fa fa-cog"></i>
                  </span>
                  {game.name}
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
                <div className="row mb-2">
                  <label className="col-form-label w-auto text-nowrap">
                    점검 여부
                  </label>
                  <div className="btn-group w-auto">
                    <button
                      type="button"
                      className={`btn btn-default ${
                        game.isClosed === 1 ? "btn-danger" : ""
                      }`}
                      onClick={() => handleStatusToggle(game.id, 1)}
                    >
                      점검중
                    </button>
                    <button
                      type="button"
                      className={`btn btn-default ${
                        game.isClosed === 0 ? "btn-green" : ""
                      }`}
                      onClick={() => handleStatusToggle(game.id, 0)}
                    >
                      운영중
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* end row */}

      {loading && (
        <div
          id="modal-spinner"
          className="modal show"
          data-bs-backdrop="static"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "block",
          }}
        >
          <div className="modal-dialog d-flex justify-content-center modal-dialog-centered">
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              처리중입니다. 잠시 기다려주십시오.
            </button>
          </div>
        </div>
      )}

      <a
        href="javascript:;"
        className="btn btn-icon btn-success btn-circle btn-theme btn-scroll-to-top"
        data-toggle="scroll-to-top"
      >
        <i className="fa fa-angle-up"></i>
      </a>
    </Layout>
  );
}
