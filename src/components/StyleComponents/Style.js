import styled from "styled-components"
import { Link } from "react-router-dom";

export const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`

export const Wrapper = styled.div`
    background: white;
    border-radius: 3px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.1);
    padding: 0 12px 12px 12px;
`

export const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
    text-decoration: none;
`