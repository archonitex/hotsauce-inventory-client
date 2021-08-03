import React from "react";
import styled from 'styled-components'

const HeatPeppers = styled.div`
  display:block
`;
const OnHeatPeppers = styled.div`
  float:left;
  opacity:1;
`;

const OffHeatPeppers = styled.div`
  opacity: 0.15;
`;

const ProductListItem = props => {
  const { product } = props;

  //Heat
  var heatString = ''
  let numberOfPeppers = Math.round(parseFloat(product.heat/20))
  for (var i=0; i < numberOfPeppers; i++) {
    heatString += "🌶️"
  }

  var offHeatString = '&nbsp;'
  for (var i=numberOfPeppers; i<5; i++){
    offHeatString += "🌶️"
  }

  //Ingredients
  var ingredientsString = product.ingredients.map(function(item) { return item.ingredient }).join(', ')
  
  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img className="product list-image"
                src={product.imageUrl}
                alt={product.name}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              <a onClick={() =>{
                window.location = "/product/" + product._id
              }}  >{product.name}{" "}</a>
              <span className="tag is-primary">${product.price || 'TBD'}</span>
            </b>
            <HeatPeppers>
              <OnHeatPeppers >{heatString}</OnHeatPeppers>
              <OffHeatPeppers dangerouslySetInnerHTML={{ __html: offHeatString }} />
            </HeatPeppers>
            <div>{ingredientsString}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
            <div className="is-clearfix">
              <button
                class="button is-small is-outlined is-primary   is-pulled-left"
                onClick={() =>{
                  window.location = "/product/" + product._id
                }}
              >
              More Info
              </button>
              
              {product.stock > 0 ? (
                <div className="paypalBuyButton is-pulled-right">
                    <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
                    <input type="hidden" name="cmd" value="_cart" />
                    <input type="hidden" name="business" value="7D77NDD25ZQCS" />
                    <input type="hidden" name="lc" value="CA" />
                    <input type="hidden" name="item_name" value={product.name} />
                    <input type="hidden" name="item_number" value={product.id} />
                    <input type="hidden" name="amount" value={product.price} />
                    <input type="hidden" name="currency_code" value="CAD" />
                    <input type="hidden" name="button_subtype" value="products" />
                    <input type="hidden" name="no_note" value="0" />
                    <input type="hidden" name="cn" value="Add special instructions :" />
                    <input type="hidden" name="no_shipping" value="2" />
                    <input type="hidden" name="shipping" value="7.50" />
                    <input type="hidden" name="add" value="1" />
                    <input type="hidden" name="bn" value="PP-ShopCartBF:btn_cart_LG.gif:NonHosted" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                </div>
              ) : (<div></div>)}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;