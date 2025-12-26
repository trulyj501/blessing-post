
import React, { useState } from 'react';
import { BlessingCard, CardStyle } from '../types';
import { generateBlessingText, generateCardImage } from '../services/geminiService';

interface CardGeneratorProps {
  onCardCreated: (card: BlessingCard) => void;
  goToFigure: () => void;
}

const STYLES: { id: CardStyle; label: string; icon: string }[] = [
  { id: 'watercolor', label: '따뜻한 수채화', icon: 'fa-palette' },
  { id: 'minimalist', label: '미니멀리즘', icon: 'fa-leaf' },
  { id: 'popart', label: '팝아트', icon: 'fa-bolt' },
  { id: 'fantasy', label: '신비로운 판타지', icon: 'fa-sparkles' },
];

const CardGenerator: React.FC<CardGeneratorProps> = ({ onCardCreated, goToFigure }) => {
  const [recipient, setRecipient] = useState('');
  const [theme, setTheme] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<CardStyle>('watercolor');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlessingCard | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !theme) return;

    setLoading(true);
    try {
      const [message, imageUrl] = await Promise.all([
        generateBlessingText(recipient, theme),
        generateCardImage(theme, selectedStyle)
      ]);

      const newCard: BlessingCard = {
        id: Math.random().toString(36).substr(2, 9),
        recipient,
        theme,
        message,
        imageUrl,
        style: selectedStyle,
        createdAt: Date.now()
      };

      setResult(newCard);
      onCardCreated(newCard);
    } catch (error) {
      console.error("Card generation failed", error);
      alert("카드 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-amber-100 border-t-amber-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-pen-nib text-amber-600 animate-pulse"></i>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif-kr">축복의 조각을 모으는 중...</h2>
        <p className="text-gray-500">AI 우체국 직원이 정성껏 카드를 제작하고 있습니다.</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 font-serif-kr">생성된 축복 카드</h2>
          <button 
            onClick={() => setResult(null)} 
            className="text-amber-600 font-medium hover:underline flex items-center"
          >
            <i className="fas fa-redo mr-2 text-sm"></i> 새로 만들기
          </button>
        </div>

        <div className="relative max-w-md mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-rose-200 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-white">
            <img src={result.imageUrl} alt="Blessing Card" className="w-full aspect-[3/4] object-cover" />
            <div className="p-8 text-center bg-white">
              <div className="mb-4 inline-flex items-center space-x-2">
                <span className="h-px w-6 bg-amber-200"></span>
                <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">
                  To. {result.recipient}
                </span>
                <span className="h-px w-6 bg-amber-200"></span>
              </div>
              <p className="text-xl font-serif-kr text-gray-800 leading-relaxed italic mb-4 px-2">
                "{result.message}"
              </p>
              <div className="mt-6 flex justify-center">
                <i className="fas fa-heart text-rose-200 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goToFigure}
            className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
          >
            <i className="fas fa-cube mr-3 text-pink-400"></i> 이 축복을 피규어로 간직하기
          </button>
          <button
            onClick={() => {
                const link = document.createElement('a');
                link.href = result.imageUrl;
                link.download = `blessing_${result.recipient}.png`;
                link.click();
            }}
            className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:border-amber-200 transition-all shadow-sm flex items-center justify-center"
          >
            <i className="fas fa-download mr-3 text-amber-500"></i> 이미지 저장
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-serif-kr">축복 카드 생성</h2>
        <p className="text-gray-500">전하고 싶은 진심을 입력하면 AI가 예술적인 카드로 만들어드립니다.</p>
      </header>

      <form onSubmit={handleGenerate} className="space-y-8">
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-amber-50 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <i className="fas fa-user-tag mr-2 text-amber-500"></i> 받는 사람
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="예: 사랑하는 부모님께"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-amber-200 focus:bg-white focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
              <i className="fas fa-comment-dots mr-2 text-amber-500"></i> 축복의 주제
            </label>
            <textarea
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="예: 새로운 출발을 응원하는 마음, 변치 않는 우정, 따뜻한 위로"
              rows={3}
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-amber-200 focus:bg-white focus:outline-none transition-all resize-none"
              required
            />
          </div>
        </section>

        <section>
          <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center">
            <i className="fas fa-wand-magic-sparkles mr-2 text-amber-500"></i> 아트 스타일 선택
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setSelectedStyle(style.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  selectedStyle === style.id
                    ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-md'
                    : 'border-gray-100 bg-white text-gray-400 hover:border-amber-200'
                }`}
              >
                <i className={`fas ${style.icon} text-xl mb-2`}></i>
                <span className="text-xs font-bold">{style.label}</span>
              </button>
            ))}
          </div>
        </section>

        <button
          type="submit"
          className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-xl shadow-amber-100 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center"
        >
          카드 생성하기 <i className="fas fa-arrow-right ml-3"></i>
        </button>
      </form>
    </div>
  );
};

export default CardGenerator;
