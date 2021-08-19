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

const SyncButton = styled.button.attrs({
    className: `btn btn-secondary`,
})`
    margin: 5px 5px 5px 5px;
    font-weight: 700;
    font-size: 14px;
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
            event.target.innerHTML = oldInnerHTML

            this.updateWoo(event)
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

            window.location.reload();
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
                        <SyncButton onClick={this.uploadWoo}>⬆ Upload</SyncButton>
                        <SyncButton onClick={this.downloadWoo}>⬇ Download</SyncButton>
                    </div>
                <Title>Batches</Title>
                    <BatchesList />
                </React.Fragment>
            </Wrapper>
        )
    }
}

export default BatchesHome