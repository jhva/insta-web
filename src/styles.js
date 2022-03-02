import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
${reset}
* {
      box-sizing:border-box;
    }
    input {
      all:unset;
      // 이걸 작성하면 input 모든 속성이 삭제가 됌 . 
    }
body { 
     background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:rgb(38,38,38);
}
a {
      text-decoration: none;
    }
`;
export const lightTheme = {
  accent: '#0095f6',
  borderColor: 'rgb(219, 219, 219)',
  //   bgColor: 'lightgray',
};

export const darkTheme = {
  fontColor: 'white',
  bgColor: '#2c2c2c',
};
