import React from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../image/logo-verum-digital-b-181x43.png'

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


import { useDispatch } from 'react-redux';
import { login } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';



const schema = yup
  .object({
    name_user: yup.string().required(),
    password: yup.string().required().min(5),
  })

function Login() {
  const { register, handleSubmit: onSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleSubmit = async (credentials) => {
    try {
      await dispatch(login(credentials));
      const user = JSON.parse(localStorage.getItem("user"));
      switch (user.group_id) {
        case 1:
          navigate("/agenda");
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };




  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'
      sx={{
        background: 'linear-gradient(to bottom, #2C003E, #3C0055 30%, #4B006D 70%, #5A007E)',
      }}>
      <Box component={Paper} elevation={4} display='flex' flexDirection='column' alignItems='center' width={380} height={370} bgcolor='#2C003E' >
        <img
          src={Logo}
          alt="Logo Verum Digital"
          style={{ marginTop: '30px', width: 'auto', height: '70px', objectFit: 'contain', }}
        />
        <form onSubmit={onSubmit(handleSubmit)}>
          <Box marginTop="20px">
            <TextField
              label="Usuario"
              size='small'
              fullWidth
              {...register("name_user")}
            />
            <Typography variant='subtitle2'>{errors?.email?.message}</Typography>
          </Box>

          <Box marginTop="20px">
            <TextField
              label="Senha"
              type="password"
              size='small'
              fullWidth
              {...register("password")}
              color="secondary"
            />
            <Typography variant='subtitle2'>{errors?.password?.message}</Typography>
          </Box>
          <Box marginTop="20px">
            <Button type='submit' variant='contained' fullWidth>Enviar</Button>
          </Box>
          <Box marginTop="20px">
            <Typography sx={{ fontSize: '13px', color: 'white' }}>
              Ainda não tem conta?{' '}
              <Link to="/register"
               style={{
                color: 'white',
                textDecoration: 'underline',
                transition: 'color 0.3s ease',
              }}
                onMouseEnter={(e) => e.target.style.color = '#888484'}
                onMouseLeave={(e) => e.target.style.color = 'white'}>
                registre-se aqui
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  )

}

export default Login;