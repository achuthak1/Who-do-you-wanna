import React, { useState, useEffect } from 'react';
import styles from "../styles/battle.module.css";
import Link from 'next/link';

const ACTRESSES_DATA = [
  { name: 'Nayanthara', image: 'https://i.pinimg.com/474x/c4/fd/f8/c4fdf8c4e7d8c4e7d8c4e7d8c4e7d8c4.jpg' },
  { name: 'Samantha Ruth Prabhu', image: 'https://i.pinimg.com/474x/a1/b2/c3/a1b2c3a1b2c3a1b2c3a1b2c3a1b2c3.jpg' },
  { name: 'Anushka Shetty', image: 'https://i.pinimg.com/474x/d4/e5/f6/d4e5f6d4e5f6d4e5f6d4e5f6d4e5f6.jpg' },
  { name: 'Kajal Aggarwal', image: 'https://i.pinimg.com/474x/g7/h8/i9/g7h8i9g7h8i9g7h8i9g7h8i9g7h8i9.jpg' },
  { name: 'Tamannaah Bhatia', image: 'https://i.pinimg.com/474x/j0/k1/l2/j0k1l2j0k1l2j0k1l2j0k1l2j0k1l2.jpg' },
  { name: 'Pooja Hegde', image: 'https://i.pinimg.com/474x/m3/n4/o5/m3n4o5m3n4o5m3n4o5m3n4o5m3n4o5.jpg' },
  { name: 'Rashmika Mandanna', image: 'https://i.pinimg.com/474x/p6/q7/r8/p6q7r8p6q7r8p6q7r8p6q7r8p6q7r8.jpg' },
  { name: 'Amala Paul', image: 'https://i.pinimg.com/474x/s9/t0/u1/s9t0u1s9t0u1s9t0u1s9t0u1s9t0u1.jpg' },
  { name: 'Alia Bhatt', image: 'https://i.pinimg.com/474x/v2/w3/x4/v2w3x4v2w3x4v2w3x4v2w3x4v2w3x4.jpg' },
  { name: 'Deepika Padukone', image: 'https://i.pinimg.com/474x/y5/z6/a7/y5z6a7y5z6a7y5z6a7y5z6a7y5z6a7.jpg' },
  { name: 'Vidya Balan', image: 'https://i.pinimg.com/474x/b8/c9/d0/b8c9d0b8c9d0b8c9d0b8c9d0b8c9d0.jpg' },
  { name: 'Shraddha Kapoor', image: 'https://i.pinimg.com/474x/e1/f2/g3/e1f2g3e1f2g3e1f2g3e1f2g3e1f2g3.jpg' },
  { name: 'Katrina Kaif', image: 'https://i.pinimg.com/474x/h4/i5/j6/h4i5j6h4i5j6h4i5j6h4i5j6h4i5j6.jpg' },
  { name: 'Priyanka Chopra', image: 'https://i.pinimg.com/474x/k7/l8/m9/k7l8m9k7l8m9k7l8m9k7l8m9k7l8m9.jpg' },
  { name: 'Aishwarya Rai', image: 'https://i.pinimg.com/474x/n0/o1/p2/n0o1p2n0o1p2n0o1p2n0o1p2n0o1p2.jpg' },
  { name: 'Mallika Sherawat', image: 'https://i.pinimg.com/474x/q3/r4/s5/q3r4s5q3r4s5q3r4s5q3r4s5q3r4s5.jpg' }
];

function getRandomActress(exclude: string[]) {
  const available = ACTRESSES_DATA.filter(actress => !exclude.includes(actress.name));
  return available[Math.floor(Math.random() * available.length)] || null;
}

export default function ActressesBattle() {
  const [selected, setSelected] = useState<string[]>([]);
  const [left, setLeft] = useState<typeof ACTRESSES_DATA[0] | null>(null);
  const [right, setRight] = useState<typeof ACTRESSES_DATA[0] | null>(null);
  const [count, setCount] = useState(0);
  const [favorite, setFavorite] = useState<string | null>(null);

  useEffect(() => {
    if (left === null && right === null) {
      const first = getRandomActress([]);
      const second = getRandomActress(first ? [first.name] : []);
      setLeft(first || null);
      setRight(second || null);
    }
  }, []);

  const handleClick = (side: 'left' | 'right') => {
    if (favorite || left === null || right === null) return;
    const winner = side === 'left' ? left.name : right.name;
    const loser = side === 'left' ? right.name : left.name;
    const newSelected = [...selected, winner];
    setSelected(newSelected);
    setCount(count + 1);
    if (count + 1 === 10) {
      setFavorite(winner);
      return;
    }
    const exclude = [...newSelected, loser];
    let newActress = getRandomActress(exclude);
    if (!newActress) {
      const loserData = ACTRESSES_DATA.find(a => a.name === loser);
      newActress = loserData || null;
    }
    if (side === 'left') {
      setRight(newActress);
    } else {
      setLeft(newActress);
    }
  };

  if (left === null || right === null) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Who Do You Wanna?</h1>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </div>
    );
  }

  const handleRestart = () => {
    setSelected([]);
    const first = getRandomActress([]);
    const second = getRandomActress(first ? [first.name] : []);
    setLeft(first || null);
    setRight(second || null);
    setCount(0);
    setFavorite(null);
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
        <Link href="/" style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
          <button style={{ padding: '8px 16px', backgroundColor: '#ff4e50', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>← Back</button>
        </Link>
        <div className={styles.card}>
          <h1 className={styles.title}>👩 Actress Battle 👩</h1>
          {favorite ? (
            <div>
              <h2 className={styles.subtitle}>Your favorite actress is:</h2>
              <div className={styles.favorite}>{favorite} 🎬</div>
              <button className={styles.fruitBtn} style={{marginTop: 32}} onClick={handleRestart}>Vote Again</button>
            </div>
          ) : (
            <>
              <p className={styles.subtitle}>Pick your favorite actress! ({count + 1}/11)</p>
              <div className={styles.battle}>
                <button 
                  className={styles.actressBtn}
                  style={{ backgroundImage: `url('${left?.image}')` }}
                  onClick={() => handleClick('left')}
                >
                  <div className={styles.actressName}>{left?.name}</div>
                </button>
                <span className={styles.vs}>vs</span>
                <button 
                  className={styles.actressBtn}
                  style={{ backgroundImage: `url('${right?.image}')` }}
                  onClick={() => handleClick('right')}
                >
                  <div className={styles.actressName}>{right?.name}</div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
