'use client';
import { useState, useEffect } from 'react';
import SwipeCard from '../SwipeCard';
import { subsidies } from '../../data/subsidies';

const SubsidySwiper = () => {
  const [currentSubsidies, setCurrentSubsidies] = useState(subsidies || []);
  const [likedSubsidies, setLikedSubsidies] = useState([]);
  const [viewedSubsidies, setViewedSubsidies] = useState([]);
  
  useEffect(() => {
    console.log('subsidies data:', subsidies); // データの存在確認
  }, []);

  const handleSwipe = (direction, subsidyId) => {
    // 現在の表示中の補助金から、スワイプされた補助金を削除
    setCurrentSubsidies(prev => prev.filter(subsidy => subsidy.id !== subsidyId));
    
    // スワイプ方向に応じて処理
    if (direction === 'right') {
      // 「興味あり」としてライクリストに追加
      const likedSubsidy = subsidies.find(subsidy => subsidy.id === subsidyId);
      setLikedSubsidies(prev => [...prev, likedSubsidy]);
    }
    
    // どの方向でも「見た」リストに追加
    setViewedSubsidies(prev => [...prev, subsidyId]);
  };

  // すべての補助金をスワイプし終わった場合のメッセージ
  if (currentSubsidies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[70vh] text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">すべての補助金をチェックしました！</h2>
        <p className="text-gray-600 mb-6">あなたに合った補助金が見つかりましたか？</p>
        
        {likedSubsidies.length > 0 ? (
          <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">興味を持った補助金: {likedSubsidies.length}件</h3>
            <ul className="text-left text-sm text-gray-600">
              {likedSubsidies.map(subsidy => (
                <li key={subsidy.id} className="py-1">・{subsidy.title}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 italic mb-4">興味を持った補助金はありませんでした</p>
        )}
        
        <button 
          onClick={() => setCurrentSubsidies(subsidies)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full font-medium transition-colors"
        >
          もう一度チェックする
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[70vh] w-full">
      <div className="relative w-80 h-96">
        {currentSubsidies.slice(0, 3).map((subsidy, index) => (
          <div 
            key={subsidy.id} 
            className="absolute left-0 top-0"
            style={{ 
              zIndex: currentSubsidies.length - index,
              transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
              opacity: index === 0 ? 1 : 0.8 - index * 0.2
            }}
          >
            <SwipeCard subsidy={subsidy} onSwipe={handleSwipe} />
          </div>
        ))}
        
        {/* 進捗状況 */}
        <div className="absolute -bottom-10 w-full text-center">
          <p className="text-xs text-gray-500">
            {viewedSubsidies.length} / {subsidies.length} 件チェック済み
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubsidySwiper;