import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const usuarioDrawerOptions = [
  {
    title: 'Perfil',
    path: '/perfil-usuario',
    icon: AccountCircleIcon,
  },
  {
    title: 'Sesiones',
    path: '/sesiones',
    icon: CalendarTodayOutlinedIcon,
  },

  {
    title: 'Prestadores',
    path: '/resultados',
    icon: PeopleAltOutlinedIcon,
  },
  {
    title: 'Historial',
    path: '/historial',
    icon: HistoryOutlinedIcon,
  },
  {
    title: 'Inbox',
    path: '/inbox',
    icon: MailOutlinedIcon,
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
  { title: 'Buscar prestadores', path: '/resultados' },
];
