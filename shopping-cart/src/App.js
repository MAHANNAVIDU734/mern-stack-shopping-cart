import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { withRouter } from 'react-router-dom';

//import the routes
import Routes from "./routes";

class App extends Component {
 constructor(props) {
        super(props);
        this.state = {
            location: '/'
        }

    }
  componentDidMount = () => {
  
    window.addEventListener("load",() => {
      
     if(window.location.pathname === "/addproduct"){
      this.setState({ location: window.location.pathname });
     }
 
    })
    this.unlistenHistory = this.props.history.listen((location) => {
      this.setState({ location: location.pathname });
     
    });
  }

  
  render() {
    const showAddProduct = this.state.location;
    let addProduct;
    if(showAddProduct !== "/addproduct"){
      addProduct =  <li id="addproduct"><Link to="/addproduct">Add Product</Link></li>
    }

    return (
      <div className="App">
      <nav>
        <ul>
          <li><Link to="/"> GYM SUPPLEMENT PRODUCTS </Link></li>
        </ul>
        <ul>
          <li><Link to="/">Products</Link></li>
         {addProduct}
        </ul>
      </nav>
        <Routes />
      </div>
    );
  }
}

export default withRouter(App);
