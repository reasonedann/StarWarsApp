import * as React from 'react';
import { AppStoreComponent } from '../stores/AppStore';
import { observable } from 'mobx';

import styled from '@emotion/styled';
import { observer } from 'mobx-react';

interface PropsTypes {
    show: boolean
}

const ModalContainer = styled.div<PropsTypes>`
    background-color: rgba(0,0,0, 0.5);
    transform: ${props => props.show ? 'translateY(0vh)' : 'translateY(-100vh)'};
    transition: all .8s;
    width: 100%;
    height: 100%;
    margin: 0;
    position: absolute;
`;

const ModalWrapper = styled.div`
    background: white;
    border: 1px solid #d0cccc;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);
    margin: 100px auto 0;
    width: 60%;
`;

const ModalHeader = styled.header`
    background: #263238;
    height: 40px;
    line-height: 40px;
    padding: 5px 20px;
    text-align: right;
`;

const Title = styled.h3`
    color: white;
    float: left;
    margin: 0;
    padding: 0;
`;

const ModalBody = styled.p`
    padding: 10px 15px;
    text-align: center;
    min-height: 200px;
`;

const CloseBtn = styled.span`
    color: white;
    cursor: pointer;
    float: right;
    font-size: 30px;
    margin: 0;

    &:hover {
        color: black
    }
`;

const Button = styled.button`
    border: none;
    color: white;
    cursor: pointer;
    font-weight: bold;
    outline: none;
    padding: 10px;
    background-color: #1b5e20;
    float: right;
`;

interface PropsTypes {
    show: boolean
}

@observer
class Modal extends AppStoreComponent<PropsTypes> {

    handleCloseModal = () => {
        this.appState.isShowing = false
    }

    render() {
        return (
            <ModalContainer show={this.appState.isShowing}>
                <ModalWrapper>
                    <ModalHeader>
                        <Title>Read more about Star Wars' hero:</Title>
                        <CloseBtn onClick={this.handleCloseModal}>x</CloseBtn>
                    </ModalHeader>
                    <ModalBody>
                        costamcostamcostam
                    </ModalBody>
                    <Button onClick={this.handleCloseModal}>Close</Button>
                </ModalWrapper>
            </ModalContainer>
        )
    }
};

export default Modal;