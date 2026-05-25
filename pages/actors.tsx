import React, { useState, useEffect } from 'react';
import styles from "../styles/battle.module.css";
import Link from 'next/link';

const ACTORS_DATA = [
  { name: 'Rajinikanth', image: 'https://via.placeholder.com/220x280/FF6B6B/FFFFFF?text=Rajinikanth' },
  { name: 'Kamal Haasan', image: 'https://via.placeholder.com/220x280/4ECDC4/FFFFFF?text=Kamal' },
  { name: 'Prabhas', image: 'https://via.placeholder.com/220x280/FFE66D/000000?text=Prabhas' },
  { name: 'Mahesh Babu', image: 'https://via.placeholder.com/220x280/95E1D3/FFFFFF?text=Mahesh' },
  { name: 'Ram Charan', image: 'https://via.placeholder.com/220x280/F38181/FFFFFF?text=Ram+Charan' },
  { name: 'Yash', image: 'https://via.placeholder.com/220x280/AA96DA/FFFFFF?text=Yash' },
  { name: 'Allu Arjun', image: 'https://via.placeholder.com/220x280/FCBAD3/FFFFFF?text=Allu+Arjun' },
  { name: 'Suriya', image: 'https://via.placeholder.com/220x280/A8D8EA/FFFFFF?text=Suriya' },
  { name: 'Chiyaan Vikram', image: 'https://via.placeholder.com/220x280/FF9999/FFFFFF?text=Vikram' },
  { name: 'Dhanush', image: 'https://via.placeholder.com/220x280/99CCFF/FFFFFF?text=Dhanush' },
  { name: 'Ranveer Singh', image: 'https://via.placeholder.com/220x280/99FF99/000000?text=Ranveer' },
  { name: 'Hrithik Roshan', image: 'https://via.placeholder.com/220x280/FFCC99/000000?text=Hrithik' },
  { name: 'Akshay Kumar', image: 'https://via.placeholder.com/220x280/FF99CC/FFFFFF?text=Akshay' },
  { name: 'Shah Rukh Khan', image: 'https://via.placeholder.com/220x280/CC99FF/FFFFFF?text=SRK' },
  { name: 'Salman Khan', image: 'https://via.placeholder.com/220x280/99FFCC/000000?text=Salman' },
  { name: 'Aamir Khan', image: 'https://via.placeholder.com/220x280/FFFF99/000000?text=Aamir' }
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
