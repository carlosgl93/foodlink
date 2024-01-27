import Drawer from '@mui/material/Drawer';

import useSidebar from '@/store/sidebar';
import useAuth from '@/store/auth';
import { NotLoggedInDrawerList } from './NotLoggedInDrawerList';
import PrestadorDrawerList from './PrestadorDrawer';
import { UsuarioDrawerList } from './UsuarioDrawerList';
import { BrandHomeLinkMobile } from './BrandHomeLinkMobile';
import { User } from '@/types/User';

function Sidebar() {
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const [{ user, isLoggedIn }] = useAuth();

  const role = user ? (user as User).role : undefined;

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
    return (
      <Drawer anchor="left" open={isSidebarOpen} onClose={closeDrawer}>
        <BrandHomeLinkMobile />
        <UsuarioDrawerList closeDrawer={closeDrawer} />
      </Drawer>
    );
  }
}

export default Sidebar;
