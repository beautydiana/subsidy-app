'use client';
import React from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import styles from './ui/SwipeCard.module.css';

const SwipeCard = ({ subsidy, onSwipe }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-45, 0, 45]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);
  
  // 興味あり/なしのインジケーター用の透明度
  const likeOpacity = useTransform(x, [0, 100, 300], [0, 0.8, 1]);
  const nopeOpacity = useTransform(x, [-300, -100, 0], [1, 0.8, 0]);

  // ドラッグ終了時の挙動を改善
  const handleDragEnd = (event, info) => {
    if (info.offset.x > 150) {
      x.set(1000); // 画面外に飛ばす
      onSwipe('right', subsidy);
    } else if (info.offset.x < -150) {
      x.set(-1000); // 画面外に飛ばす
      onSwipe('left', subsidy);
    }
  };

  return (
    <motion.div 
      className={styles.card}
      style={{ 
        x, 
        y,
        rotate,
        opacity,
      }}
      drag={true}
      dragElastic={0.7} // ドラッグの弾力性を高める
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 1.05 }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ x: 0, opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* 興味あり/なしのインジケーター */}
      <motion.div 
        className={styles.likeIndicator} 
        style={{ opacity: likeOpacity }}
      >
        興味あり!
      </motion.div>
      
      <motion.div 
        className={styles.nopeIndicator} 
        style={{ opacity: nopeOpacity }}
      >
        興味なし
      </motion.div>
      
      {/* 補助金情報 */}
      <div className={styles.cardContent}>
        <h2 className={styles.title}>{subsidy.title}</h2>
        <p className={styles.description}>{subsidy.description}</p>
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>補助額:</span> 
            <span className={styles.value}>{subsidy.amount}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>対象:</span> 
            <span className={styles.value}>{subsidy.eligibility}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>申請期限:</span> 
            <span className={styles.value}>{subsidy.deadline}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;