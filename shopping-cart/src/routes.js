import React from "react";
import { Switch, Route} from "react-router-dom";

//import the components
import Main from "./components/main";
import Product from "./components/product";
import AddProduct from "./components/addProduct";

const Routes = () => (
   
        <Switch>
            <Route exact path="/" component={Main} />+
            <Route exact path="/addproduct" component={AddProduct} /> 
            <Route exact path="/product/:id" component={Product} />        
        </Switch>
       
) 

export default Routes;