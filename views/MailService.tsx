
import React, { useState } from 'react';
import { BlessingCard } from '../types';

interface MailServiceProps {
  savedCards: BlessingCard[];
}

const MailService: React.FC<MailServiceProps> = ({ savedCards }) => {
  const [isMailing, setIsMailing] = useState(false);
  const [activeCard, setActiveCard] = useState<BlessingCard | null>(null);
  const [sentCards, setSentCards] = useState<Set<string>>(new Set());

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCard) return;

    setIsMailing(true);
    // Simulate API call for physical delivery
    setTimeout(() => {
      setIsMailing(false);
      setSentCards(prev => new Set([...prev, activeCard.id]));
      setActiveCard(null);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif-kr">나의 축복 우편함</h2>
        <p className="text-gray-500">당신이 정성껏 만든 모든 축복의 기록들입니다.</p>
      </header>

      {savedCards.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[3rem] border border-amber-50 shadow-sm">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="fas fa-mailbox text-4xl text-gray-200"></i>
          </div>
          <p className="text-gray-400 font-medium">우편함이 아직 비어있습니다.<br/>첫 번째 축복을 생성해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {savedCards.map(card => {
            const isSent = sentCards.has(card.id);
            return (
              <div key={card.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-amber-50/50">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={card.imageUrl} alt={card.recipient} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  
                  {isSent && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-lg flex items-center z-10">
                      <i className="fas fa-paper-plane mr-2"></i> 발송 완료
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <button 
                          onClick={() => setActiveCard(card)}
                          className={`bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl flex items-center ${isSent ? 'cursor-default opacity-50' : 'hover:scale-105 active:scale-95'}`}
                          disabled={isSent}
                      >
                          {isSent ? '이미 발송됨' : '실물 우편 보내기'}
                          {!isSent && <i className="fas fa-chevron-right ml-2 text-xs text-amber-500"></i>}
                      </button>
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase">
                      {card.style} Art Card
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(card.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif-kr">To. {card.recipient}</h3>
                  <p className="text-sm text-gray-500 italic leading-relaxed line-clamp-2">"{card.message}"</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mailing Modal */}
      {activeCard && (
        <div className="fixed inset-0 bg-gray-900/60 z-[100] flex items-center justify-center p-6 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
            <div className="p-8 bg-amber-600 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold font-serif-kr">실물 우편 서비스</h3>
                <p className="text-amber-100 text-[10px] tracking-wider mt-1">REAL POST DELIVERY</p>
              </div>
              <button 
                onClick={() => setActiveCard(null)} 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSendMail} className="p-10 space-y-6">
              <div className="flex items-center p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
                <img src={activeCard.imageUrl} className="w-16 h-16 rounded-xl object-cover shadow-sm ring-2 ring-white" alt="Preview" />
                <div className="ml-5">
                  <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest">Selected Card</p>
                  <p className="font-bold text-gray-800 text-lg">To. {activeCard.recipient}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">배송지 주소</label>
                  <div className="relative">
                    <i className="fas fa-map-marker-alt absolute left-4 top-4 text-amber-300"></i>
                    <input
                      type="text"
                      placeholder="축복을 받을 분의 도로명 주소"
                      className="w-full pl-11 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-amber-200 focus:bg-white focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">수령인 연락처</label>
                  <div className="relative">
                    <i className="fas fa-phone absolute left-4 top-4 text-amber-300"></i>
                    <input
                      type="tel"
                      placeholder="010-0000-0000"
                      className="w-full pl-11 pr-5 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-amber-200 focus:bg-white focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isMailing}
                  className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transition-all transform active:scale-95 flex items-center justify-center ${
                    isMailing ? 'bg-gray-400 cursor-wait' : 'bg-gray-900 hover:bg-black'
                  }`}
                >
                  {isMailing ? (
                    <>
                      <i className="fas fa-circle-notch animate-spin mr-3"></i> 
                      우표를 부착하고 있습니다...
                    </>
                  ) : (
                    <>
                      축복 우편 발송하기 <i className="fas fa-paper-plane ml-3 text-amber-400"></i>
                    </>
                  )}
                </button>
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-center text-[10px] text-gray-400 leading-relaxed">
                      본 서비스는 데모 버전입니다. 실제로 우편물이 발송되지는 않으나, <br/>
                      <span className="font-bold">블레싱 우체국</span>의 따뜻한 배달 과정을 경험해보실 수 있습니다.
                    </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailService;
