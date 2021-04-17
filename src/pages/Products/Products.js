import { data } from '../../data';
import { useData } from '../../context/';
import { ProductCard } from './components/ProductCard';
import { ProductOperations } from './components/ProductOperations';
import styles from './Products.module.css';

export function Products({ setRoute }) {
  const { showInventoryAll, showFastDelivery, sortBy, dataDispatch, priceSlider } = useData();

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === 'PRICE_HIGH_TO_LOW') {
      return [...productList].sort((a, b) => b.price - a.price);
    }

    if (sortBy && sortBy === 'PRICE_LOW_TO_HIGH') {
      return [...productList].sort((a, b) => a.price - b.price);
    }

    return productList;
  }

  function getFilteredData(productList, { showInventoryAll, showFastDelivery, priceSlider }) {
    return productList
      .filter(({ fastDelivery }) => (showFastDelivery ? fastDelivery : true))
      .filter(({ inStock }) => (showInventoryAll ? true : inStock))
      .filter(({ price }) => price < Number(priceSlider));
  }

  const sortedData = getSortedData(data, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showInventoryAll,
    showFastDelivery,
    priceSlider,
  });

  return (
    <div>
      <ProductOperations />
      {/* <fieldset>
        <legend> Sort By </legend>{' '}
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
        />{' '}
        <label htmlFor="PRICE_HIGH_TO_LOW"> Price: High - Low </label>{' '}
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
        />{' '}
        <label htmlFor="PRICE_LOW_TO_HIGH"> Price: Low - High </label> <br /> <br />
        <label htmlFor="PRICE_RANGE"> Price Range </label>
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
      </fieldset>
      <fieldset>
        <legend> Filters </legend>{' '}
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
        />{' '}
        <label htmlFor="TOGGLE_INVENTORY"> Include Out Of Stock </label>{' '}
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
        />{' '}
        <label htmlFor="TOGGLE_DELIVERY"> Fast Delivery Only </label>{' '}
      </fieldset> */}
      <div className={styles.container}>
        {filteredData.map((product) => (
          <ProductCard product={product} setRoute={setRoute} />
        ))}
      </div>
    </div>
  );
}
