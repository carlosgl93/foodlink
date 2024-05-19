import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const prestadorDrawerOptions = [
  {
    title: 'Panel',
    path: '/proveedor-dashboard',
    icon: HomeOutlinedIcon,
  },
  // {
  //   title: 'Sesiones',
  //   path: '/sesiones',
  //   icon: CalendarTodayOutlinedIcon,
  // },
  {
    title: 'Ventas',
    path: '/ventas',
    icon: FormatListBulletedOutlinedIcon,
  },
  {
    title: 'Clientes',
    path: '/clientes',
    icon: PeopleAltOutlinedIcon,
  },
  {
    title: 'Historial',
    path: '/historial',
    icon: HistoryOutlinedIcon,
  },
  {
    title: 'Inbox',
    path: '/proveedor-inbox',
    icon: MailOutlinedIcon,
  },
  {
    title: 'Pagos',
    path: '/pagos',
    icon: AttachMoneyOutlinedIcon,
  },
  {
    title: 'Configuración',
    path: '/configuracion',
    icon: SettingsOutlinedIcon,
  },
];

export const generalOptionsDrawerList = [
  { title: 'Ayuda', path: '/ayuda' },
  { title: 'Acerca de nosotros', path: '/nosotros' },
  { title: 'Buscar proveedores / compradores', path: '/resultados' },
];
