import styled from "styled-components";

const StyledDiv = styled.div`
    margin-left: 400px;`;

const StyledCoverArt = styled.img`
    height: 150px;`;

const StyledDeleteButton = styled.button`
    background: transparent;
    border: none;`;

const StyledActionButton = styled.button`
    background: transparent;
    border-color: blue;
    border-width: thin;
    color: blue;
    text-decoration: underline;`;

const StyledBookTitle = styled.text`
    white-space: normal;`;

const StyledShoppingCartTitle = styled.h3`
    font-variant: all-petite-caps;
    text-decoration: overline;
    color: dimgrey;
    font-size: 40px;
    font-weight: lighter;
    padding-top: 10px;`;

const StyledSFLTitle = styled.h3`
    font-variant: all-petite-caps;
    text-decoration: overline;
    color: dimgrey;
    font-size: 28px;
    font-weight: lighter;`;

const StyledSubtotal = styled.p`
    color: rgba(0, 0, 0, 0.54);
    font-size: 20px;
    text-transform: uppercase;
    margin: unset;`;

export {StyledCoverArt, StyledDeleteButton, StyledActionButton, StyledBookTitle,
        StyledShoppingCartTitle, StyledSFLTitle, StyledSubtotal};