import React, { useState, useEffect } from "react";
import ProductDataService from "../../services/products/product.service";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [Products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
 

  useEffect(() => {
    retrieveProducts();
  }, []);

  
  const retrieveProducts = () => {
    ProductDataService.getAll()
      .then(response => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
 

  const setActiveProduct = (Product, index) => {
    setCurrentProduct(Product);
    setCurrentIndex(index);
  };

   

  return (
    <div className="list row">
       
      <div className="col-md-6">
        <h4>Lista de Produtos</h4>

        <ul className="list-group">
          {Products &&
            Products.map((Product, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProduct(Product, index)}
                key={index}
              >
                {Product.descricao}
              </li>
            ))}
        </ul>

      
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Produto</h4>
            <div>
              <label>
                <strong>Descrição:</strong>
              </label>{" "}
              {currentProduct.descricao}
            </div>
            <div>
              <label>
                <strong>Valor:</strong>
              </label>{" "}
              {currentProduct.valor}
            </div>
            

            <Link
              to={"/Products/" + currentProduct.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Favor clicar em um produto...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
