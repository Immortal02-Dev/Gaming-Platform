'use client'

import Modal from './Modal'
import { useModal } from '@/lib/hooks/useModal'

const PowerballModal = () => {
  const { isOpen, openModal, closeModal } = useModal({
    modalId: 'powerball-modal',
    urlParam: 'main=minigame'
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} title="동행복권 파워볼">
        {/* Mini Game Details */}
        <div className="mini-game-details">
          {/* Mini Game Frame */}
          <div className="mini-game-box">
            <div className="mini-game-frame">
              <iframe
                id="gameFrame"
                src="https://dhpowerball.net/rpowerball/live.php"
                width="900"
                height="640"
                scrolling="no"
                frameBorder="0"
                className="mini-frame"
                style={{ transform: 'scale(0.859375) translateY(0px)' }}
              />
            </div>
          </div>

          {/* Mini Game Market */}
          <div className="mini-game-market">
            <div className="market-container">
              <div className="market-group-wrapper">
                <div data-name="파워볼" className="market-group">
                  <div className="market-list-header">
                    <div className="market-list-header-textbox">
                      <span className="market-list-title">파워볼</span>
                    </div>
                    <div className="market-list-header-btn"></div>
                  </div>
                  <div className="market-row">
                    <button className="odds-button">
                      <div className="odds-titlebox">
                        <strong className="odds-title oddsType-primary">
                          홀
                        </strong>
                      </div>
                      <span className="odds-value">1.95</span>
                    </button>
                    <button className="odds-button">
                      <div className="odds-titlebox">
                        <strong className="odds-title oddsType-danger">
                          짝
                        </strong>
                      </div>
                      <span className="odds-value">1.95</span>
                    </button>
                    <button className="odds-button">
                      <div className="odds-titlebox">
                        <strong className="odds-title oddsType-primary">
                          언더
                        </strong>
                      </div>
                      <span className="odds-value">
                        1.95/<em className="odds-special">4.5↓</em>
                      </span>
                    </button>
                    <button className="odds-button">
                      <div className="odds-titlebox">
                        <strong className="odds-title oddsType-danger">
                          오버
                        </strong>
                      </div>
                      <span className="odds-value">
                        1.95/<em className="odds-special">4.5↑</em>
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Additional market groups would go here */}
              </div>
            </div>

            {/* Betting Slip */}
            <form className="betslip-container">
              <div className="betslip-round">
                <div className="betslip-textbox">
                  <span className="betslip-label">197회차 결과추첨</span>
                  <div className="betslip-right">
                    <span className="betslip-value">03:45</span>
                  </div>
                </div>
                <div className="betslip-textbox">
                  <span className="betslip-label">197회차 베팅마감</span>
                  <div className="betslip-right">
                    <span className="betslip-value secondary">03:20</span>
                  </div>
                </div>
              </div>
              
              <div className="betslip-amount">
                <div className="betslip-textbox" style={{ flex: 'unset' }}>
                  <span className="betslip-label">보유머니</span>
                  <div className="betslip-right">
                    <span className="betslip-value">862,389원</span>
                  </div>
                </div>
                
                <div className="betslip-form">
                  <label htmlFor="amount" className="betslip-form-input">
                    <div className="betslip-form-label">
                      <span>베팅금액</span>
                    </div>
                    <div className="betslip-form-inputbox">
                      <input
                        id="amount"
                        autoComplete="off"
                        inputMode="numeric"
                        defaultValue="0"
                        name="amount"
                      />
                      <span className="betslip-form-unit">원</span>
                    </div>
                  </label>
                  
                  <div className="betslip-form-btns">
                    <button type="button" className="betslip-form-btn">오천</button>
                    <button type="button" className="betslip-form-btn">일만</button>
                    <button type="button" className="betslip-form-btn">오만</button>
                    <button type="button" className="betslip-form-btn">십만</button>
                    <button type="button" className="betslip-form-btn">백만</button>
                    <button type="button" className="betslip-form-btn">전액</button>
                  </div>
                </div>
              </div>
              
              <div className="betslip-pickbox">
                <div className="betslip-pickbox-text">
                  <em>마켓</em><span>-</span>
                </div>
                <div className="betslip-pickbox-text">
                  <em>선택픽</em><span>-</span>
                </div>
                <div className="betslip-pickbox-text">
                  <em>배당</em><span>-</span>
                </div>
                <div className="betslip-pickbox-text">
                  <em>베팅금액</em><span>-</span>
                </div>
                <div className="betslip-pickbox-text">
                  <em>당첨예상금액</em><span>-</span>
                </div>
              </div>
              
              <button
                type="button"
                disabled
                className="betslip-submit"
                style={{ width: '100%' }}
              >
                <div className="betslip-submit-title">베팅하기</div>
              </button>
            </form>
          </div>
        </div>

        {/* Bet History */}
        <div className="bet-history-container">
          <div className="bet-history-header">
            <div className="bet-history-titlebox">
              <p className="bet-history-title">베팅내역</p>
            </div>
            <button type="button" className="bet-history-delete-btn">
              <div className="bet-history-delete-btn-title">전체삭제</div>
            </button>
          </div>
          
          <div className="bet-history-list-container">
            <ul className="bet-history-list">
              {/* Bet history items would be rendered here */}
            </ul>
          </div>
        </div>
      </Modal>
      
      {/* Export the openModal function for use in Header */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.openPowerballModal = ${openModal}`
        }}
      />
    </>
  )
}

export default PowerballModal
