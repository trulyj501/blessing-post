
import React, { useState } from 'react';
import { BlessingCard } from '../types';

interface MailServiceProps {
  savedCards: BlessingCard[];
}

const MailService: React.FC<MailServiceProps> = ({ savedCards }) => {
  const [isMailing, setIsMailing] = useState(false);
  const [activeCard, setActiveCard] = useState<BlessingCard | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState({ address: '', phone: '' });

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMailing(true);
    // Simulate API call for physical delivery
    setTimeout(() => {
      setIsMailing(false);
      setActiveCard(null);
      alert('축복이 배달 시스템에 접수되었습니다! (데모 기능)');
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif-kr">나의 축복 우편함</h2>
      <p className="text-gray-500 mb-10">당신이 만든 모든 축복의 기록입니다.</p>

      {savedCards.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-amber-50">
          <i className="fas fa-mailbox text-6xl text-amber-100 mb-6"></i>
          <p className="text-gray-400">우편함이 비어있습니다.<br/>첫 축복을 전해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedCards.map(card => (
            <div key={card.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-50 hover:shadow-md transition-shadow">
              <div className="relative group">
                <img src={card.imageUrl} alt={card.recipient} className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <button 
                        onClick={() => setActiveCard(card)}
                        className="opacity-0 group-hover:opacity-100 bg-white text-amber-600 px-4 py-2 rounded-full font-bold text-sm transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                        실물 우편 보내기
                    </button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800">To. {card.recipient}</h3>
                  <span className="text-[10px] text-gray-400 uppercase">
                    {new Date(card.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">"{card.message}"</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCard && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden animate-slide-up">
            <div className="p-6 bg-amber-600 text-white flex justify-between items-center">
              <h3 className="font-bold">실물 우편 접수</h3>
              <button onClick={() => setActiveCard(null)} className="hover:rotate-90 transition-transform">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSendMail} className="p-8 space-y-5">
              <div className="flex items-center space-x-4 mb-6">
                <img src={activeCard.imageUrl} className="w-20 h-20 rounded-lg object-cover shadow-sm" alt="Preview" />
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold">보낼 카드</p>
                  <p className="font-bold text-gray-800">To. {activeCard.recipient}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">배송 주소</label>
                <input
                  type="text"
                  placeholder="도로명 주소를 입력하세요"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">연락처</label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isMailing}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
                    isMailing ? 'bg-gray-400 cursor-wait' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {isMailing ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-circle-notch animate-spin mr-2"></i> 전송 중...
                    </span>
                  ) : '우편 발송하기'}
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-4 leading-tight">
                  이 기능은 실물 우편이 실제로 발송되지 않는 데모 모드입니다.<br/>블레싱 우체국의 디자인과 흐름을 체험해보세요.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailService;
