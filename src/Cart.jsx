import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, remove } from "./store";
import { useState } from "react";

function Cart()
{
    const cartItems= useSelector(state=>state.cart);

    const dispatch= useDispatch();

    const listItems= cartItems.map((item,index) =>
                      (<li key={index}>{item.name} - ${item.price} - 
                      <button onClick={()=>dispatch(increment(item))}>+</button> 
                      <button onClick={()=>dispatch(decrement(item))}>-</button>
                      Quantity : {item.quantity}
                      <button onClick={()=>dispatch(remove(item))}>Remove</button>
                      </li>
                      )
                   )

    const [dpamount,setdpAmount] = useState(0);

    const handleDiscountPercentage = (dvalue) => {
                                            setdpAmount(dvalue);
                                        }

       const [coupenCode,setCoupenCode] =useState('');
       const [coupenDiscountPercentage,setCoupenDiscountPercentage] = useState(0);
                              
       const handleApplyCoupen = () =>{
                                      switch(coupenCode)
                                     {
                                        case 'DIWALI123':
                                          setCoupenDiscountPercentage(10);
                                          break;
                                        case 'PONGAL123':
                                          setCoupenDiscountPercentage(20);
                                          break;
                                        case 'DASARA123':
                                          setCoupenDiscountPercentage(30);
                                          break;
                                        default:
                                          alert('Invalid Coupen Code');
                                          setCoupenDiscountPercentage(0);             
                                          }
                                        }

    const calculateTotal = () => {
                const total = cartItems.reduce((sum,item) => sum+item.price*item.quantity,0);
                 const ftotal = parseFloat(total.toFixed(2));

                const discountAmount = total * (dpamount/100);
                const fdiscountAmount = parseFloat(discountAmount.toFixed(2));
                
                // let discountAmount = 0;
                // if(dpamount==10)
                // {
                //   discountAmount = total*0.1;
                // }
                // else if(dpamount==20)
                // {
                //   discountAmount = total*0.2;
                // }
                // else if(dpamount===30)
                // {
                //    discountAmount = total*0.3;
                // }
                // else
                // {
                //   discountAmount = 0;
                // }

                const coupenDiscountAmount = total * (coupenDiscountPercentage/100);
                const fcoupenDiscountAmount = parseFloat(coupenDiscountAmount.toFixed(2));

                const finalTotal = total-discountAmount-coupenDiscountAmount;
                const finfinalTotal = parseFloat(finalTotal.toFixed(2));

            return {
                    // total :parseFloat(total.toFixed(2)),
                    // discountAmount : parseFloat(discountAmount.toFixed(2)),
                    // finalTotal : parseFloat(finalTotal.toFixed(2))
                    ftotal,fdiscountAmount,fcoupenDiscountAmount,finfinalTotal

            }
          }
          // const {total,discountAmount,finalTotal} = calculateTotal();
          const {ftotal,fdiscountAmount,fcoupenDiscountAmount,finfinalTotal} = calculateTotal();

        

    return(
            <> 
              <h2>Shopping Cart</h2>
              { listItems.length===0 ?  ( 
                <h2>Cart is Empty</h2> 
                ) : ( <>
                      <ul>{listItems}</ul>
                         <p>Total before discounts : ${ftotal}</p>
                         <button onClick={() => handleDiscountPercentage(10)}>Apply 10% Discount</button>
                         <button onClick={() => handleDiscountPercentage(20)}>Apply 20% Discount</button>
                         <button onClick={() => handleDiscountPercentage(30)}>Apply 30% Discount</button>
                         <p>Discount percentage applied : {dpamount}%</p>
                         <p>Discount Amount : ${fdiscountAmount}</p>
                         
                          <label>Enter Coupen : </label>
                         <input type="text" value={coupenCode} onChange={(e) => setCoupenCode(e.target.value)} placeholder="enter coupen code" />
                          <button onClick={handleApplyCoupen}>Apply Coupen</button>
                          <p>Coupen discount Amount : ${fcoupenDiscountAmount}</p>

                          <p>Final Amout after discount : ${finfinalTotal}</p>
                          
                     </>
                )}
            </>
    )
}
export default Cart;