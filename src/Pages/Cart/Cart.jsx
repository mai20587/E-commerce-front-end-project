import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClearCart, DecreaseQty,IncreaseQTy, removeFromCart } from "../Slices/cartSlices";


export const Cart=()=>{
    const {items}= useSelector((state)=>state.cart);
    const totalAmount=items.reduce((prev,item)=>prev+item.qty*item.price,0)
    const dispatch=useDispatch();
    return(
        <div > 
            <h2> Cart </h2>
            {items.map((item)=>{
                return(
                    <div>
                        <img src={item.thumbnail} alt={item.title}/>
                        <h4>{item.title}</h4>
                        <Button variant="light"  onClick={()=>dispatch(IncreaseQTy(item))}> +1</Button>
                         <Button variant="light"  onClick={()=>dispatch(DecreaseQty(item))}> -1</Button>
                        <p> QTY: {item.qty}</p>
                        <Button variant="danger"  onClick={()=>dispatch(removeFromCart(item))}> Remove</Button>
                        
                        
                    </div>
                );
                })}
                <h2>Total Amount:{totalAmount.toFixed(2)}</h2>
                <Button variant="primary" className=" my-5" onClick={()=>dispatch(ClearCart())}>Clear Cart</Button>
            </div>
    );
};