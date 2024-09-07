import React, { useEffect, useState } from 'react';
import Service from '../../services/Service';
import { TableComponet } from '../../components';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../store/actions/loading.action';
import EditarContatoModal from './EditarContatoModal';

const headers = [
  { id: "name", label: "Nome", props: { align: 'left' } },
  { id: "email", label: "Email", props: { align: 'right' } },
  { id: "phone", label: "Telefone", props: { align: 'right' } },
  { id: 'description', label: 'Descrições', props: { align: 'right' } },
  { id: 'actionRows', label: 'Ações', props: { align: 'right' } },
];

export default function TabelaCompartilhado() {
    const [loading, setLoading] = useState(false);
    const [agendas, setAgendas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedContato, setSelectedContato] = useState(null);
    const dispatch = useDispatch();
  
    const getData = async () => {
      setLoading(true);
      dispatch(changeloading({ open: true, msg: 'carregando ...' }));
      const res = await Service.get('agenda/compartilhada');
      dispatch(changeloading({ open: false }));
      setAgendas(res);  
      setLoading(false);
    };
  
    useEffect(() => {
      getData();
    }, []);
  
    // Função para abrir o modal de edição
    const handleEdit = (contato) => {
      setSelectedContato(contato);
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedContato(null);
    };
  
    const handleUpdateContato = async (data) => {     
      await Service.Update(data.id, data, 'contato'); 
      setOpenModal(false);
      setSelectedContato(null);
      getData(); // Atualiza a tabela após a edição
    };
  
    return (
      <>
        <Grid container spacing={2} marginTop={1}>
          {agendas.map((sharedAgenda) => (
            <Grid item xs={12} md={12} key={sharedAgenda.agenda.id}>
              <Box component={Paper}>
                <Typography padding={2} variant="h4" component="div" gutterBottom>
                  {sharedAgenda.agenda.name} - Compartilhado por: {sharedAgenda.shared_by_user.name}
                </Typography>
  
                <TableComponet
                  headers={headers}
                  data={sharedAgenda.agenda.contacts}  
                  loading={loading}
                  labelCaption={'Nenhum contato encontrado!'}
                  handlerEditarAction={sharedAgenda.permission === 'edit' ? handleEdit : null} // Só mostra o botão de editar se a permissão for "edit"
                  handlerDeletarAction={''}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
  
        {/* Modal de edição */}
        {selectedContato && (
          <EditarContatoModal
            open={openModal}
            handleClose={handleCloseModal}
            contato={selectedContato}
            onSubmit={handleUpdateContato} 
          />
        )}
      </>
    );
  }