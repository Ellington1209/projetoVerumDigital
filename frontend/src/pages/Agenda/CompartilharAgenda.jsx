import React from 'react';
import { Box, FormControl, Grid, Paper, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectAutoComplete } from '../../components';
import Service from '../../services/Service';
import { useDispatch } from 'react-redux';
import { changeloading } from '../../store/actions/loading.action';
import { changeNotify } from '../../store/actions/notify.actions';

const schema = yup.object({
    agenda_id: yup.string().required(),
    user_id: yup.string().required(),
    permission: yup.string().required('Selecione uma permissão') // Validação para o campo de permissão
});

export default function CompartilharAgenda() {
    const {  handleSubmit, formState: { errors }, setValue, } = useForm({ resolver: yupResolver(schema) });
    const dispatch = useDispatch();

    const onSubmitForm = (data) => {
        dispatch(changeloading({ open: true, msg: 'Compartilhando..' }));
        Service.create(data, 'compartilhar/agenda').then((res) => {
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'success', msg: res.message }));              
        }).catch((error) => {
            console.log(error)
            dispatch(changeloading({ open: false }));
            dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.message }));
        });
    }
    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Box component={Paper} padding={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h4'>Selecione aqui a agenda e o usuário que deseja compartilhar sua agenda.</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={3}>
                            <FormControl fullWidth>
                                <SelectAutoComplete
                                    apiUrl="agenda/por/user"
                                    label="Selecione a agenda"
                                    onChange={(newValue) => setValue('agenda_id', newValue)}
                                    sx={{
                                        '.MuiSvgIcon-root': {
                                            color: 'rgba(0, 0, 0, 0.54)'
                                        }
                                    }}
                                />
                                <Typography variant='subtitle2' color="error">{errors?.agenda_id?.message}</Typography>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={3}>
                            <FormControl fullWidth>
                                <SelectAutoComplete
                                    apiUrl="users"
                                    label="Selecione o usuário do sistema"
                                    onChange={(newValue) => setValue('user_id', newValue)}
                                    sx={{
                                        '.MuiSvgIcon-root': {
                                            color: 'rgba(0, 0, 0, 0.54)'
                                        }
                                    }}
                                />
                                <Typography variant='subtitle2' color="error">{errors?.user_id?.message}</Typography>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={4}>
                            <FormControl component="fieldset" fullWidth>
                                <Box display='flex' alignContent='center' alignItems='center' gap={1}>
                                    <Typography >Defina a permissão:</Typography>
                                    <RadioGroup
                                        row
                                        aria-label="permissão"
                                        name="permission"
                                        onChange={(event) => setValue('permission', event.target.value)}
                                    >
                                        <FormControlLabel value="read" control={<Radio />} label="Apenas leitura" />
                                        <FormControlLabel value="edit" control={<Radio />} label="Editar" />
                                    </RadioGroup>
                                    <Typography variant='subtitle2' color="error">{errors?.permission?.message}</Typography>

                                </Box>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={5} lg={2}>
                            <Button type='submit' variant='contained' size='small'>compartilhar</Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    );
}
