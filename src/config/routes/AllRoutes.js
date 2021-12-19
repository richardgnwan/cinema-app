// All Routes with icon, pages, and icons
// To use children remove path and add children

// PAGES
import AdminHomePage from '../../pages/admin/AdminHomePage';
import MainHomePage from '../../pages/main/MainHomePage';
import MainTicketsPage from '../../pages/main/MainTicketsPage';
import MainTicketsQrPage from '../../pages/main/MainTicketsQrPage';
import MainTicketsInvoicePage from '../../pages/main/MainTicketsInvoicePage';

// ICONS
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const MAIN_ROUTES = [
  { label: 'Home', path: '/', icon: <AccountBoxIcon />, page: <MainHomePage /> },
  { label: 'Tickets', path: '/tickets', icon: <AccountBoxIcon />, page: <MainTicketsPage /> },
  { label: 'Tickets QR', path: '/tickets/qr', icon: <AccountBoxIcon />, page: <MainTicketsQrPage /> },
  // { label: 'Tickets Invoice', path: '/tickets/invoice', icon: <AccountBoxIcon />, page: <MainTicketsInvoicePage /> },
]

export const ADMIN_ROUTES = [
  { label: 'Admin', path: '/admin', index: true, icon: <AccountBoxIcon />, page: <AdminHomePage /> },
]
