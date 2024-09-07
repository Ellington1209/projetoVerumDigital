import React, { useEffect, useState } from 'react';
import Service from '../../services/Service';
import { Confirm, TableComponet } from '../../components';
import EditarContatoModal from './EditarContatoModal'; 
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../store/actions/loading.action';
import { changeNotify } from '../../store/actions/notify.actions';

const headers = [
    { id: "name", label: "Nome", props: { align: 'left' } },
    { id: "email", label: "Email", props: { align: 'right' } },
    { id: "phone", label: "Telefone", props: { align: 'right' } },
    { id: 'description', label: 'Desrições', props: { align: 'right' } },
    { id: 'actionRows', label: 'Ações', props: { align: 'right' } },
];

export default function TabelaAgenda({ tableUpdateTrigger }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [agendas, setAgendas] = useState([]);
    const [atualizarTabela, setAtualizarTabela] = useState(0);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedContato, setSelectedContato] = useState(null);

    const getData = async () => {
        setLoading(true);
        dispatch(changeloading({ open: true, msg: 'carregando ...' }));
        const res = await Service.get('contato');
        dispatch(changeloading({ open: false }));
        setAgendas(res.data);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, [tableUpdateTrigger, atualizarTabela]);

    const handleEdit = (contato) => {
        setSelectedContato(contato);
        setOpenEditModal(true);
    };

    const handleSubmitEdit = async (data) => {
        try {
            dispatch(changeloading({ open: true, msg: 'Salvando...' }));
            await Service.Update(data.id, data, 'contato'); 
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'success', msg: 'Contato atualizado com sucesso!' }));
            setAtualizarTabela((prev) => prev + 1); 
            setOpenEditModal(false);
        } catch (error) {
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'error', msg: 'Erro ao atualizar contato!' }));
        }
    };

    const handleOpenConfirmDialog = (id) => {
        let documentoId = id.id;
        setConfirmar({ documentoId, confirmDialogOpen: true });
    };

    const handleCloseConfirmDialog = () => {
        setConfirmar({ documentoId: null, confirmDialogOpen: false });
    };

    const [confirmar, setConfirmar] = useState({
        documentoId: null,
        confirmDialogOpen: false,
    });

    const handleDelete = () => {
        const idToDelete = confirmar.documentoId;
        Service.Delete(idToDelete, 'contato').then((res) => {
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'success', msg: res.message, }));
            setAtualizarTabela((prev) => prev + 1);
        })
            .catch((error) => {
                dispatch(changeloading({ open: false }));
                dispatch(changeNotify({ open: true, class: 'error', msg: error.message, }));
            });
        handleCloseConfirmDialog();
    };

    return (
        <>
            <Grid container spacing={2} marginTop={1}>
                {agendas.map((agenda) => (
                    <Grid item xs={12} md={12} key={agenda.id}>
                        <Box component={Paper}>
                            <Typography padding={2} variant="h4" component="div" gutterBottom>
                                {`Contatos da Agenda: ${agenda.name}`}
                            </Typography>

                            <TableComponet
                                headers={headers}
                                data={agenda.contacts}
                                loading={loading}
                                labelCaption={'Nenhum contato encontrado!'}
                                handlerEditarAction={(contato) => handleEdit(contato)}r
                                handlerDeletarAction={(event) => handleOpenConfirmDialog(event)}
                            />
                        </Box>
                    </Grid>
                ))}
                <Confirm
                    open={confirmar.confirmDialogOpen}
                    title="Deseja realmente excluir esse documento?"
                    onClose={handleCloseConfirmDialog}
                    onConfirm={handleDelete}
                />
            </Grid>

            {/* Modal de Edição */}
            {selectedContato && (
                <EditarContatoModal
                    open={openEditModal}
                    handleClose={() => setOpenEditModal(false)}
                    contato={selectedContato}
                    onSubmit={handleSubmitEdit}
                />
            )}
        </>
    );
}
