import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FcRating } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../Pages/Slices/cartSlices';
 
export const ProductCard=({product})=> {
    const {thumbnail , title, price, id, description, rating}=product;
    const dispatch= useDispatch();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={thumbnail}  alt=""/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <span> Rate <FcRating />{rating}</span>
        <Card.Subtitle className='d-flex'>Price ${price}</Card.Subtitle>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Footer className='d-flex justify-content-between'>
        <Button onClick={()=> dispatch(addToCart(product))} >Add to Cart </Button>
        <Button  as={Link} to={`/product-details/${product.id}`} >Details</Button>
        </Card.Footer>
        
      </Card.Body>
    </Card>
  );
}

