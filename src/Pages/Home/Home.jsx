
import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import Image1 from "../../assets/img1.jpg";
import Image2 from "../../assets/img2.jpg";
import Image3 from "../../assets/img3.jpg";
import { LatestProducts } from "../../components/LatestProducts/LatestProducts";
import Topheader from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { ProductPreview } from "../../components/ProductPreview/ProductPreview";


export const Home=()=>{  
 
 
    return(
        <div  >
      
   
      
       <Carousel  className="d-block w-100 h-50 justify-content-center" >
      <Carousel.Item   >
        <img  src={Image1} alt="first slide"/>
         
      </Carousel.Item>
      <Carousel.Item  >
       <img  src={Image2} alt="second slide"/>
         
      </Carousel.Item>
      <Carousel.Item   >
       <img   src={Image3} alt="third slide"/>
         
      </Carousel.Item>
    </Carousel>
    <LatestProducts/>
        </div>
    );
}
 

 

 

 