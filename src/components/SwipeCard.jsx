'use client';
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SwipeCard = ({ subsidy, onSwipe }) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // 難易度に応じたカラーを設定
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-50 border-green-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'hard':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  // 締切日までの残り日数を計算
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleDragStart = (event, info) => {
    setDragStart({ x: info.point.x, y: info.point.y });
  };

  const handleDragEnd = (event, info) => {
    const dragDistance = info.point.x - dragStart.x;
    
    // 右にスワイプ (100px以上) で「興味あり」
    if (dragDistance > 100) {
      controls.start({
        x: 500,
        opacity: 0,
        transition: { duration: 0.5 }
      }).then(() => {
        onSwipe('right', subsidy.id);
      });
    } 
    // 左にスワイプ (-100px以下) で「興味なし」
    else if (dragDistance < -100) {
      controls.start({
        x: -500,
        opacity: 0,
        transition: { duration: 0.5 }
      }).then(() => {
        onSwipe('left', subsidy.id);
      });
    } 
    // どちらでもない場合は元の位置に戻す
    else {
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      });
    }
  };

  const daysUntilDeadline = getDaysUntilDeadline(subsidy.deadline);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={controls}
      className={`w-80 h-96 rounded-2xl shadow-lg overflow-hidden ${getDifficultyColor(subsidy.difficulty)}`}
      whileTap={{ scale: 1.05 }}
      style={{ touchAction: 'none' }}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="mb-auto">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{subsidy.title}</h2>
          <p className="text-gray-600 mb-4">{subsidy.description}</p>
          
          <div className="bg-white bg-opacity-70 rounded-lg p-3 mb-3">
            <p className="font-semibold text-gray-800">支給額: {subsidy.amount}</p>
          </div>
          
          {subsidy.tags && subsidy.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {subsidy.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-white bg-opacity-70 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <div className={`p-2 rounded-lg text-center ${
            daysUntilDeadline < 30 
              ? 'bg-red-100 text-red-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <p className="text-sm">
              {daysUntilDeadline < 30 
                ? `締切まであと${daysUntilDeadline}日！` 
                : `締切: ${subsidy.deadline}`
              }
            </p>
          </div>
          
          <div className="mt-4 text-center text-gray-500 text-xs">
            <p>← スワイプして選択 →</p>
            <div className="flex justify-between mt-1">
              <span>興味なし</span>
              <span>興味あり</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;