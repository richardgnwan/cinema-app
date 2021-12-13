import React from 'react'
import RouteMiddleware from '../../config/middleware/RouteMiddleware';
import AdminLayout from '../../config/layouts/adminLayouts/AdminLayout'

const AdminHomePage = () => {
  return (
    <AdminLayout isLoading={false} title="Hai" >
      This is admin
    </AdminLayout>
  )
}

export default AdminHomePage;
// export default RouteMiddleware(AdminHomePage);