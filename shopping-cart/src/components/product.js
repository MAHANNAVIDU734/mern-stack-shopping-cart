import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Product extends Component {
    state = {
        productname: "",
        description: "",
        image: "",
        price: "",
        redirect: false
    }

    componentDidMount = () => {
        fetch("http://localhost:4000/api/product" + this.props.match.params.id).then(res => {
            return res.json();
        }).then(blob => {

            this.setState({ productname: blob.item.productname });
            this.setState({ description: blob.item.description });
            this.setState({ image: blob.item.image });
            this.setState({ price: blob.item.amount });

        });
    }

    getInputValues = (e) => {

        this.setState({
                [e.target.name]: e.target.value
            })
    }
    updateProduct = (e) => {
        e.preventDefault();

        const product = {
            productname: this.state.productname,
            description: this.state.description,
            image: this.state.image,
            amount: this.state.price
        }
        const options = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)

        }

        fetch("http://localhost:4000/api/product/" + this.props.match.params.id, options)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }

    deleteProduct = () => {
        let confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            const options = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: this.props.match.params.id })

            }

            fetch("http://localhost:4000/api/product/" + this.props.match.params.id, options)
                .then(res => {
                    console.log(res);
                    this.setState({ redirect: true });
                })
        } else {
            console.log("Product was not deleted")
        }

    }

    render() {

        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to = "/" / >
        }
        return ( 
          <React.Fragment>
            <section>
            <div className = "banner" >
               </div> <h2> Update an Product </h2>

            <div className = "productCreation" >

            <form onSubmit = { this.updateProduct } >
            <div className = "control" >
            <label htmlFor = "productname" > Product Name: </label> 
            <input type = "text"
            name = "productname"
            onChange = { this.getInputValues }
            defaultValue = { this.state.productname }/> 
            </div>

            <div className = "control">
            <label htmlFor = "description" >Product Description: </label> 
            <textarea name = "description"
            onChange = { this.getInputValues }
            value = { this.state.description } >
            </textarea> 
            </div>

            <div className = "control" >
            <label htmlFor = "price" > Product Price: </label> 
            <input type = "number"
            name = "price"
            onChange = { this.getInputValues }
            defaultValue = { this.state.price }/> 
            </div>

            <div className = "control" >
            <label htmlFor = "image" > Product Image: </label> 
            <input type = "text"
            name = "image"
            onChange = { this.getInputValues }
            defaultValue = { this.state.image }/> 
            </div>

            <input type = "submit"
            value = "Update post" / >
            </form>

            <div className = "preview" >

            <img src = { this.state.image }
            alt = "product" / >
            <p> Product Name: <strong> { this.state.productname } </strong></p>
            <p> Product Description: <strong> {this.state.description} </strong></p>
            <p> Product Price: <strong> { this.state.price } </strong></p >
            <button className = "delete" onClick = { this.deleteProduct } > Delete this Item </button> 
            </div>
            </div>

            </section>

            </React.Fragment>
        );
    }
}

export default Product;