import { useState } from 'react';
import { useData } from '../../../context';
import styles from './ProductOperations.module.css';
import CloseIcon from '@material-ui/icons/Close';

export function ProductOperations() {
  const [sortModal, showSortModal] = useState(false);
  const [filterModal, showFilterModal] = useState(false);
  const { showInventoryAll, showFastDelivery, sortBy, dataDispatch, priceSlider } = useData();

  return (
    <div className={styles.container}>
      <div className={styles.sort} onClick={() => showSortModal((sortModal) => !sortModal)}>
        Sort
      </div>
      {sortModal && (
        <div className={styles.sortModal}>
          <h3>Sort By</h3>
          <span onClick={() => showSortModal((sortModal) => !sortModal)}>
            <CloseIcon />
          </span>
          <ul>
            <li>
              <input
                type="radio"
                name="sort"
                id="PRICE_HIGH_TO_LOW"
                onChange={() =>
                  dataDispatch({
                    type: 'SORT',
                    payload: 'PRICE_HIGH_TO_LOW',
                  })
                }
              />
              <label htmlFor="PRICE_HIGH_TO_LOW"> Price: High-Low </label>
            </li>
            <li>
              <input
                type="radio"
                name="sort"
                id="PRICE_LOW_TO_HIGH"
                onChange={() =>
                  dataDispatch({
                    type: 'SORT',
                    payload: 'PRICE_LOW_TO_HIGH',
                  })
                }
              />
              <label htmlFor="PRICE_LOW_TO_HIGH"> Price: Low-High </label>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}
      <div className={styles.filter} onClick={() => showFilterModal((filterModal) => !filterModal)}>
        Filter
      </div>
    </div>
  );
}
