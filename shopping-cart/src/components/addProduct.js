import React, { Component } from "react";
import defaultImage from "../assets/images.png";
import { Redirect } from 'react-router';

class AddProduct extends Component {

    state = {
        productname: [""],
        description: [""],
        image: [""],
        price: [""],
        redirect: false
    }

    getInputValues = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    createProduct = (e) => {
        e.preventDefault();
        const product = {
            productname: this.state.productname,
            description: this.state.description,
            image: this.state.image,
            amount: this.state.price
        }
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)

        }

        if (this.state.description && this.state.image && this.state.productname && this.state.price) {
            fetch("http://localhost:4000/api/Orders/", options)
                .then(res => {
                    console.log(res);
                    this.setState({ redirect: true });
                })
        } else {
            console.log("The form is not valid to be sent")
        }

    }


    render() {
        const isImgReady = this.state.image;
        let imagePreview;

        if (isImgReady) {
            imagePreview = < img src = {this.state.image}
            alt = "product" / >
        } else {
            imagePreview = < img src = {defaultImage}
            alt = "default preview" / >
        }

        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to = "/" / >
        }
        return ( 
          <React.Fragment >
            <section >
            <div className = "banner" > </div> <h2> Create a new item </h2>
            <div className = "productCreation">
            <form onSubmit = {this.createProduct}>
            <div className = "control" >
            <label htmlFor = "productname"> Product Name: </label> 
            <input type = "text" name = "name" onChange = { this.getInputValues }/> 
            </div >
            <div className = "control" >
            <label htmlFor = "description" > Product Description: </label> 
            <textarea name = "description" onChange = { this.getInputValues } >
            </textarea> 
            </div>

            <div className = "control" >
            <label htmlFor = "price" > Product Price: </label>
             <input type = "number"
            name = "price"
            onChange = { this.getInputValues }/> 
            </div>

            <div className = "control">
            <label htmlFor = "image"> Product Image: </label> 
            <input type = "text"
            name = "image"
            onChange = { this.getInputValues }
            /> 
            </div>

            <input type = "submit" value = "create post" / >
            </form>

            <div className = "preview" >

            {imagePreview}
            <p> Product Name: <strong> { this.state.productname } </strong></p>
            <p> Product Description: <strong> { this.state.description } </strong></p>
            <p> Product Price: <strong> {this.state.price} </strong></p>

            </div>

            </div>

            </section>


            </React.Fragment>
        );
    }
}

export default AddProduct;