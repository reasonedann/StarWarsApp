import styled from '@emotion/styled';

interface PagePropsType {
    isCurrentPage?: boolean;
}

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
`;

export const Page = styled.button<PagePropsType>`
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