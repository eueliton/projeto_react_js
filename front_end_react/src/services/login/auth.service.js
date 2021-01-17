import http from "../../configs/http/http-common";

 
class AuthService {
  login(username, password) {
    return http
      .post("/users/autenticar", {
        username,
        password
      })
      .then(response => {
    
        if (response.data.token) {
          console.log("LOGANDO");
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("LOGADO");
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nome,username, email, password) {
    return http.post("/users/registrar", {
      nome,
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
