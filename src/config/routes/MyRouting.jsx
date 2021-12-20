import { Fragment } from 'react'
import { Route, Routes } from 'react-router'
import { ADMIN_ROUTES, MAIN_ROUTES } from './AllRoutes'
import AdminMovie from "../../AdminMovie";
import AdminVoucher from "../../AdminVoucher";
// function ItemLi (props) {
//   const { data } = props;
//   if (data.children) return (
//     <Fragment>
//       { data.children.map((item, idx) => (
//         <ItemLi key={idx} data={item} />
//       )) }
//     </Fragment>
//   )
//   return (
//     <Route path={data.path} element={data.page} />
//   )
// }

export default function MyRouting() {
  return (
    <Routes>
      {/* Main Routes */}
      { MAIN_ROUTES.map((route, idx) => (
        <Fragment key={idx}>
          { route.children ? (
            <Fragment>
              { route.children.map((item, idx2) => (
                <Route key={idx2} index={item.index} path={item.path} element={item.page} />
              )) }
            </Fragment>
          ) : (
            <Route key={idx} index={route.index} path={route.path} element={route.page} />
          ) }
        </Fragment>
      )) }

      {/* Admin Routes */}
      { ADMIN_ROUTES.map((route, idx) => (
        <Fragment key={idx}>
          { route.children ? (
            <Fragment>
              { route.children.map((item, idx2) => (
                <Route key={idx2} index={item.index} path={item.path} element={item.page} />
              )) }
            </Fragment>
          ) : (
            <Route key={idx} index={route.index} path={route.path} element={route.page} />
          ) }
        </Fragment>
      )) }
      <Route exact path="/masterMovie" element={<AdminMovie/>}></Route>
      <Route exact path="/masterVoucher" element={<AdminVoucher/>}></Route>
    </Routes>
  )
}
