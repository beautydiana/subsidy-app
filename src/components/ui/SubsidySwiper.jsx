'use client';
import { useState, useEffect } from 'react';
import SwipeCard from '../SwipeCard';
import { subsidies } from '../../data/subsidies';
import SubsidyResults from './SubsidyResults';

const SubsidySwiper = ({ filteredSubsidies, userProfile }) => {
  const [currentSubsidies, setCurrentSubsidies] = useState(filteredSubsidies || subsidies || []);
  const [likedSubsidies, setLikedSubsidies] = useState([]);
  const [viewedSubsidies, setViewedSubsidies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  useEffect(() => {
    console.log('subsidies data:', currentSubsidies); // データの存在確認
  }, [currentSubsidies]);

  const handleSwipe = (direction, subsidyId) => {
    // 現在の表示中の補助金から、スワイプされた補助金を削除
    setCurrentSubsidies(prev => prev.filter(subsidy => subsidy.id !== subsidyId));
    
    // スワイプ方向に応じて処理
    if (direction === 'right') {
      // 「興味あり」としてライクリストに追加
      const likedSubsidy = (filteredSubsidies || subsidies).find(subsidy => subsidy.id === subsidyId);
      setLikedSubsidies(prev => [...prev, likedSubsidy]);
    }
    
    // どの方向でも「見た」リストに追加
    setViewedSubsidies(prev => [...prev, subsidyId]);
  };

  // すべての補助金をスワイプし終わった場合は結果表示
  if (currentSubsidies.length === 0 || showResults) {
    return <SubsidyResults likedSubsidies={likedSubsidies} userProfile={userProfile} />;
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
            {viewedSubsidies.length} / {(filteredSubsidies || subsidies).length} 件チェック済み
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubsidySwiper;