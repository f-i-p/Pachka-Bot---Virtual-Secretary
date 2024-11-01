import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './SigninPage.module.css';
import { Link } from 'react-router-dom';

export default function SigninPage({setUser}) {
  return (
    <div className={styles.wrapper}>
      <AuthForm title='Войти' type='signin' setUser={setUser}/>
      <div className="p-mt-3" style={{ textAlign: 'center', marginTop:"1rem"  }}>
          <span>Нет аккаунта? </span>
          <Link to="/signup" className="p-link" style={{ color: '#007ad9', textDecoration: 'underline'}}>Зарегистрируйтесь</Link>
        </div>
    </div>
    
  );
}
