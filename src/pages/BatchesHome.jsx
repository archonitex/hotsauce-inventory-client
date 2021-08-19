import React, { Component } from 'react'
import BatchesList from './BatchesList'
import BatchInsert from './BatchInsert'
import Login from './Login'
import { isAllowed, PERMISSIONS } from '../auth/auth';
import styled from 'styled-components'
import api from '../api';

const Title = styled.h2.attrs({
    className: 'h2',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 5px 5px 5px 5px;
    width: 15%;
`

const ButtonSecondary = styled.button.attrs({
    className: `btn btn-secondary`,
})`
    margin: 5px 5px 5px 5px;
    width: 15%;
`

const Label = styled.label`
    margin: 5px;
`

class BatchesHome extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount = async () => {
        this.setState({ })
    }

    uploadWoo = async event => {
        let oldInnerHTML = event.target.innerHTML;

        event.target.disabled = true
        event.target.innerHTML = "Uploading..."

        await api.uploadBatchesWoo().then(res => {
            event.target.disabled = false
            event.target.innerHTML = oldInnerHTML
        })
    }

    updateWoo = async event => {
        let oldInnerHTML = event.target.innerHTML;
        
        event.target.disabled = true
        event.target.innerHTML = "Updating..."

        await api.updateBatchesWoo().then(res => {
            event.target.disabled = false
            event.target.innerHTML = oldInnerHTML
        })
    }

    downloadWoo = async event => {
        let oldInnerHTML = event.target.innerHTML;

        event.target.disabled = true
        event.target.innerHTML = "Downloading..."

        await api.downloadBatchesWoo().then(res => {
            event.target.disabled = false
            event.target.innerHTML = oldInnerHTML
        })
    }

    render() {
        if(!isAllowed(PERMISSIONS.CAN_EDIT_BATCHED)){
            return (
                <Wrapper>
                    <Title>Permission Denied.</Title>
                    <React.Fragment>
                        <Login />
                    </React.Fragment>
                </Wrapper>
            )
        }

        return (
            <Wrapper>
                <Title>New Batch</Title>
                <React.Fragment>
                    <BatchInsert />
                    <div>
                        <Button onClick={this.uploadWoo}>⬆ To WooCommerce</Button>
                        <ButtonSecondary onClick={this.updateWoo}>Update WooCommerce</ButtonSecondary>
                        <ButtonSecondary onClick={this.downloadWoo}>⬇ WooCommerce(SKU)</ButtonSecondary>
                    </div>
                <Title>Batches</Title>
                    <BatchesList />
                </React.Fragment>
            </Wrapper>
        )
    }
}

export default BatchesHome