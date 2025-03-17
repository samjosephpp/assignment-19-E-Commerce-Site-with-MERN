import React from "react"

const Header = ({ cartCount }) => {

    return (
        //     <header>        
        //     <div className="cart-icon">
        //       🛒 {cartCount}
        //     </div>
        //   </header>
        <div class="container-fluid fixed-top p-0">
            <div class="row">
                <div class="ml-auto col-auto">
                    {/* <div class="alert alert-primary">Here I am!</div> */}
                         <div className="cart-icon">
                           🛒 {cartCount}
                         </div>
                </div>
            </div>
        </div>

    )
}

export default Header