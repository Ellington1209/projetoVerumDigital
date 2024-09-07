import React, { useState } from 'react'
import { Box, Button, FormControl, Grid, IconButton, Modal, TextField, Tooltip, Typography } from '@mui/material'

import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PatternFormat } from 'react-number-format';
import { SelectAutoComplete } from '../../components';
import { ControlPoint } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../store/actions/loading.action';
import Service from '../../services/Service'
import { modalStyleTipoContrato } from '../../themes/Styles';
import { changeNotify } from '../../store/actions/notify.actions';

const schema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    phone: yup.string().required(),
    agenda_id: yup.string().required(),

});




export default function AdicionarAgenda({ handleCloseModal, setTableUpdateTrigger }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, setValue,} = useForm({ resolver: yupResolver(schema) });
    const [openModalButton, setOpenModalButton] = useState(false);
    const [nomeTipo, setNomeTipo] = useState('');
    const [selectKey, setSelectKey] = useState(0);

    const onSubmitForm = (data) => {
        dispatch(changeloading({ open: true, msg: 'Salvando..' }));
        Service.create(data, 'contato').then((res) => {
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'success', msg: res.message }));   
            handleCloseModal(); 
            setTableUpdateTrigger(prev => prev + 1);   
        }).catch((error) => {
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.error }));
        });
    }

    const handleOpenModalButton = () => {
        setOpenModalButton(true);
    };
    const handleCloseModalButton = () => {
        setOpenModalButton(false);
    };

    const handleSalvarTipo = () => {
        dispatch(changeloading({ open: true, msg: 'Salvando..' }));
        let data = {
            name: nomeTipo
        };
        Service.create(data, 'agendas').then((res) => {
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'success', msg: res.message }));
            setSelectKey(prevKey => prevKey + 1);
            setOpenModalButton(false);
        }).catch((error) => {
            dispatch(changeloading({ open: false }));
            const backendMessage = error.response?.data?.error || 'Erro desconhecido';
            dispatch(changeNotify({ open: true, class: 'error', msg: backendMessage }));
        });
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label='Nome do contato'
                            type='text'
                            variant='outlined'
                            fullWidth
                            size='small'
                            {...register("name")}
                        />
                        <Typography variant='subtitle2'>{errors?.name?.message}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TextField
                            label='Email'
                            type='email'
                            variant='outlined'
                            fullWidth
                            size='small'
                            {...register("email")}
                        />
                        <Typography variant='subtitle2'>{errors?.email?.message}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <PatternFormat
                            label='Telefone'
                            format='(##) # ####-####'
                            mask='_'
                            customInput={TextField}
                            fullWidth
                            size='small'
                            onValueChange={(values) => {
                                setValue("phone", values.value, { shouldValidate: true });
                            }}
                            {...register("phone")}
                        />
                        <Typography variant='subtitle2'>{errors?.phone?.message}</Typography>
                    </Grid>

                  

                    <Grid item xs={12} sm={6} md={5} lg={4}>
                        <Box display='flex' alignItems='center' >
                            <FormControl fullWidth>
                                <SelectAutoComplete
                                    key={selectKey}
                                    apiUrl="agenda/por/user"
                                    label="Nome da agenda"
                                    onChange={(newValue) => setValue('agenda_id', newValue)}
                                />
                                <Typography variant='subtitle2' color="error">{errors?.agenda_id?.message}</Typography>
                            </FormControl>
                            <Tooltip title="Adicionar novo nome de agenda">
                                <IconButton onClick={handleOpenModalButton} >
                                    <ControlPoint color="success" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <TextField
                            label='Descrição'
                            multiline
                            minRows={1}   
                            maxRows={3}   
                            variant='outlined'
                            fullWidth
                            size='small'
                            {...register("description")}
                        />
                     
                    </Grid>

                    
                    <Grid item xs={12} sm={6} md={5} lg={3}>
                        <Button type='submit' variant='contained' size='small' fullWidth >Salvar agenda</Button>
                    </Grid>
                </Grid>
            </form>

            <Modal
                open={openModalButton}
                onClose={handleCloseModalButton}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyleTipoContrato}>
                    <Box>
                        <TextField
                            label='Adicione novo nome da agenda '
                            variant='outlined'
                            fullWidth
                            size='small'
                            value={nomeTipo}
                            onChange={(e) => setNomeTipo(e.target.value)}
                        />
                        <Box marginTop={2}>
                            <Button onClick={handleSalvarTipo}>Salvar</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
