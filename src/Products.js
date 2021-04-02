import { data } from './data';
import { useData } from './dataContext';
import ProductCard from './ProductCard';

export function Products() {
  const { showInventoryAll, showFastDelivery, sortBy, dataDispatch } = useData();

  function getSortedData(productList, sortBy) {
    if (sortBy && sortBy === 'PRICE_HIGH_TO_LOW') {
      return [...productList].sort((a, b) => b.price - a.price);
    }

    if (sortBy && sortBy === 'PRICE_LOW_TO_HIGH') {
      return [...productList].sort((a, b) => a.price - b.price);
    }

    return productList;
  }

  function getFilteredData(productList, { showInventoryAll, showFastDelivery }) {
    return productList.filter(({ fastDelivery }) => (showFastDelivery ? fastDelivery : true)).filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const sortedData = getSortedData(data, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showInventoryAll,
    showFastDelivery,
  });

  return (
    <>
      <fieldset>
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
        <label htmlFor="PRICE_LOW_TO_HIGH"> Price: Low - High </label> <br /> <br /> <label htmlFor="PRICE_RANGE"> Price Range </label> <input id="PRICE_RANGE" name="PRICE_RANGE" type="range" />
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
      </fieldset>
      <div className="App">
        {' '}
        {filteredData.map((product) => (
          <ProductCard product={product} />
        ))}{' '}
      </div>
    </>
  );
}
