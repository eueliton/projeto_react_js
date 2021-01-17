import api from "../../configs/http/http-common";

const getAll = () => {
  return api.get("/products");
};

const get = id => {
  return api.get(`/products/${id}`);
};

const create = data => {
  console.log(data);
   return api.post("/products/add", data);
};

const update = (id, data) => {
  return api.put(`/products/${id}`, data);
};

const remove = id => {
  return api.delete(`/products/${id}`);
};
 

export default {
  getAll,
  get,
  create,
  update,
  remove 
};
