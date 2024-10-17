import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState

      // Check if the item already exists in the cart
      const productExists = cartList.find(
        eachItem => eachItem.id === product.id,
      )

      if (productExists) {
        // If product exists, update its quantity
        const updatedCartList = cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {...eachItem, quantity: eachItem.quantity + 1}
          }
          return eachItem
        })

        return {cartList: updatedCartList}
      } else {
        // If product doesn't exist, add it to the cart
        return {cartList: [...cartList, {...product, quantity: 1}]}
      }
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState

      // Update the cart list, incrementing the quantity of the product with matching id
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      })

      return {cartList: updatedCartList}
    })
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const {cartList} = prevState

      // Update the cart list, decrementing the quantity of the product with matching id
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id && eachItem.quantity > 1) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        } else {
          this.removeCartItem(id)
        }
        return eachItem
      })

      return {cartList: updatedCartList}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
