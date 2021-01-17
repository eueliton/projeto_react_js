import React, { useState, useEffect } from "react";
import ProductDataService from "../../services/products/product.service";

const Product = props => {
  const initialProductState = {
    id: null,
    valor: "",
    descricao: "",
 
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        setCurrentProduct(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProduct(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  

  const updateProduct = () => {
    ProductDataService.update(currentProduct.id, currentProduct)
      .then(response => {
        console.log(response.data);
        setMessage("Produto atualizado com sucesso!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteProduct = () => {
    ProductDataService.remove(currentProduct.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/Products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Produto</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Valor</label>
              <input
                type="text"
                className="form-control"
                id="valor"
                name="valor"
                value={currentProduct.valor}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                name="descricao"
                value={currentProduct.descricao}
                onChange={handleInputChange}
              />
            </div>

           
          </form>

          
          <button className="badge badge-danger mr-2" onClick={deleteProduct}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateProduct}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique em um produto...</p>
        </div>
      )}
    </div>
  );
};

export default Product;
