import { useData } from '../../../context';
import styles from './ProductCard.module.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState } from 'react';

export function ProductCard({ product, setRoute }) {
  const { id, image, productName, name, price, inStock, fastDelivery, level } = product;
  const { dataDispatch, cart, wishlist } = useData();

  function toggleAddOrRemoveToCart() {
    if (cart.find((cartItem) => cartItem.id === id)) {
      return (
        <button className="btn btn-primary" onClick={() => setRoute('cart')}>
          Go to Cart
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          onClick={() =>
            dataDispatch({
              type: 'ADD_TO_CART',
              payload: product,
            })
          }
        >
          Add to Cart
        </button>
      );
    }
  }

  const inWishlist = wishlist.find((wishlistItem) => wishlistItem.id === id);
  console.log(inWishlist);

  return (
    <div className={`card card-image ${styles.cardOverride}`}>
      <div className={`${styles.cardHeader} card-header`}>
        <img src={image} alt={productName} />
        <span
          className={`${styles.cardHeaderSpan}`}
          onClick={() => {
            console.log('clicked');
            dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: product });
          }}
        >
          {/* {inWishlist ? 'favorite' : 'favorite_border'} */}
          {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title">Nike Mercurial Dream Speed Superfly 8 Academy MG</h5>
        <p className="card-text">Multi-Ground Football Boot</p>
        <div className="card-price">₹ 8,995</div>
        {toggleAddOrRemoveToCart()}
        <span
          className={`${styles.cardHeaderSpan}`}
          onClick={() => {
            console.log('clicked');
            dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: product });
          }}
        >
          {/* {inWishlist ? 'favorite' : 'favorite_border'} */}
          {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </span>
      </div>
    </div>
  );
}

//   return (
//     <div>
//       <img src={image} width="100%" height="auto" alt={productName} />
//       <h3> {name} </h3>
//       <div> Rs. {price} </div>
//       {inStock && <div> In Stock </div>}
//       {!inStock && <div> Out of Stock </div>}
//       <div> {level} </div>
//       {fastDelivery ? <div> Fast Delivery </div> : <div> 3 days minimum </div>}
//       {toggleAddOrRemoveToCart()}
//       <button onClick={() => dataDispatch({ type: 'TOGGLE_FAVOURITE', payload: product })}>{inWishlist ? 'fav' : 'not fav'}</button>
//     </div>
//   );
// }
