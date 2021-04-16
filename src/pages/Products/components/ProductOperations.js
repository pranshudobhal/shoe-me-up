import styles from './ProductOperations.module.css';

export function ProductOperations() {
  return (
    <div className={styles.container}>
      <div className={styles.sort}>Sort</div>
      <div className={styles.filter}>Filter</div>
    </div>
  );
}
