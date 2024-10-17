// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const noOfItems = cartList.length

      const totalPriceofItems = cartList.reduce(
        (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
        0,
      )

      return (
        <div className="cartItemsSummaryContainer">
          <div className="orderTotalPrice">
            <h1 className="orderHeading">Order Total: </h1>
            <h1 className="totalPriceheading"> Rs{totalPriceofItems}/-</h1>
          </div>
          <p>{noOfItems} Items in cart</p>
          <button type="button" className="checkoutButton">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
