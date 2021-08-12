import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';
import SettingsIcon from '@material-ui/icons/Settings';
import StarIcon from '@material-ui/icons/Star';

const routes = [
  {
    id: 'root',
    label: 'Home',
    icon: HomeIcon,
    route: '/',
  },
  {
    id: 'demo-a',
    label: 'Demo A',
    icon: LanguageIcon,
    route: '/demo-a',
  },
  {
    id: 'demo-b',
    label: 'Demo B',
    icon: StarIcon,
    route: '/demo-b',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon,
    route: '/settings',
  },
];

export default routes;
