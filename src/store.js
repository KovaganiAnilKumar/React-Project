import { configureStore, createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
                        name : 'products',
                        initialState : {
                            veg : [
                                    {name : 'Tomato',price : 200.4},
                                    {name : 'Potato',price : 100.5},
                                    {name : 'Panneer',price : 400.0},
                                    {name : 'Mushroom',price : 350.0},
                                    {name : 'Cabbage',price : 70.8}
                                   ],
                            nonVeg : [
                                       {name : 'Chicken',price : 600.0},
                                       {name : 'Mutton',price : 1300.0},
                                       {name : 'Fish',price : 500.0},
                                       {name : 'Prawns',price :900.0}
                                      ],
                                 },
                        reducers : {}
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
                              }

                              }
                        }
)
//configure the store
const store = configureStore({
                reducer : 
                        {products : productsSlice.reducer,
                          cart : cartSlice.reducer,
                        }
                    })
//export the store
export default store; 
export const {addToCart,increment,decrement,remove} = cartSlice.actions;