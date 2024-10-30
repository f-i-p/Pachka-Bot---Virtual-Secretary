import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../../assets/logo.png';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `/auth/logout`
    );
    if (response.status === 200) {
      setUser({});
      setAccessToken('');
      navigate('/');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link to='/'><img src={homeIcon} alt="На главную" height="35"/></Link>
      </div>
      <div className={styles.right}>
        {user?.email ? (
          <>
          <span className={styles.welcome}>Привет, {user?.name}</span>
          <span onClick={logoutHandler} className={styles.link}>Выйти</span>
        </>
        ) : (
          <>
            <Link to='/signin' className={styles.link}>Войти</Link>
            <Link to='/signup' className={styles.link}>Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
