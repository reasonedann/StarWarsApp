import styled from '@emotion/styled';

export const TableWrapper = styled.table`
border-collapse: collapse;
margin-top: 30px;
`;

export const Title = styled.th`
text-transform: uppercase;
padding: 12px 0;
background-color: rosybrown;
color: white;
`;

export const Row = styled.tr`
    :nth-child(even){background-color: #f2f2f2;}
    :hover {background-color: #ddd;}
`;

export const Cell = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    min-width: 100px;
    cursor: pointer;
`;