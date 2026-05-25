import React from 'react';
import styles from "../styles/battle.module.css";
import { useRouter } from 'next/router';

export default function GenderSelection() {
  const router = useRouter();

  const handleWoman = () => {
    router.push('/actresses');
  };

  const handleMan = () => {
    router.push('/actors');
  };

  const fruitEmojis = ['✨', '🎬', '🎥', '⭐', '🌟', '👑', '🎭', '💫', '🎪', '🎨', '🌹', '💎'];
  const floatingFruits = Array.from({ length: 12 }, (_, i) => ({
    emoji: fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)],
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
  }));

  return (
    <>
      <div className={styles.bg}>
        {floatingFruits.map((fruit, i) => (
          <div
            key={i}
            className={styles.fruitEmoji}
            style={{
              left: `${fruit.left}%`,
              top: `${fruit.top}%`,
              animationDelay: `${fruit.delay}s`,
            }}
          >
            {fruit.emoji}
          </div>
        ))}
      </div>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Who Do You Wanna?</h1>
          <p className={styles.subtitle}>Choose to continue:</p>
          <div className={styles.genderBattle}>
            <button className={styles.genderBtn} onClick={handleWoman}>
              <span className={styles.genderEmoji}>👩</span>
              I am a Woman
            </button>
            <button className={styles.genderBtn} onClick={handleMan}>
              <span className={styles.genderEmoji}>👨</span>
              I am a Man
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
