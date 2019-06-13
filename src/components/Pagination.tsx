import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStoreComponent } from '../stores/AppStore';
import { Page, PaginationWrapper } from './Pagination.style';

@observer
class Pagination extends AppStoreComponent {

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

        console.log('strony', this.appState.pageNumbers)

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

export default Pagination;