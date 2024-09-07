import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import { CustomTabPanel, Title } from '../../components';
import AdicionarAgenda from './AdicionarAgenda';
import TabelaAgenda from './TabelaAgenda';
import TabelaCompartilhado from './TabelaCompartilhado';
import CompartilharAgenda from './CompartilharAgenda';
import { StyledTabs } from './styles'

export default function Agenda() {
  const [tableUpdateTrigger, setTableUpdateTrigger] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Title
          title="Agenda"
          buttonText="Adicionar Contato"
          modalContent={<AdicionarAgenda setTableUpdateTrigger={setTableUpdateTrigger} />}
        />
      </Box>
      <Box marginTop={3}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          orientation={window.innerWidth < 600 ? 'vertical' : 'horizontal'}
        >
          <Tab label="Minhas Agendas " />
          <Tab label="Compartilhadas comigo" />
          <Tab label="Compartilhar com outro usuário" />
        </StyledTabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <TabelaAgenda tableUpdateTrigger={tableUpdateTrigger} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabelaCompartilhado />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CompartilharAgenda />
      </CustomTabPanel>
    </>
  );
}
