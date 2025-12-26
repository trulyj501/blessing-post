
import React, { useState } from 'react';
import { BlessingCard } from '../types';
import { generateBlessingText, generateCardImage } from '../services/geminiService';

interface CardGeneratorProps {
  onCardCreated: (card: BlessingCard) => void;
  goToFigure: () => void;
}

const CardGenerator: React.FC<CardGeneratorProps> = ({ onCardCreated, goToFigure }) => {
  const [recipient, setRecipient] = useState('');
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BlessingCard | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !theme) return;

    setLoading(true);
    try {
      const [message, imageUrl] = await Promise.all([
        generateBlessingText(recipient, theme),
        generateCardImage(theme)
      ]);

      const newCard: BlessingCard = {
        id: Math.random().toString(36).substr(2, 9),
        recipient,
        theme,
        message,
        imageUrl,
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
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">우체국 직원이 카드를 그리고 있어요...</h2>
        <p className="text-gray-500">축복의 메시지를 담은 특별한 이미지를 생성 중입니다.</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 font-serif-kr">생성된 축복 카드</h2>
          <button 
            onClick={() => setResult(null)} 
            className="text-amber-600 font-medium hover:underline"
          >
            새로 만들기
          </button>
        </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-50 max-w-md mx-auto">
          <img src={result.imageUrl} alt="Blessing Card" className="w-full aspect-[3/4] object-cover" />
          <div className="p-8 text-center bg-white">
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full mb-4">
              To. {result.recipient}
            </span>
            <p className="text-xl font-serif-kr text-gray-800 leading-relaxed italic mb-4">
              "{result.message}"
            </p>
            <div className="w-12 h-px bg-amber-200 mx-auto mt-6"></div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={goToFigure}
            className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full transition-all"
          >
            <i className="fas fa-cube mr-2"></i> 이 카드를 피규어로 만들기
          </button>
          <button
            onClick={() => {
                const link = document.createElement('a');
                link.href = result.imageUrl;
                link.download = `blessing_${result.recipient}.png`;
                link.click();
            }}
            className="px-8 py-3 bg-white border-2 border-amber-200 text-amber-700 font-bold rounded-full hover:bg-amber-50 transition-all"
          >
            <i className="fas fa-download mr-2"></i> 이미지 저장하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 font-serif-kr">축복 카드 만들기</h2>
      <p className="text-gray-500 mb-8">당신의 따뜻한 마음을 AI와 함께 예술로 승화시켜보세요.</p>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">누구에게 보내나요?</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="예: 사랑하는 친구 지은에게"
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-400 focus:outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">어떤 축복을 전하고 싶나요? (주제)</label>
          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="예: 새로운 시작, 건강과 평안, 행복한 결혼 생활"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-amber-100 focus:border-amber-400 focus:outline-none transition-all"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          카드 생성하기
        </button>
      </form>
    </div>
  );
};

export default CardGenerator;
