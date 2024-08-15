import './App.css';
import { Bars } from 'react-loader-spinner';
import LoadingOverlay from 'react-loading-overlay';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store/store';
import { Navbar } from './app/components/Navbar';

function App() {
  const loading = useSelector((state: RootState) => state.config.loading)

  return (
    <LoadingOverlay
      active={loading}
      spinner={
        <Bars 
          height="40"
          width="40"
          color="#2563eb"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      }
    >
      <ToastContainer />
      <div className="App">
        <header className="App-header">
          <Navbar />
          <div className='container py-10 flex h-screen'>
            <Outlet />
          </div>
        </header>
      </div>
    </LoadingOverlay>
  );
}

export default App;
