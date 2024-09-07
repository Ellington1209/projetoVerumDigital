import styled from 'styled-components';
import { Tabs } from '@mui/material';

// Estilizando o Tabs com styled-components
export const StyledTabs = styled(Tabs)`
  .MuiTab-root {
    margin-right: 16px; 

    @media (max-width: 600px) {
      margin-right: 0;
      margin-bottom: 8px; 
    }

    color: gray;

    &:hover {
      color: black;
    }

    &.Mui-selected {
      color: black;
    }
  }
`;
