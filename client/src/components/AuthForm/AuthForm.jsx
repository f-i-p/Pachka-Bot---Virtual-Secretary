import { useState } from 'react';
import styles from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';

export default function AuthForm({ title, type = 'signin', setUser }) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`/auth/${type}`, inputs);
      const user = response.data.user;
      setUser(user);
      setAccessToken(response.data.accessToken);
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.response) {

        const { status, data } = error.response;

        if (status === 400) {
          if (data.message === 'User already exist') {
            setError('Пользователь с таким email уже существует');
          } else if (data.message === 'All fields are required') {
            setError('Все поля обязательны для заполнения');
          } else {
            setError('Некорректные данные. Пожалуйста, проверьте введенные данные.');
          }
        } else if (status === 401) {
          setError('Неверный email или пароль');
        } else if (status === 500) {
          setError('Внутренняя ошибка сервера. Пожалуйста, попробуйте позже');
        }
      } else {
        setError('Произошла ошибка. Пожалуйста, попробуйте снова');
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        component="form"
        onSubmit={submitHandler}
        className={styles.wrapper}
        sx={{
          marginTop: '10vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" className={styles.head}>
          {title}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: '400px', mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box className={styles.inputs} sx={{ mt: 2, width: '75%' }}>
          {type === 'signin' && (
            <>
              <TextField
                onChange={changeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Эл.почта"
                name="email"
                autoComplete="email"
                autoFocus
                value={inputs?.email || ''}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={changeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputs?.password || ''}
                sx={{ width: '100%' }}
              />
            </>
          )}
          {type === 'signup' && (
            <>
              <TextField
                onChange={changeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                label="Имя пользователя"
                id="name"
                value={inputs?.name || ''}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={changeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Эл.почта"
                name="email"
                autoComplete="email"
                value={inputs?.email || ''}
                sx={{ width: '100%' }}
              />
              <TextField
                onChange={changeHandler}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={inputs?.password || ''}
                sx={{ width: '100%' }}
              />
            </>
          )}
        </Box>

        <Box className={styles.btns} sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="warning"
            size="large"
            sx={{ py: 2, px: 4 }}
          >
            {type === 'signin' ? 'Вход' : 'Регистрация'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
