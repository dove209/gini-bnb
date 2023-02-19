import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
    ${reset}

    * { 
        box-sizing: border-box
    }

    body {
        font-family: Noto Sans, Noto Sans KR;
        color: ${palette.black}
    }
    
    a { 
        text-decoration: none;
        color: ${palette.black};
    }

    .loading-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        font-size: 1.2rem;
    }

    .error-boundary {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
        font-size: 1.2rem;
    }
`

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`

export default GlobalStyle