import { useEffect } from 'react';
import $$ from 'whi18n';
import { useTitle } from '../../hooks/misc';
import { useNavigate } from 'react-router-dom';

const Home = props => {
  useTitle('wheatup');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      navigate('/copy-pasta?fullscreen=1');
    }
  }, []);

  return (
    <div className={`Home${window.CSS.registerProperty ? '' : ' not-support'}`}>
      <h2 data-fallback={$$`wip`}></h2>
    </div>
  );
};

export default Home;
