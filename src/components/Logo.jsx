import React, { Component } from 'react'
import styled from 'styled-components'

import logo from '../logo-white.png'

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <Wrapper href="/">
                <img src={logo} width="50" height="50" alt="Volamtar Peppers Logo" />
            </Wrapper>
        )
    }
}

export default Logo