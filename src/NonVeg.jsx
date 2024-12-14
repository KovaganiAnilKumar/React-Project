import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "./store";
import { useEffect } from "react";

function NonVeg()
{
  const nonVegProducts = useSelector(state => state.products.nonVeg)

  const dispatch = useDispatch();

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
    }, [dispatch]);

  const items = nonVegProducts.map((product,index) =>
                                        (<li key={index}>
                                            {product.name}  -  ${product.price.toFixed(2)} - <img src={`/images/${product.image}`}  alt={product.name} height={50} width={50} />
                                            <button onClick={()=>dispatch(addToCart(product))}> Add to Cart </button>
                                        </li>)
                          )

    return(
            <>
              <h2>Non Veg Products</h2>
              <ul>
                {items}
              </ul>
            </>
    )
}
export default NonVeg;