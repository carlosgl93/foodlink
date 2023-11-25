import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import Footer from '@/components/Footer';

function Pages() {
  return (
    <Box sx={{ height: 'fit-content', minHeight: '75vh' }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
      <Footer />
    </Box>
  );
}

export default Pages;
