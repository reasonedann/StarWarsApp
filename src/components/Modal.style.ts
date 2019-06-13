import styled from '@emotion/styled';

interface PropsTypes {
    show: boolean
}

export const ModalContainer = styled.div<PropsTypes>`
    background-color: rgba(0,0,0, 0.5);
    cursor: pointer;
    height: 100%;
    margin: 0;
    position: absolute;
    transform: ${props => props.show ? 'translateY(0vh)' : 'translateY(-100vh)'};
    transition: all .8s;
    width: 100%;
`;

export const ModalWrapper = styled.div`
    background: white;
    border: 1px solid #d0cccc;
    box-shadow: 0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17);
    cursor: auto;
    margin: 100px auto 0;
    width: 50%;
`;

export const ModalHeader = styled.header`
    background: rosybrown;
    height: 40px;
    line-height: 40px;
    padding: 5px 20px;
    text-align: right;
`;

export const Title = styled.h3`
    color: white;
    float: left;
    margin: 0;
    padding: 0;
`;

export const ModalBody = styled.p`
    padding: 10px 15px;
    text-align: center;
    min-height: 200px;
`;

export const CloseBtn = styled.span`
    color: white;
    cursor: pointer;
    float: right;
    font-size: 30px;
    margin: 0;

    &:hover {
        color: black
    }
`;

export const Info = styled.p`
    font-size: 16px;
    margin: 5px 0;
`;

export const Label = styled.span`
    font-weight: 700;
    margin-top: 25px;
`;

export const FilmTitle = styled.li`
    font-style: italic;
    list-style: none;
`;

export const Item = styled.li`
    list-style: none;
`;

export const SearchLink = styled.a`
    text-decoration: none;
    cursor: pointer;
    font-size: 30px;
    font-weight: 700;
    color: tomato;

    &:hover {
        color: grey;
    }
`;