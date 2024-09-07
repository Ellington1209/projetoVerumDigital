import styled, { css } from 'styled-components';
import {  grey } from '@mui/material/colors';

export const Container = styled.div`
  display: flex;
  header {
    background-color:#2C003E;
  }

.name{
  color: ${grey[300]};
  padding-left: 15px;
 ;
}
  //SIDER BAR STYLES
  ${({ theme }) => css`

    .MuiDrawer-paper svg, .MuiDrawer-paper {
      color: ${grey[300]}     
     
    }
    .MuiSvgIcon-root{
      font-size: 19px;
    }
    .MuiButtonBase-root{
      color: ${grey[200]}
    }
    .MuiButtonBase-root:hover{
      color: ${grey[100]}
    }

    .MuiDivider-root {
      background-color: #c5e1a5;
      width: 90%;
      margin-left: 3%;
    }

    .MuiTypography-root {
      font-size: 13px;
      
    }

    .MuiListItemIcon-root {
      min-width: 32px;
      margin-left: 15px;
      
    }
    .MuiList-root li {
      display: flex;
      flex-direction: column;
     

    }
    .MuiCollapse-root .muiListItemText-root{
      padding-left:31px;
    }
    .MuiList-root li a, .MuiListItemButton-root, .MuiCollapse-root {
      width: 100%;
    }
    .MuiCollapse-root .MuiListItemText-root {
      padding-left: 31px;
    }
  `}
`;

export const BoxAvatar = styled.div`
  display:  flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;