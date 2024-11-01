import { useState } from 'react';
import styles from './AuthForm.module.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';

export default function AuthForm({ title, type = 'signin', setUser }) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const errors = {};

    if (!inputs.email) {
      errors.email = 'Введите email';
    }
    if (!inputs.password) {
      errors.password = 'Введите пароль';
    }

    if (type === 'signup') {
      if (inputs.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
        errors.email = 'Некорректный email';
      }
      if (inputs.password && inputs.password.length < 8) {
        errors.password = 'Пароль должен быть не менее 8 символов';
      }
      if (!inputs.name || inputs.name.trim().length < 2) {
        errors.name = 'Имя пользователя должно содержать не менее 2 символов';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

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
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email}
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
                error={Boolean(fieldErrors.password)}
                helperText={fieldErrors.password}
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
                error={Boolean(fieldErrors.name)}
                helperText={fieldErrors.name}
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
                error={Boolean(fieldErrors.email)}
                helperText={fieldErrors.email}
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
                error={Boolean(fieldErrors.password)}
                helperText={fieldErrors.password}
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
