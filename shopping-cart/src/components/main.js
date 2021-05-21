import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Main extends Component {

    state = {
        product: [""]
    }


    componentDidMount = () => {
        console.log("mounted");
        fetch("http://localhost:4000/api/products").then(res => {
            return res.json();
        }).then(blob => {
            this.setState({ products: blob.data });
            console.log(this.state.products)
        })
    }




    render() {
        return ( <React.Fragment>
            <header>
            
            </header>
            <section>
            <h1> GYM Supplement Products </h1> 
            <div className="productContainer" > 
            {this.state.product.map(product => {
            return (
             <div className="product" key={product._id}>
                 <div className="cover" style={{backgroundImage: "url(" + product.image + ")" }}></div>
                  <div>
                   <Link to={"product/" + product._id}><h3>{product.productname}</h3></Link> 
                  <p>{product.description}</p>
                  </div>
              </div>
                    )
                })
            } 
            </div>
            </section>

            </React.Fragment>
        );
    }
}

export default Main;