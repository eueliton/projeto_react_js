import React, { useState } from "react";
import ProductDataService from "../../services/products/product.service";
import CurrencyInput from '../global/currency.inputs';

const AddProduct = () => {
  const initialProductState = {
    id: null,
    valor: "",
    descricao: ""
  
  };
  const [Product, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
 
  
    setProduct({ ...Product, [name]: value });
  };



  const saveProduct = () => {
    var data = {
      valor: Product.valor.replace(/,/g, ';').replace(/\./g, '').replace(/;/g, '.'),
      descricao: Product.descricao
    };

    ProductDataService.create(data)
      .then(response => {
        setProduct({
          id: response.data.id,
          valor: response.data.valor,
          descricao: response.data.descricao
        
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Adicionado com sucesso!</h4>
          <button className="btn btn-success" onClick={newProduct}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="value">Valor</label>
            <CurrencyInput  
           
              className="form-control"
              id="valor"
              required
              value={Product.value}
              onChange={handleInputChange}
              name="valor"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="descricao"
              required
              value={Product.descricao}
              onChange={handleInputChange}
              name="descricao"
            />
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
