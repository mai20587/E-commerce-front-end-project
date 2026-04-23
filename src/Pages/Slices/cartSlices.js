 import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
 

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart"))|| []
  },
  reducers: {

    addToCart: (state, action) => {
         const product=action.payload;
     const isExist = state.items.find((item)=>item.id==product.id);
       if (isExist) {
      isExist.qty++;
    } else {
       state.items.push({ ...product, qty: 1 });
      }
      localStorage.setItem("cart",JSON.stringify(state.items));
    toast.success('Product Added To Cart');
    },

    removeFromCart: (state, action) => {
    state.items = state.items.filter((item)=>item.id !== action.payload.id);
    localStorage.setItem("cart",JSON.stringify(state.items));
    toast.success('Removed from Cart');
    },
    ClearCart:(state)=>{
        state.items=[];
        localStorage.setItem("cart",JSON.stringify(state.items));
    toast.success('Cart is Empty');
    },
    IncreaseQTy(state,action){
       const item=action.payload;
       const product=state.items.find((product)=>product.id==item.id);
       if(product.qty <product.stock){
        product.qty+=1
       }

    },
      DecreaseQty(state,action){
          const item=action.payload;
       const product=state.items.find((product)=>product.id==item.id);
       if(product.qty>1){
        product.qty-=1
      }
 }

}});

export const { addToCart, removeFromCart,ClearCart,IncreaseQTy,DecreaseQty } = cartSlice.actions;
export default cartSlice.reducer;