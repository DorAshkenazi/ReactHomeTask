import ReactDOM from "react-dom";
import "./index.css";

// Redux
import store from "./redux/store";
import { Provider } from "react-redux";

// Components
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/CartPage/CartPage";

// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={ProductPage}></Route>
        <Route path="/cart" component={CartPage}></Route>
        <Route path="/products/:product_id" component={ProductPage}></Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
