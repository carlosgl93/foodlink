import Drawer from '@mui/material/Drawer';

import useSidebar from '@/store/sidebar';
import useAuth from '@/store/auth';
import { NotLoggedInDrawerList } from './NotLoggedInDrawerList';
import PrestadorDrawerList from './PrestadorDrawer';
import { UsuarioDrawerList } from './UsuarioDrawerList';
import { BrandHomeLinkMobile } from './BrandHomeLinkMobile';

function Sidebar() {
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const [{ isLoggedIn, role }, { logout }] = useAuth();

  const closeDrawer = sidebarActions.close;

  if (!isLoggedIn) {
    return (
      <Drawer anchor="left" open={isSidebarOpen} onClose={closeDrawer}>
        <BrandHomeLinkMobile />
        <NotLoggedInDrawerList closeDrawer={closeDrawer} />
      </Drawer>
    );
  } else if (isLoggedIn && role === 'prestador') {
    return (
      <Drawer anchor="left" open={isSidebarOpen} onClose={closeDrawer}>
        <BrandHomeLinkMobile />
        <PrestadorDrawerList closeDrawer={closeDrawer} />;
      </Drawer>
    );
  } else {
    // user logged in as user user.role === 'user'
    return (
      <Drawer anchor="left" open={isSidebarOpen} onClose={closeDrawer}>
        <BrandHomeLinkMobile />

        <UsuarioDrawerList closeDrawer={closeDrawer} logout={logout} />
      </Drawer>
    );
  }
}

export default Sidebar;
