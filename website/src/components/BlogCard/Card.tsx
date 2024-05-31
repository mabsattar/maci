import React from "react";
import styles from "./card.module.css";

interface CardProps {
  title: string;
  excerpt: string;
  url: string;
  author: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, excerpt, url, author, content }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader} onClick={() => (window.location.href = url)}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.excerpt}>{excerpt}</p>
        <button onClick={() => (window.location.href = url)} className={styles.readMoreButton}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default Card;
