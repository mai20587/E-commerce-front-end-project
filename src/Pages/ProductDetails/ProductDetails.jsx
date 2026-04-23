import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../api/apiservices";


export const ProductDetails=()=>{
 const {id}=useParams();
 const [product,setproduct]=useState({});
 const [mainImage , setMainImage]= useState(null);
 const { images = [], title, price,rating,description,reviews, category,stock, 
warrantyInformation, discountPercentage

  } = product;

  useEffect(() => {
    async function getProductID() {
      try {
        const response = await API.get(`/products/${id}`);
        const productData = response.data;

        setproduct(productData);
        console.log(productData);
        if (productData.images && productData.images.length > 0) {
          setMainImage(productData.images[0]);
        }
    }catch(error){
        console.log(error);
    }
}
     getProductID()
},[id])
        
  


    return(
        <div className="d-flex align-items-center">
         <div className="image-container">
         <img src={mainImage}  alt={title} style={{width:"300px"}} /> 
         
         <div className="slider-container">
            {images.map((item, index)=>{
                return<img   key={index} src={item} alt={title}    onClick={() => setMainImage(item)}   style={{ width: "50px",height:"50px", cursor: "pointer", margin: "5px" }}/> 
                 
             })}
            </div>     
            
            
         <div className="m-1"> 
            <Link to={`/products/category/${category}`} className="f5-5">{category}</Link>
            <h3 className="my-1 display-6  fw-bold">{title}</h3>
            <h4> {rating}⭐⭐⭐⭐</h4>
            <a href="#reviews">{reviews?.length}Reviews</a>
            <br></br>
            <del>${price}</del>
            <span className="fw-bold m-3">${price-((price*discountPercentage)/100).toFixed(2)}</span>
            <p>{description}</p>
          </div> 
         </div>
              </div> 
    );
}
