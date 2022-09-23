import { keyframes } from 'styled-components';

export const fadeUp = (fromTop:string, toTop:string) => keyframes`
    from {
        opacity: 0;
        top: ${fromTop};
    }
    to {
        opacity: 1;
        top: ${toTop};
    }

`;

