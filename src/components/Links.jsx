import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { authenticate, deauthenticate, isAuthenticated } from "../auth/auth";

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

function handleLogout(e) {
    e.preventDefault();
    deauthenticate()
    window.location = '/'
}

class Links extends Component {
    render() {
        let authItem;
        if(isAuthenticated()) { 
            authItem = <Link onClick={handleLogout} className="nav-link">Logout</Link> 
        }

        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand navbar-name">
                    Volamtar Peppers
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/" className="nav-link">
                                Products
                            </Link>
                            <Link onClick={() => document.getElementById("paypalcart").submit() } className="nav-link">
                                View Cart
                                <div className="paypalCart">
                                    <form id="paypalcart" target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" >
                                    <input type="hidden" name="cmd" value="_cart" />
                                    <input type="hidden" name="business" value="7D77NDD25ZQCS" />
                                    <input type="hidden" name="display" value="1" />
                                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_viewcart_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
                                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                                    </form>
                                </div>
                            </Link>
                            {authItem}
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links