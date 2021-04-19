import { data } from '../../data';
import { useData } from '../../context/';
import { ProductCard } from './components/ProductCard';
import { ProductOperations } from './components/ProductOperations';
import styles from './Products.module.css';

export function Products({ setRoute }) {
  const { showInventoryAll, showFastDelivery, sortBy, priceSlider } = useData();

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
      {filteredData.length === 0 ? (
        <div className={styles.emptyProducts}>
          <h3>No Products available at this price</h3>
          <p>Please broaden your price range</p>
        </div>
      ) : (
        <div className={styles.container}>
          {filteredData.map((product) => (
            <ProductCard product={product} setRoute={setRoute} />
          ))}
        </div>
      )}
    </div>
  );
}
