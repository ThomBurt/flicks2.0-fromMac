import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { Container } from '../../golbalStyles'


export const Nav = styled.nav`
background: black;
height: 80px;
display: flex;
justify-content: center;
align-items: center;
font-size: 1.2rem;
position: sticky;
top: 0;
z-index: 999;
`;

export const NavContainer = styled(Container)`
display: flex;
justify-content: space-between;
height: 80px;
position: fixed;

${Container}
`;

export const NavLogo = styled(Link)`
justify-self: flex-start;
cursor: pointer;
text-decoration: none;
font-size: 2rem;
display: flex;
align-items: center;
`;

export const Image = styled.img`
margin-right: 0.5rem;
height: 60px;
width: 60px;
`;

export const Icon = styled.img`
margin-right: 0.5rem;
width: 250px;
`;

export const MobileIcon = styled.div`
display: none;

@media screen and (max-width: 800px) {
   display: block;
   position: absolute;
   top: 0;
   right: 0;
   transform: translate(-100%, 60%);
   font-size: 1.8rem;
   cursor: pointer;
}
`;

export const NavMenu = styled.ul`
display: flex;
align-items: center;
list-style: none;
text-align: center;
padding: 0px;

@media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 90vh;
    position: absolute;
    top: 60px;
    left: ${({click}) => (click ? 0 : '-100%')};
    opacity: 1;
    transition: all 0.5s ease;
    background: #000000;
}
`;

export const NavItem = styled.li`
height: 80px;
border-bottom: 2px solid transparent;

&:hover {
    border-bottom: 4px solid #FFFFFF;
}

@media screen and (max-width: 800px) {
    width: 100%;

    &:hover {
        border: none;
    }
}
`;

export const NavLinks = styled(Link)`
color: white;
display: flex;
align-items: center;
text-decoration: none;
padding: 0.5rem 2rem;
height: 100%;

&:hover {
    color: #71c3f7;
}

@media screen and (max-width: 800px) {
    text-align: center;
    padding: 0rem;
    width: 100%;
    display: table;

    &:hover {
        color: #71c3f7;
        transition: all 0.3s ease;
    }
}
`;