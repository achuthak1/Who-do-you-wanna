import React, { useState, useEffect } from 'react';
import styles from "../styles/battle.module.css";
import Link from 'next/link';

const ACTORS_DATA = [
  { name: 'Rajinikanth', image: 'https://i.pinimg.com/474x/a1/b2/c3/a1b2c3a1b2c3a1b2c3a1b2c3a1b2c3.jpg' },
  { name: 'Kamal Haasan', image: 'https://i.pinimg.com/474x/d4/e5/f6/d4e5f6d4e5f6d4e5f6d4e5f6d4e5f6.jpg' },
  { name: 'Prabhas', image: 'https://i.pinimg.com/474x/g7/h8/i9/g7h8i9g7h8i9g7h8i9g7h8i9g7h8i9.jpg' },
  { name: 'Mahesh Babu', image: 'https://i.pinimg.com/474x/j0/k1/l2/j0k1l2j0k1l2j0k1l2j0k1l2j0k1l2.jpg' },
  { name: 'Ram Charan', image: 'https://i.pinimg.com/474x/m3/n4/o5/m3n4o5m3n4o5m3n4o5m3n4o5m3n4o5.jpg' },
  { name: 'Yash', image: 'https://i.pinimg.com/474x/p6/q7/r8/p6q7r8p6q7r8p6q7r8p6q7r8p6q7r8.jpg' },
  { name: 'Allu Arjun', image: 'https://i.pinimg.com/474x/s9/t0/u1/s9t0u1s9t0u1s9t0u1s9t0u1s9t0u1.jpg' },
  { name: 'Suriya', image: 'https://i.pinimg.com/474x/v2/w3/x4/v2w3x4v2w3x4v2w3x4v2w3x4v2w3x4.jpg' },
  { name: 'Chiyaan Vikram', image: 'https://i.pinimg.com/474x/y5/z6/a7/y5z6a7y5z6a7y5z6a7y5z6a7y5z6a7.jpg' },
  { name: 'Dhanush', image: 'https://i.pinimg.com/474x/b8/c9/d0/b8c9d0b8c9d0b8c9d0b8c9d0b8c9d0.jpg' },
  { name: 'Ranveer Singh', image: 'https://i.pinimg.com/474x/e1/f2/g3/e1f2g3e1f2g3e1f2g3e1f2g3e1f2g3.jpg' },
  { name: 'Hrithik Roshan', image: 'https://i.pinimg.com/474x/h4/i5/j6/h4i5j6h4i5j6h4i5j6h4i5j6h4i5j6.jpg' },
  { name: 'Akshay Kumar', image: 'https://i.pinimg.com/474x/k7/l8/m9/k7l8m9k7l8m9k7l8m9k7l8m9k7l8m9.jpg' },
  { name: 'Shah Rukh Khan', image: 'https://i.pinimg.com/474x/n0/o1/p2/n0o1p2n0o1p2n0o1p2n0o1p2n0o1p2.jpg' },
  { name: 'Salman Khan', image: 'https://i.pinimg.com/474x/q3/r4/s5/q3r4s5q3r4s5q3r4s5q3r4s5q3r4s5.jpg' },
  { name: 'Aamir Khan', image: 'https://i.pinimg.com/474x/t6/u7/v8/t6u7v8t6u7v8t6u7v8t6u7v8t6u7v8.jpg' }
];

function getRandomActor(exclude: string[]) {
  const available = ACTORS_DATA.filter(actor => !exclude.includes(actor.name));
  return available[Math.floor(Math.random() * available.length)] || null;
}

export default function ActorsBattle() {
  const [selected, setSelected] = useState<string[]>([]);
  const [left, setLeft] = useState<typeof ACTORS_DATA[0] | null>(null);
  const [right, setRight] = useState<typeof ACTORS_DATA[0] | null>(null);
  const [count, setCount] = useState(0);
  const [favorite, setFavorite] = useState<string | null>(null);

  useEffect(() => {
    if (left === null && right === null) {
      const first = getRandomActor([]);
      const second = getRandomActor(first ? [first.name] : []);
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
    let newActor = getRandomActor(exclude);
    if (!newActor) {
      const loserData = ACTORS_DATA.find(a => a.name === loser);
      newActor = loserData || null;
    }
    if (side === 'left') {
      setRight(newActor);
    } else {
      setLeft(newActor);
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
    const first = getRandomActor([]);
    const second = getRandomActor(first ? [first.name] : []);
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
          <h1 className={styles.title}>👨 Actor Battle 👨</h1>
          {favorite ? (
            <div>
              <h2 className={styles.subtitle}>Your favorite actor is:</h2>
              <div className={styles.favorite}>{favorite} 🎬</div>
              <button className={styles.fruitBtn} style={{marginTop: 32}} onClick={handleRestart}>Vote Again</button>
            </div>
          ) : (
            <>
              <p className={styles.subtitle}>Pick your favorite actor! ({count + 1}/11)</p>
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
