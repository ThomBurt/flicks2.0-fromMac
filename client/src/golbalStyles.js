import styled, {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: sans-serif;
}`

export const Container = styled.div`
z-index: 1;
width: 100%;
max-width: 1300px;
margin-right: auto;
margin-left: auto;
padding-right: 60px;
padding-left: 60px;

@media screen and (max-width: 800px) {
    padding-right: 20px;
    padding-left: 20px;
}

@media screen and (max-width: 670px) {
    padding-right: 10px;
    padding-left: 10px;
}
`;

export default GlobalStyle;