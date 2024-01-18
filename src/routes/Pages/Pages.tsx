import { Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import Footer from '@/components/Footer';

function Pages() {
  const location = useLocation();

  return (
    <Box sx={{ height: 'fit-content', minHeight: '75vh' }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
      {location.pathname !== '/chat' && <Footer />}
    </Box>
  );
}

export default Pages;
