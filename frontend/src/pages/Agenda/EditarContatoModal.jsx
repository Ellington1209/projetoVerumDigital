import React, { useEffect } from 'react';
import { Box, Button, Modal, Typography, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PatternFormat } from 'react-number-format';

const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    description: yup.string(),
});

export default function EditarContatoModal({ open, handleClose, contato, onSubmit }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (contato) {            
            reset(contato);
            // Setando o valor inicial do telefone
            setValue('phone', contato.phone);
        }
    }, [contato, reset, setValue]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ p: 3, bgcolor: 'white', width: '400px', mx: 'auto', mt: '15vh' }}>
                <Typography variant="h6" gutterBottom>
                    Editar Contato
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nome"
                                fullWidth
                                size='small'
                                {...register('name')}
                                error={!!errors.name}
                                helperText={errors?.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                size='small'
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PatternFormat
                                label='Telefone'
                                format='(##) # ####-####'
                                mask='_'
                                customInput={TextField}
                                fullWidth
                                size='small'
                                value={contato?.phone || ''} 
                                onValueChange={(values) => {
                                    setValue("phone", values.value, { shouldValidate: true });
                                }}
                                error={!!errors.phone}
                                helperText={errors?.phone?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descrição"
                                fullWidth
                                size='small'
                                {...register('description')}
                                error={!!errors.description}
                                helperText={errors?.description?.message}
                            />
                        </Grid>
                    </Grid>
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                        <Button onClick={handleClose} color="secondary">Cancelar</Button>
                        <Button type="submit" variant="contained" color="primary">Salvar</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}
