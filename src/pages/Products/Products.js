// import { data } from '../../data';
import { useData } from '../../context/';
import { ProductCard } from './components/ProductCard';
import { ProductOperations } from './components/ProductOperations';
import styles from './Products.module.css';

export function Products({ setRoute }) {
  const { products: data, showInventoryAll, showFastDelivery, sortBy, priceSlider } = useData();

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
    <>
      {data.length !== 0 ? (
        <div>
          <ProductOperations />
          {filteredData.length === 0 ? (
            <div className={styles.emptyProducts}>
              <h3>No Products available at this price</h3>
              <p>Please broaden your price range</p>
            </div>
          ) : (
            <div className={styles.container}>
              <Sidebar />
              <div className={styles.productContainer}>
                {filteredData.map((product) => (
                  <ProductCard product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1 style={{ marginTop: '5rem' }}>loadeeeeeeeeeeeeer</h1>
      )}
    </>
  );
}

function Sidebar() {
  const { showInventoryAll, showFastDelivery, priceSlider, dataDispatch } = useData();

  return (
    <div className={styles.sidebar}>
      <h3>Filter</h3>
      <h4>Sort By</h4>
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
      <ul className={styles.priceSlider}>
        <li> ₹0 - ₹{priceSlider}</li>
        <li>
          <input
            id="PRICE_RANGE"
            name="PRICE_RANGE"
            type="range"
            min="0"
            max="1000"
            step="100"
            value={priceSlider}
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
  );
}
