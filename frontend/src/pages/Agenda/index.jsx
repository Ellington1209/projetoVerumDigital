import { Box, Tab, Tabs, } from '@mui/material'
import React, { useState } from 'react'
import { CustomTabPanel, Title } from '../../components'
import AdicionarAgenda from './AdicionarAgenda'
import TabelaAgenda from './TabelaAgenda'
import TabelaCompartilhado from './TabelaCompartilhado'
import CompartilharAgenda from './CompartilharAgenda'


export default function Agenda() {
  const [tableUpdateTrigger, setTableUpdateTrigger] = useState(0);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Title title="Agenda" buttonText="Adicionar Contato" modalContent={<AdicionarAgenda setTableUpdateTrigger={setTableUpdateTrigger} />} />
      </Box>
      <Box  marginTop={3} >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          orientation={window.innerWidth < 600 ? 'vertical' : 'horizontal'}
          sx={{
            '& .MuiTab-root': {
              marginRight: 2,
              '@media (max-width: 600px)': {
                marginRight: 0,
                marginBottom: 1, 
              },             
              color: 'gray',
              '&:hover': {
                color: 'black',
              }, 
              '&.Mui-selected': {
                color: 'black', 
              },            
            },
          }}
        >
          <Tab label="Minhas Agendas " />
          <Tab label="Compartilhadas comigo" />
          <Tab label="Compartilhar com outro usuario" />
        </Tabs>
      </Box>
     
        <CustomTabPanel value={value} index={0}>
          <TabelaAgenda tableUpdateTrigger={tableUpdateTrigger} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TabelaCompartilhado/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <CompartilharAgenda/>
        </CustomTabPanel>
     
    </>
  )
}


