import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../image/logo-verum-digital-b-181x43.png'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeloading } from '../store/actions/loading.action';
import { changeNotify } from '../store/actions/notify.actions';
import Service from '../services/Service';


// Esquema de validação para o registro
const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  name_user: yup.string().required('Nome de usuário é obrigatório'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  password: yup.string().required('Senha é obrigatória').min(5, 'A senha deve ter pelo menos 5 caracteres'),
});

function Register() {
  const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    Service.create(data, 'register').then((res) => {
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: 'success', msg: res.message }));       
        navigate("/login");
    }).catch((error) => {
        console.log(error)
        dispatch(changeloading({ open: false }));
        dispatch(changeNotify({ open: true, class: 'error', msg: error.response.data.error }));
    })
  };

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
      sx={{
        background: 'linear-gradient(to bottom, #2C003E, #3C0055 30%, #4B006D 70%, #5A007E)',
      }}>
      <Box component={Paper} elevation={4} display='flex' flexDirection='column' alignItems='center' width={380} height={490} bgcolor='#2C003E'>
        <img
          src={Logo}
          alt="Logo Verum Digital"
          style={{ marginTop: '30px', width: 'auto', height: '70px', objectFit: 'contain', }}
        />
        <form onSubmit={onSubmit(handleSubmit)}>
          <Box marginTop="20px">
            <TextField
              label="Nome"
              size='small'
              fullWidth
              {...register("name")}
            />
            <Typography variant='subtitle2' color="error">{errors?.name?.message}</Typography>
          </Box>

          <Box marginTop="20px">
            <TextField
              label="Nome de Usuário"
              size='small'
              fullWidth
              {...register("name_user")}
            />
            <Typography variant='subtitle2' color="error">{errors?.name_user?.message}</Typography>
          </Box>

          <Box marginTop="20px">
            <TextField
              label="Email"
              size='small'
              fullWidth
              {...register("email")}
            />
            <Typography variant='subtitle2' color="error">{errors?.email?.message}</Typography>
          </Box>

          <Box marginTop="20px">
            <TextField
              label="Senha"
              type="password"
              size='small'
              fullWidth
              {...register("password")}
            />
            <Typography variant='subtitle2' color="error">{errors?.password?.message}</Typography>
          </Box>

          <Box marginTop="20px">
            <Button type='submit' variant='contained' fullWidth>Registrar</Button>
          </Box>

          <Box marginTop="20px">
            <Typography sx={{ fontSize: '13px', color: 'white' }}>
              Já tem uma conta?{' '}
              <Link to="/login"
               style={{
                color: 'white',
                textDecoration: 'underline',
                transition: 'color 0.3s ease',
              }}
                onMouseEnter={(e) => e.target.style.color = '#888484'}
                onMouseLeave={(e) => e.target.style.color = 'white'}>
                Faça login aqui
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
