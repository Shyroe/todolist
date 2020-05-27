import React, { Component } from "react";
//Importar propriedades do módulo react-router
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import TodoList from "./Components/TodoList";
import TodoInput from "./Components/TodoInput";
import Header from "./Components/layout/Header";
import About from "./Components/pages/About";

//Importar bootstrap lib
import "bootstrap/dist/css/bootstrap.min.css";

//importar uuid lib
// import uuid from 'uuid'; //Quando usar post request, deixar uuid comentado

class App extends Component {
  state = {
    items: [],
    // id: uuid(),
    // item: '',
    // editItem: false
  };

  componentDidMount() {
    // axios.get('https://jsonplaceholder.typicode.com/todos') //retorna uma promise
    //       .then(res => console.log(res.data)) //retorna um array com 200 obj

    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10") //Estou limitando a api para retornar apenas 10 objs no array data
      // .then(res => console.log(res.data))
      .then((res) => this.setState({ items: res.data })); //Colocar os 10 objs dentro do meu array
  }

  clearList = () => {
    this.setState({
      items: [],
    });
  };

  // Delete Todo
  // delTodo = (id) => {
  // 			this.setState({
  // 				items: [...this.state.items.filter((item) => item.id !== id)]
  //       });
  // };

  ///////////Delete Request ////////
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          items: [...this.state.items.filter((item) => item.id !== id)],
        })
      );
  };

  // Add Todo
  // addTodo = (title) => {
  //       const newItem = {
  //         id: uuid(),
  //         title: title
  //       }
  // 			this.setState({ items: [...this.state.items, newItem] });

  // };

  // Post Request
  addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false,
      })
      .then((res) => this.setState({ items: [...this.state.items, res.data] }));
  };

  render() {
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8">
              <Header />
              <Route
                exact
                path="/"
                render={(props) => (
                  <>
                    <h3 className="text-center mt-2">Todo Input App</h3>
                    <TodoInput item={this.state.item} addTodo={this.addTodo} />
                    <TodoList
                      items={this.state.items}
                      clearList={this.clearList}
                      delTodo={this.delTodo}
                    />
                  </>
                )}
              />
              <Route path="/about" component={About} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
