import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./Services/productservice";
import { thunk } from "redux-thunk";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await getProducts();  // Fetch products from API

    // Filter the items based on category
    const veg = response.filter(item => item.category === 'veg');
    const nonVeg = response.filter(item => item.category === 'Non-veg');
    console.log('API xxx veg items:', veg);

    // Return the filtered items
    return { veg, nonVeg };
  }
);

const productsSlice = createSlice({
                        name : 'products',
                        initialState : {
                            veg : [
                                    // {name : 'Tomato',price : 200.4},
                                    // {name : 'Potato',price : 100.5},
                                    // {name : 'Panneer',price : 400.0},
                                    // {name : 'Mushroom',price : 350.0},
                                    // {name : 'Cabbage',price : 70.8}
                                   ],
                            nonVeg : [
                                      //  {name : 'Chicken',price : 600.0},
                                      //  {name : 'Mutton',price : 1300.0},
                                      //  {name : 'Fish',price : 500.0},
                                      //  {name : 'Prawns',price :900.0}
                                      ],
                            status : ''
                                 },
                        reducers : {},
                        extraReducers: (builder) => {
                          builder.addCase(fetchProducts.pending, (state) => {
                              state.status = 'loading';
                            })
                            .addCase(fetchProducts.fulfilled, (state, action) => {
                              state.status = 'succeeded';
                              state.veg = action.payload.veg || [];
                              state.nonVeg = action.payload.nonVeg || [];
                            })
                            .addCase(fetchProducts.rejected, (state, action) => {
                              state.status = 'failed';
                              state.error = action.error.message;
                            });
                        },
                });

const cartSlice = createSlice({
                        name :'cart',
                        initialState :[],
                        reducers :{
                              addToCart :(state,action) => {
                                    const item = state.find(item => item.name === action.payload.name)
                                    if(item)
                                    {
                                       item.quantity+=1;
                                     }
                                     else
                                     {
                                       state.push({...action.payload, quantity:1});
                                       }                 
                                     },
                              increment :(state,action) => {
                                           const item = state.find(item => item.name === action.payload.name);
                                           if(item)
                                           {
                                            item.quantity+=1;
                                           }
                                       },
                              decrement :(state,action) => {
                                          const item = state.find(item=> item.name === action.payload.name);
                                          if(item && item.quantity>1)
                                          {
                                            item.quantity-=1;
                                          }
                                          else
                                          {
                                            return (state.filter((item)=>item.name != action.payload.name));
                                          }
                                    },

                              remove : (state,action) => {
                                      const item = state.find(item => item.name === action.payload.name);
                                      if(item)
                                      {
                                        return (state.filter((item) => item.name != action.payload.name));
                                      }
                              },

                              clearCart : () => []

                              }
                        }
)

const purchaseHistorySlice = createSlice({
                        name : 'purchaseHistory',
                        initialState : [],
                        reducers : {
                                  addPurchase : (state,action) => {
                                    state.push(action.payload);
                                  }
                        }

})

//configure the store
const store = configureStore({
                reducer : 
                        {products : productsSlice.reducer,
                          cart : cartSlice.reducer,
                          purchaseHistory : purchaseHistorySlice.reducer,
                        },
                        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
                    })


//export the store
export default store; 
export const {addToCart,increment,decrement,remove,clearCart} = cartSlice.actions;
export const {addPurchase} = purchaseHistorySlice.actions;