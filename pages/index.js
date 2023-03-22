
import LoginPage from './component/Login';
import Header from './component/Header';
import { useAuth } from './../context/AuthContext';
import Dashboard from './component/Dashboard';
import Footer from './component/Footer';

export default function Home() {
  const { currentUser } = useAuth()


  return (
    <div className='w-full min-h-screen text-white bg-black'>
      <Header />
      {!currentUser && <LoginPage />}
      {currentUser && <Dashboard />}
      < Footer />
    </div>
  )
}
