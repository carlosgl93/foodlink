import { Fragment, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { CircularProgress } from '@mui/material';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <CssBaseline />
        <HotKeys />
        <SW />
        <BrowserRouter>
          <Header />
          <Sidebar />
          <Suspense
            fallback={
              <CircularProgress
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  minHeight: '75vh',
                }}
              />
            }
          >
            <Pages />
          </Suspense>
        </BrowserRouter>
      </Fragment>
    </QueryClientProvider>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
