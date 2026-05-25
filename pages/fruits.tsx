import React, { useState, useEffect } from 'react';
import styles from "../styles/fruits.module.css";

const FRUITS = [
  'Apple', 'Banana', 'Orange', 'Mango', 'Grapes', 'Pineapple', 'Strawberry', 'Watermelon', 'Peach', 'Cherry',
  'Kiwi', 'Blueberry', 'Papaya', 'Pear', 'Plum', 'Guava', 'Lemon', 'Lychee', 'Coconut', 'Fig'
];

function getRandomFruit(exclude: string[]) {
  const available = FRUITS.filter(fruit => !exclude.includes(fruit));
  return available[Math.floor(Math.random() * available.length)];
}

export default function FruitsBattle() {
  const [selected, setSelected] = useState<string[]>([]);
  const [left, setLeft] = useState<string | null>(null);
  const [right, setRight] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const [favorite, setFavorite] = useState<string | null>(null);

  // Only initialize fruits on the client to avoid hydration mismatch
  useEffect(() => {
    if (left === null && right === null) {
      const first = getRandomFruit([]);
      const second = getRandomFruit([first]);
      setLeft(first);
      setRight(second);
    }
    // eslint-disable-next-line
  }, []);

  const handleClick = (side: 'left' | 'right') => {
    if (favorite || left === null || right === null) return;
    const winner = side === 'left' ? left : right;
    const loser = side === 'left' ? right : left;
    const newSelected = [...selected, winner];
    setSelected(newSelected);
    setCount(count + 1);
    if (count + 1 === 10) {
      setFavorite(winner);
      return;
    }
    // Exclude all previously selected fruits and the current winner
    const exclude = [...newSelected, loser];
    let newFruit = getRandomFruit(exclude);
    // If all fruits are exhausted, allow repeats (fallback)
    if (!newFruit) {
      // Only the winner and loser left, just swap
      newFruit = loser;
    }
    if (side === 'left') {
      setRight(newFruit);
    } else {
      setLeft(newFruit);
    }
  };

  // Move the conditional return to the top of the component body
  if (left === null || right === null) {
    // Prevent rendering until fruits are initialized
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>🍉 Fruit Battle 🍍</h1>
        <p className={styles.subtitle}>Loading...</p>
      </div>
    );
  }

  const handleRestart = () => {
    setSelected([]);
    const first = getRandomFruit([]);
    const second = getRandomFruit([first]);
    setLeft(first);
    setRight(second);
    setCount(0);
    setFavorite(null);
  };

  const fruitEmojis = ['🍎', '🍌', '🍊', '🥭', '🍇', '🍍', '🍓', '🍉', '🍑', '🍒', '🥝', '🫐', '🧃', '🍐', '🫒'];
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
          <h1 className={styles.title}>🍉 Fruit Battle 🍍</h1>
          {favorite ? (
            <div>
              <h2 className={styles.subtitle}>Your favorite fruit is:</h2>
              <div className={styles.favorite}>{favorite} 🎉</div>
              <button className={styles.fruitBtn} style={{marginTop: 32}} onClick={handleRestart}>Start Again</button>
            </div>
          ) : (
            <>
              <p className={styles.subtitle}>Pick your favorite fruit! ({count + 1}/11)</p>
              <div className={styles.battle}>
                <button className={styles.fruitBtn} onClick={() => handleClick('left')}>{left}</button>
                <span className={styles.vs}>vs</span>
                <button className={styles.fruitBtn} onClick={() => handleClick('right')}>{right}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
