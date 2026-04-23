import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
 
import { Row ,Col} from "react-bootstrap";



export const ProductPreview=({products})=>{


    return<>
    <Row  className="g-3 my-4">
        {products.map((product, index)=>(
            <Col sm={12}  md={6} lg={4} key={index}>
            <ProductCard product={product}/>
            </Col>
))}
    </Row>
    </>
}