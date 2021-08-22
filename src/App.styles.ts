import styled, {createGlobalStyle} from "styled-components";

//@ts-ignore

import back from "./images/back.png"

export const GlobalStyle = createGlobalStyle`

html,body{
    height: 100vh;
}


body{
    background-image: url(${back});
    background-size: cover;
    background-repeat: no-repeat;
    margin:0;
    padding:0;
    display:flex;
    justify-content: center;
}

*{
    box-sizing: box-order;
    font-family: 'Catamaran',sans-serif;
}

`

export const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #fff;
        
    }

    .score{
        justify-content: center;
        text-align: center;
        color: #fff;
        font-size: 2rem;
        margin: 0;
        background: blue;
        max-width: 1100px;
        margin-bottom: 5px;
        border: 3px solid #fff;
        box-shadow: 1px 2px 0px rgba(0,0,0,0.1);
        border-radius: 10px;
        padding: 5px;
    }

    h1{
        background-image: linear-gradient(180deg,#fff,#87f1ff);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: tranparent;
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        text-align: center;
        margin: 20px;
        font-weight: 600;
    }

    .start,.next{
        cursor: pointer;
        background: linear-gradient(180deg,#fff,#ffcc91);
        border:  2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
        border-radius: 10px;
        height: 40px;
        margin:20px 0;
        padding: 0 40px;

    }

    .start{
        max-width: 200px;
    }

    .form-control{
        width: 100%;
    }

`


