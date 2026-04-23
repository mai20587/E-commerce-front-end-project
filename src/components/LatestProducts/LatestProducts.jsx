import { API } from "../../api/apiservices";
import React, { useEffect, useState } from "react";
import { ProductPreview } from "../ProductPreview/ProductPreview";
import { Paginator } from "../Paginator/Paginator";
export const LatestProducts=()=>{
   const[products,setproducts]=useState([]);
 useEffect(()=>{
    async function  fetchLatestProducts() {

     try{
        const response=await API.get("/products?limit=9&sort=createdAt");
        console.log(response.data.products);
        setproducts(response.data.products);

     }catch(error){
        console.log(error);
     }

        
    }fetchLatestProducts();
 },[])


 return(
    <>
        <h1  className="display-6 text-secondary"> LatestProducts</h1>
        <ProductPreview products={products}/>
        </>
    );
}