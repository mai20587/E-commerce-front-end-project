import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSignInAlt } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { Dropdown } from "react-bootstrap";
import { useState } from 'react';
import { useEffect } from 'react';
 
import { Link } from 'react-router-dom';
export function GlobalNavbar() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
   
 
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then(res => res.json())
      .then(data => setCategory(data));
  }, []);

 
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <div className="container mt-3">

     
   
          
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         <Nav.Item>
         
 
          <Nav className="me-auto  ">
             <NavDropdown title="Category" id="basic-nav-dropdown">
                <Dropdown.Toggle variant="primary">
          {selectedCategory
            ? categories.find(c => c.slug === selectedCategory)?.name
            : "Select Category"}
        </Dropdown.Toggle>
          
      <Dropdown.Item onClick={() => setSelectedCategory("")}>
     
          </Dropdown.Item>
          
          {/* Categories */}
          {category.map((cat) => (
            <Dropdown.Item
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </Dropdown.Item>
            
       
          ))}
        
         </NavDropdown>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link  as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            
          </Nav>
         
          </Nav.Item>
        </Navbar.Collapse>
      </div>
        <div  className='sign_regs_icon '>
                <Link to="/"><FaSignInAlt /></Link>
                
                  <Link to="/"><TiUserAdd /></Link>
              </div>
                
         </Container>
   
    </Navbar>
    
  );
}
 