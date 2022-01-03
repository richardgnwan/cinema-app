// All Routes with icon, pages, and icons
// To use children remove path and add children

// PAGES
import AdminHomePage from '../../pages/admin/AdminHomePage';
import MainHomePage from '../../pages/main/MainHomePage';
import MainLoginPage from '../../pages/main/MainLoginPage';
import MainTicketsPage from '../../pages/main/MainTicketsPage';
import MainTicketsQrPage from '../../pages/main/MainTicketsQrPage';
import MainTicketsInvoicePage from '../../pages/main/MainTicketsInvoicePage';
import MoviesDetailPage from '../../pages/main/MoviesDetailPage';
import OrderPage from '../../pages/main/OrderPage';
import PilihKursiPage from '../../pages/main/PilihKursiPage';
import MainTopupPage from '../../pages/main/MainTopupPage';
import AdminMovie from '../../pages/admin/AdminMovie';
import AdminVoucher from '../../pages/admin/AdminVoucher';
import AdminJadwalPage from '../../pages/admin/AdminJadwalPage';
// import AdminLogin from '../../pages/admin/AdminLogin';

// ICONS
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InventoryIcon from '@mui/icons-material/Inventory';
import MovieIcon from '@mui/icons-material/Movie';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import SummarizeIcon from '@mui/icons-material/Summarize';

export const MAIN_ROUTES = [
  { label: 'Home', path: '/', icon: <AccountBoxIcon/>, page: <MainHomePage/> },
  { label: 'Login', path: '/login', icon: <AccountBoxIcon/>, page: <MainLoginPage/> },
  { label: 'Tickets', path: '/tickets', icon: <AccountBoxIcon />, page: <MainTicketsPage /> },
  // { label: 'Tickets QR', path: '/tickets/qr', icon: <AccountBoxIcon />, page: <MainTicketsQrPage /> },
  // { label: 'Tickets Invoice', path: '/tickets/invoice', icon: <AccountBoxIcon />, page: <MainTicketsInvoicePage /> },
  { label: 'Movies', path: '/movies/:id', icon: <AccountBoxIcon />, page: <MoviesDetailPage/> },
  { label: 'Order', path: '/order', icon: <AccountBoxIcon />, page: <OrderPage/> },
  { label: 'Tickets QR', path: '/tickets/:id_ticket/qr', icon: <AccountBoxIcon />, page: <MainTicketsQrPage /> },
  { label: 'Tickets Invoice', path: '/tickets/:id_ticket/invoice', icon: <AccountBoxIcon />, page: <MainTicketsInvoicePage /> },
  { label: 'Topup', path: '/topup', icon: <AccountBoxIcon />, page: <MainTopupPage /> },
  { label: 'Pilih Kursi Page', path: '/pilih-kursi', icon: <AccountBoxIcon />, page: <PilihKursiPage /> },
]

export const ADMIN_ROUTES = [
  // { label: 'Admin', path: '/admin', index: true, icon: <AdminPanelSettingsIcon />, page: <AdminHomePage /> },
  { label: 'Master', icon: <InventoryIcon />, children: [
    { label: 'Movie', path: '/admin/master-movie', index: false, icon: <MovieIcon />, page: <AdminMovie /> },
    { label: 'Jadwal', path: '/admin/master-jadwal', index: false, icon: <ScheduleIcon />, page: <AdminJadwalPage /> },
    { label: 'Voucher', path: '/admin/master-voucher', index: false, icon: <LocalActivityIcon />, page: <AdminVoucher /> },
  ] },
  { label: 'Reports', icon: <SummarizeIcon />, children: [

  ] },
]
