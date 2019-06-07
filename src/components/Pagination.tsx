import * as React from 'react';
import { observer } from 'mobx-react';
import { AppStoreComponent } from '../stores/AppStore';

import styled from '@emotion/styled';

interface PagePropsType {
    isCurrentPage?: boolean;
}

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
`;

const Page = styled.button<PagePropsType>`
    background-color: ${props => props.isCurrentPage ? 'silver' : 'inherit'};
    color: ${props => props.isCurrentPage ? 'white' : 'black'};
    float: left;
    padding: 8px 16px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;

    :hover {
        background-color: lightgray;
        border-radius: 5px;
    }
    :active {
        background-color: grey;
        color: white;
        border-radius: 5px;
    }
`;

@observer
export default class Pagination extends AppStoreComponent {

    handleClickPrevPage = () => {
        const previous = this.appState.previous;
        this.appState.getHeroesFromSwapi(previous)
    }

    handleClickNextPage = () => {
        const next = this.appState.next;
        this.appState.getHeroesFromSwapi(next)
    }

    handleClickPage(e: any) {
        const target = e.target.key;
        target
    }

    render() {
        const renderedPageNumbers = this.appState.pageNumbers.map((num) => {
            return (
                <Page isCurrentPage={this.appState.currentPage === num}
                    key={num}
                    onClick={this.handleClickPage}
                >
                    {num}
                </Page>
            )
        });

        return (
            <PaginationWrapper>
                {
                    this.appState.previous && <Page onClick={this.handleClickPrevPage}>&laquo;</Page>
                }
                { renderedPageNumbers }
                {
                    this.appState.next && <Page onClick={this.handleClickNextPage}>&raquo;</Page>

                }

            </PaginationWrapper>
        )
    }
}