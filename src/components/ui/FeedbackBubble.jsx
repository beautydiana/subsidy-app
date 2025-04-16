'use client';
import React from 'react';
import { motion } from 'framer-motion';
import styles from './FeedbackBubble.module.css';

const FeedbackBubble = ({ message, type = 'neutral' }) => {
  // 吹き出しのタイプに応じた色やアイコンを設定
  const bubbleVariants = {
    positive: {
      backgroundColor: '#e1f5e1',
      borderColor: '#4cd964',
      icon: '😄'
    },
    neutral: {
      backgroundColor: '#e1f1ff',
      borderColor: '#007aff',
      icon: '🤔'
    },
    negative: {
      backgroundColor: '#ffe1e1',
      borderColor: '#ff3b30',
      icon: '😅'
    }
  };
  
  const bubbleStyle = bubbleVariants[type] || bubbleVariants.neutral;

  return (
    <motion.div
      className={styles.bubbleContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={styles.bubble} 
        style={{ 
          backgroundColor: bubbleStyle.backgroundColor,
          borderColor: bubbleStyle.borderColor 
        }}
      >
        <div className={styles.icon}>{bubbleStyle.icon}</div>
        <p className={styles.message}>{message}</p>
      </div>
      <div 
        className={styles.pointer}
        style={{ borderTopColor: bubbleStyle.backgroundColor }}
      />
    </motion.div>
  );
};

export default FeedbackBubble;