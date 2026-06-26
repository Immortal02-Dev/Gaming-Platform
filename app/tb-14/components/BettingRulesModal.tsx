'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface BettingRulesModalProps {
  isOpen: boolean
  onClose: () => void
}

const BettingRulesModal = ({ isOpen, onClose }: BettingRulesModalProps) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-container" id="betting-rules-modal-container" style={{ display: 'flex' }}>
      <div className="modal-wrapper" style={{ zIndex: 11, maxWidth: '1080px' }}>
        <div className="modal-header">
          <p className="modal-title">스포츠 베팅규정</p>
          <button className="modal-close-btn" id="modal-close-btn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M10 8.586L2.929 1.515L1.515 2.929L8.586 10l-7.071 7.071l1.414 1.414L10 11.414l7.071 7.071l1.414-1.414L11.414 10l7.071-7.071l-1.414-1.414L10 8.586z"
              />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-body-inner">
            <div className="modal-body-scroll">
              <div className="modal-scroll-inner">
                <div className="modal-content">
                  <div className="modal-content-inner">
                    <div className="cPlrww">
                      <div className="toastui-editor-client">
                        <div className="toastui-editor-contents">
                          <div className="kGWcST">
                            <h6>
                              <span style={{ color: '#e9ebec' }}>단폴</span>
                              <strong><span style={{ color: '#e9ebec' }}>/</span></strong>
                              <span style={{ color: '#e9ebec' }}>두폴</span>
                              <strong><span style={{ color: '#e9ebec' }}>/</span></strong>
                              <span style={{ color: '#e9ebec' }}>다폴</span>
                              <strong><span style={{ color: '#e9ebec' }}> </span></strong>
                              <span style={{ color: '#e9ebec' }}>베팅규정</span>
                              <strong><span style={{ color: '#e9ebec' }}> </span></strong>
                              <span style={{ color: '#e9ebec' }}>안내</span>
                            </h6>
                            <p><br /></p>
                            <p><br /></p>
                            <ul>
                              <li className="w-100">
                                <p>
                                  <span className="s1">단폴</span>
                                  <span className="s2"> </span>
                                  <span className="s1">베팅</span>
                                  <span className="s2"> </span>
                                  <span className="s1">시에는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배당률</span>
                                  <span className="s2"> 1.30 </span>
                                  <span className="s1">이상만</span>
                                  <span className="s2"> </span>
                                  <span className="s1">시스템에서</span>
                                  <span className="s2"> </span>
                                  <span className="s1">허용되며</span>
                                  <span className="s2">, </span>
                                  <span style={{ color: 'rgb(147, 153, 161)' }}>
                                    단폴더 베팅 시 0.05배당이 자동으로차감됩니다.
                                  </span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="s1">두폴</span>
                                  <span className="s2"> </span>
                                  <span className="s1">이상의</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배당률</span>
                                  <span className="s2"> 1.30 </span>
                                  <span className="s1">이상의</span>
                                  <span className="s2"> </span>
                                  <span className="s1">한</span>
                                  <span className="s2"> </span>
                                  <span className="s1">폴더가</span>
                                  <span className="s2"> </span>
                                  <span className="s1">반드시</span>
                                  <span className="s2"> </span>
                                  <span className="s1">포함되어야</span>
                                  <span className="s2"> </span>
                                  <span className="s1">하며</span>
                                  <span className="s2">, </span>
                                  <span className="s1">포함되지</span>
                                  <span className="s2"> </span>
                                  <span className="s1">않을</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우, 해당</span>
                                  <span className="s2"> </span>
                                  <span className="s1">베팅은</span>
                                  <span className="s2"> </span>
                                  <span className="s1">시스템에서</span>
                                  <span className="s2"> </span>
                                  <span className="s1">허용되지</span>
                                  <span className="s2"> </span>
                                  <span className="s1">않습니다</span>
                                  <span className="s2">.</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="s1">다폴</span>
                                  <span className="s2"> </span>
                                  <span className="s1">구성</span>
                                  <span className="s2"> </span>
                                  <span className="s1">시</span>
                                  <span className="s2"> 1.30 </span>
                                  <span className="s1">이하</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배당</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경기는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">롤링</span>
                                  <span className="s2"> </span>
                                  <span className="s1">계산</span>
                                  <span className="s2"> </span>
                                  <span className="s1">시</span>
                                  <span className="s2"> </span>
                                  <span className="s1">폴더</span>
                                  <span className="s2"> </span>
                                  <span className="s1">수에</span>
                                  <span className="s2"> </span>
                                  <span className="s1">포함되지</span>
                                  <span className="s2"> </span>
                                  <span className="s1">않습니다</span>
                                  <span className="s2">.</span>
                                </p>
                              </li>
                            </ul>
                            <table>
                              <thead>
                                <tr>
                                  <th><p><span style={{ color: '#e9ebec' }}>폴더수</span></p></th>
                                  <th><p><span style={{ color: '#e9ebec' }}>예시</span></p></th>
                                  <th><p><span style={{ color: '#e9ebec' }}>주의사항</span></p></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td><p><span style={{ color: '#e9ebec' }}>단폴</span></p></td>
                                  <td><p><span style={{ color: '#f83333' }}>배당 1.30 이상만 베팅가능</span></p></td>
                                  <td><p><span style={{ color: '#ff9c00' }}>1.30이상은 허용되나 지속적인 단폴베팅은 제재대상이 될수 있음</span></p></td>
                                </tr>
                                <tr>
                                  <td><p><span style={{ color: '#e9ebec' }}>두폴/다폴</span></p></td>
                                  <td><p><span style={{ color: '#f83333' }}>예시) A경기(1.15)+B경기(1.15)</span></p></td>
                                  <td><p><span style={{ color: '#ff9c00' }}>두 경기 합배당이 1.3 이상 충족 시에만 베팅 가능</span></p></td>
                                </tr>
                                <tr>
                                  <td><p><span style={{ color: '#e9ebec' }}>다폴</span></p></td>
                                  <td><p><span style={{ color: '#f83333' }}>예시) A경기(1.15)+B경기(1.15)+C경기(1.05)</span></p></td>
                                  <td><p><span style={{ color: '#ff9c00' }}>3폴더 이상 배팅시 1.3 이상 충족 시 베팅 가능</span></p></td>
                                </tr>
                              </tbody>
                            </table>
                            <p><br /></p>
                            <h5>
                              <span style={{ color: '#e9ebec' }}>크로스</span>
                              <strong><span style={{ color: '#e9ebec' }}> </span></strong>
                              <span style={{ color: '#e9ebec' }}>베팅</span>
                              <strong><span style={{ color: '#e9ebec' }}> [</span></strong>
                              <span style={{ color: '#e9ebec' }}>동일경기</span>
                              <strong><span style={{ color: '#e9ebec' }}> </span></strong>
                              <span style={{ color: '#e9ebec' }}>조합베팅</span>
                              <strong><span style={{ color: '#e9ebec' }}>] </span></strong>
                              <span style={{ color: '#e9ebec' }}>안내</span>
                            </h5>
                            <p>
                              <span className="s1">축구를</span>
                              <span className="s2"> </span>
                              <span className="s1">제외한</span>
                              <span className="s2"> </span>
                              <span className="s1">종목에</span>
                              <span className="s2"> </span>
                              <span className="s1">대해서는</span>
                              <span className="s2"> </span>
                              <span className="s1">승</span>
                              <span className="s2">/</span>
                              <span className="s1">무</span>
                              <span className="s2">/</span>
                              <span className="s1">패</span>
                              <span className="s2"> + </span>
                              <span className="s1">언오버</span>
                              <span className="s2"> </span>
                              <span className="s1">조합이</span>
                              <span className="s2"> </span>
                              <span className="s1">가능합니다</span>
                            </p>
                            <ul>
                              <li>
                                <p>
                                  <span className="s1">정상적이지</span>
                                  <span className="s2"> </span>
                                  <span className="s1">않은</span>
                                  <span className="s2"> </span>
                                  <span className="s1">기준점에</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배팅할</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배팅</span>
                                  <span className="s2"> </span>
                                  <span className="s1">취소</span>
                                  <span className="s2"> </span>
                                  <span className="s1">되며</span>
                                  <span className="s2">, </span>
                                  <span className="s1">적중시에도</span>
                                  <span className="s2"> </span>
                                  <span className="s1">적중금</span>
                                  <span className="s2"> </span>
                                  <span className="s1">회수</span>
                                  <span className="s2"> </span>
                                  <span className="s1">처리됩니다</span>
                                  <span className="s2">.</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="s1">축구</span>
                                  <span className="s2"> </span>
                                  <span className="s1">종목의</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                  <span className="s2"> </span>
                                  <span className="s1">승</span>
                                  <span className="s2">/</span>
                                  <span className="s1">무</span>
                                  <span className="s2">/</span>
                                  <span className="s1">패</span>
                                  <span className="s2"> + </span>
                                  <span className="s1">언오버</span>
                                  <span className="s2"> </span>
                                  <span className="s1">조합식으로</span>
                                  <span className="s2"> </span>
                                  <span className="s1">별도</span>
                                  <span className="s2"> </span>
                                  <span className="s1">발매됩니다</span>
                                  <span className="s2">.</span>
                                </p>
                                <p>
                                  (<span className="s1">경기에</span>
                                  <span className="s2"> </span>
                                  <span className="s1">따라</span>
                                  <span className="s2"> </span>
                                  <span className="s1">발매</span>
                                  <span className="s2"> </span>
                                  <span className="s1">유무는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">상이할</span>
                                  <span className="s2"> </span>
                                  <span className="s1">수</span>
                                  <span className="s2"> </span>
                                  <span className="s1">있습니다</span>
                                  <span className="s2">.)</span>
                                </p>
                              </li>
                            </ul>
                            <p><br /></p>
                            <h5><span style={{ color: '#e9ebec' }}>종목별 연장전 규정안내</span></h5>
                            <ul>
                              <li>
                                <p>
                                  <span className="s1">연장포함</span>
                                  <span className="s2"> </span>
                                  <span className="s1">결과</span>
                                  <span className="s2"> </span>
                                  <span className="s1">처리</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경기의</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                  <span className="s2"> [</span>
                                  <span className="s1">연장포함</span>
                                  <span className="s2">] </span>
                                  <span className="s1">표기되어</span>
                                  <span className="s2"> </span>
                                  <span className="s1">있습니다</span>
                                  <span className="s2">.</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="s1">표기</span>
                                  <span className="s2"> </span>
                                  <span className="s1">되어</span>
                                  <span className="s2"> </span>
                                  <span className="s1">있지</span>
                                  <span className="s2"> </span>
                                  <span className="s1">않은</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                  <span className="s2"> </span>
                                  <span className="s1">연장전</span>
                                  <span className="s2"> </span>
                                  <span className="s1">미포함</span>
                                  <span className="s2"> </span>
                                  <span className="s1">결과</span>
                                  <span className="s2"> </span>
                                  <span className="s1">처리</span>
                                  <span className="s2"> </span>
                                  <span className="s1">타입입니다</span>
                                  <span className="s2">.</span>
                                </p>
                              </li>
                            </ul>
                            <blockquote>
                              <p>
                                <Image
                                  src="https://p.staticube.com/3b036fcb/55fd2d61-8160-4f63-bea8-7b7bf0b4ca97.png"
                                  alt="연장포함 예시"
                                  width={800}
                                  height={400}
                                  style={{ maxWidth: '100%', height: 'auto' }}
                                />
                                위 이미지는 [연장포함] 의 이해를 돕기위한 예시입니다.
                              </p>
                            </blockquote>
                            <p><br /></p>
                            <h5><span style={{ color: '#e9ebec' }}>축베팅/보험베팅 규정안내</span></h5>
                            <ul>
                              <li>
                                <p>
                                  <span className="s1">시스템에서</span>
                                  <span className="s2"> </span>
                                  <span className="s1">허용하는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배팅은</span>
                                  <span className="s2"> </span>
                                  <span className="s1">모두</span>
                                  <span className="s2"> </span>
                                  <span className="s1">정상</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배팅으로</span>
                                  <span className="s2"> </span>
                                  <span className="s1">인정합니다</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="s1">다만</span>
                                  <span className="s2"> </span>
                                  <span className="s1">지속적으로</span>
                                  <span className="s2"> </span>
                                  <span className="s1">축베팅</span>
                                  <span className="s2">, </span>
                                  <span className="s1">보험베팅</span>
                                  <span className="s2"> </span>
                                  <span className="s1">만</span>
                                  <span className="s2"> </span>
                                  <span className="s1">이용시</span>
                                  <span className="s2"> </span>
                                  <span className="s1">최대</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배팅금</span>
                                  <span className="s2"> </span>
                                  <span className="s1">조정</span>
                                  <span className="s2">, </span>
                                  <span className="s1">이용</span>
                                  <span className="s2"> </span>
                                  <span className="s1">제약</span>
                                  <span className="s2"> </span>
                                  <span className="s1">등의</span>
                                  <span className="s2"> </span>
                                  <span className="s1">불이익이</span>
                                  <span className="s2"> </span>
                                  <span className="s1">발생할</span>
                                  <span className="s2"> </span>
                                  <span className="s1">수</span>
                                  <span className="s2"> </span>
                                  <span className="s1">있습니다</span>
                                  <span className="s2">.</span>
                                </p>
                              </li>
                            </ul>
                            <p><br /></p>
                            <h5><span style={{ color: '#e9ebec' }}>강력 제재사항</span></h5>
                            <ul>
                              <li>
                                <p>
                                  <span className="s1">스포츠</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경기에서</span>
                                  <span className="s2"> </span>
                                  <span className="s1">양방</span>
                                  <span className="s2"> </span>
                                  <span className="s1">혹은</span>
                                  <span className="s2"> </span>
                                  <span className="s1">시간차</span>
                                  <span className="s2"> </span>
                                  <span className="s1">양방</span>
                                  <span className="s2"> </span>
                                  <span className="s1">베팅</span>
                                  <span className="s2"> </span>
                                  <span className="s1">하는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="s1">배당</span>
                                  <span className="s2"> </span>
                                  <span className="s1">확인</span>
                                  <span className="s2"> </span>
                                  <span className="s1">사이트를</span>
                                  <span className="s2"> </span>
                                  <span className="s1">활용하여</span>
                                  <span className="s2"> </span>
                                  <span className="s1">배당률</span>
                                  <span className="s2"> </span>
                                  <span className="s1">하락</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경기를</span>
                                  <span className="s2"> </span>
                                  <span className="s1">주로</span>
                                  <span className="s2"> </span>
                                  <span className="s1">베팅하는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  <span className="s1">실시간</span>
                                  <span className="s2"> </span>
                                  <span className="s1">스포츠</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경기</span>
                                  <span className="s2"> </span>
                                  <span className="s1">상황에</span>
                                  <span className="s2"> </span>
                                  <span className="s1">대한</span>
                                  <span className="s2"> </span>
                                  <span className="s1">언</span>
                                  <span className="s2">/</span>
                                  <span className="s1">오버</span>
                                  <span className="s2"> </span>
                                  <span className="s1">및</span>
                                  <span className="s2"> </span>
                                  <span className="s1">핸디캡</span>
                                  <span className="s2"> </span>
                                  <span className="s1">등</span>
                                  <span className="s2"> </span>
                                  <span className="s1">실시간</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경기</span>
                                  <span className="s2"> </span>
                                  <span className="s1">상황을</span>
                                  <span className="s2"> </span>
                                  <span className="s1">악용하는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">베팅을</span>
                                  <span className="s2"> </span>
                                  <span className="s1">하는</span>
                                  <span className="s2"> </span>
                                  <span className="s1">경우</span>
                                </p>
                              </li>
                            </ul>
                            <p><br /></p>
                            <blockquote>
                              <p><span style={{ color: '#e9ebec' }}>야구, 배구 등 각종 경기의 경우, 베팅한 시점으로 최대 1분 이내에 득점 발생 시 적특처리 될 수 있습니다.</span></p>
                              <p><span style={{ color: '#e9ebec' }}>1분 이내에 득점이 발생한 모든 경기가 적특처리되는 것은 아니며, 실제 경기 상황과 베팅한 피드의 시스템상 오차가 있는 경우에만 처리됩니다.</span></p>
                              <p><span style={{ color: '#e9ebec' }}>데이터 송수신에 대한 시간차를 노려 라이브 베팅을 하시는 경우 강력한 제재 처리됩니다.</span></p>
                            </blockquote>
                            <p><br /></p>
                            <p><span style={{ color: '#ff9c00' }}>양방 및 악용 베팅을 하는 경우 저희 본사에서는 강력히 제재를 취할 예정이며,</span></p>
                            <p><span style={{ color: '#ff9c00' }}>금액의 손실과 회원자격이 박탈되는 문제가 생길 수 있으니 이점 참고하여 주의 부탁드립니다.</span></p>
                            <p><br /></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal-backdrop"
        id="betting-rules-modal-backdrop"
        style={{ zIndex: 10 }}
        onClick={onClose}
      />
    </div>
  )
}

export default BettingRulesModal
