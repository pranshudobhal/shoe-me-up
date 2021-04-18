import { useState } from 'react';
import { useData } from '../../../context';
import styles from './ProductOperations.module.css';
import CloseIcon from '@material-ui/icons/Close';

export function ProductOperations() {
  const [sortModal, showSortModal] = useState(false);
  const [filterModal, showFilterModal] = useState(false);
  const { showInventoryAll, showFastDelivery, dataDispatch } = useData();

  return (
    <div className={styles.container}>
      <div className={styles.sort} onClick={() => showSortModal((sortModal) => !sortModal)}>
        Sort
      </div>
      {sortModal && (
        <div className={`${styles.modal} ${styles.sortModal}`}>
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
          </ul>
        </div>
      )}
      <div className={styles.filter} onClick={() => showFilterModal((filterModal) => !filterModal)}>
        Filter
      </div>
      {filterModal && (
        <div className={`${styles.modal} ${styles.filterModal}`}>
          <h3>Filter</h3>
          <span onClick={() => showFilterModal((filterModal) => !filterModal)}>
            <CloseIcon />
          </span>
          <h4>Availability</h4>
          <ul>
            <li>
              <input
                type="checkbox"
                name="TOGGLE_INVENTORY"
                id="TOGGLE_INVENTORY"
                checked={showInventoryAll}
                onChange={() =>
                  dataDispatch({
                    type: 'TOGGLE_INVENTORY',
                  })
                }
              />
              <label htmlFor="TOGGLE_INVENTORY"> Include Out Of Stock </label>
            </li>
          </ul>
          <h4>Delivery</h4>
          <ul>
            <li>
              <input
                type="checkbox"
                name="TOGGLE_DELIVERY"
                id="TOGGLE_DELIVERY"
                checked={showFastDelivery}
                onChange={() =>
                  dataDispatch({
                    type: 'TOGGLE_DELIVERY',
                  })
                }
              />
              <label htmlFor="TOGGLE_DELIVERY"> Fast Delivery Only </label>
            </li>
          </ul>
          <h4>Price</h4>
          <ul>
            <li>
              <input
                id="PRICE_RANGE"
                name="PRICE_RANGE"
                type="range"
                min="0"
                max="1000"
                step="100"
                onChange={(e) =>
                  dataDispatch({
                    type: 'PRICE_RANGE',
                    payload: e.target.value,
                  })
                }
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
