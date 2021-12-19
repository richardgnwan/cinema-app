// All Routes with icon, pages, and icons
// To use children remove path and add children

// PAGES
import AdminHomePage from '../../pages/admin/AdminHomePage';
import MainHomePage from '../../pages/main/MainHomePage';
import MainTicketsPage from '../../pages/main/MainTicketsPage';

// ICONS
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const MAIN_ROUTES = [
  { label: 'Home', path: '/', icon: <AccountBoxIcon />, page: <MainHomePage /> },
  { label: 'Tickets', path: '/tickets', icon: <AccountBoxIcon />, page: <MainTicketsPage /> },
]

export const ADMIN_ROUTES = [
  { label: 'Admin', path: '/admin', index: true, icon: <AccountBoxIcon />, page: <AdminHomePage /> },
]
