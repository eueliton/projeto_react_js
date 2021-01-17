import React, { Component } from "react";

 

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
   
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3> Bem Vindo ao Sistema de Testes para CRUD de Produtos</h3>
        </header>
      </div>
    );
  }
}
