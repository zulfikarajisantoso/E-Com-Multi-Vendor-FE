import Dashboard from '../components/admin/Dashboard'
import DashboardSuper from '../components/admin/adminsuper/Dashboard'
import Profile from '../components/admin/Profile'
import Categoory from '../components/admin/Categoory'
import Viewcategory from '../components/admin/Viewcategory'
import Editcategory from '../components/admin/Editcategory'
import ViewcategorySuper from '../components/admin/adminsuper/Category/ViewCategorySuper'
import AddproductSuper from '../components/admin/adminsuper/Product/AddProductSuper'
import EditProductSuper from '../components/admin/adminsuper/Product/EditProductSuper'
// import ViewProductSuper from '../components/admin/adminsuper/Product/ViewProductSuper'
// import Addproducts from '../components/admin/products/Addproducts'
// import Vieprod from '../components/admin/products/Vieprod'
// import Editprod from '../components/admin/products/Editprod'
import Orders from '../components/admin/order/Orders'
import SlugAndCategory from '../components/admin/adminsuper/Slug/SlugAndCategory'
import ViewSlug from '../components/admin/adminsuper/Slug/ViewSlug'
import React from 'react'
import Customer from '../components/admin/adminsuper/Customer'
const Dashboardd = React.lazy(() => import('../views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('../views/theme/colors/Colors'))
const Typography = React.lazy(() => import('../views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('../views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('../views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('../views/base/cards/Cards'))
const Carousels = React.lazy(() => import('../views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('../views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('../views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('../views/base/navs/Navs'))
const Paginations = React.lazy(() => import('../views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('../views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('../views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('../views/base/progress/Progress'))
const Spinners = React.lazy(() => import('../views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('../views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('../views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('../views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('../views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('../views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('../views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('../views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('../views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('../views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('../views/forms/layout/Layout'))
const Range = React.lazy(() => import('../views/forms/range/Range'))
const Select = React.lazy(() => import('../views/forms/select/Select'))
const Validation = React.lazy(() => import('../views/forms/validation/Validation'))

const Charts = React.lazy(() => import('../views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('../views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('../views/icons/flags/Flags'))
const Brands = React.lazy(() => import('../views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('../views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('../views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('../views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('../views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('../views/widgets/Widgets'))


const Routes = [
    { path: '/admin', exact: true, name:"Admin"},
    { path: '/admin/dashboard', exact: true, name:"Dashboard", component: Dashboardd},
    { path: '/admin/view-category', exact: true, name:"Viewcategoory", component: Viewcategory},
    // { path: '/admin/view-product', exact: true, name:"Vieprod", component: Vieprod},
    // { path: '/admin/add-product', exact: true, name:"Addproducts", component: Addproducts},
    // { path: '/admin/edit-product/:id', exact: true, name:"Editprod", component: Editprod},
    { path: '/admin/profile', exact: true, name:"Profile", component: Profile},
    { path: '/admin/orders', exact: true, name:"Orders", component: Orders},
  
];

const Routes2 = [
    { path: '/admin', exact: true, name:"Admin"},
    { path: '/admin/dashboard', exact: true, name:"Dashboard", component: DashboardSuper},
    { path: '/admin/category', exact: true, name:"Dashboard", component: Categoory},
    { path: '/admin/view-category', exact: true, name:"View Category", component: ViewcategorySuper},
    { path: '/admin/edit-product/:id', exact: true, name:"Edit Produk", component: EditProductSuper},
    { path: '/admin/addProduct', exact: true, name:"Add Products", component: AddproductSuper},
    // { path: '/admin/products', exact: true, name:"Products", component: Vieprod},
    { path: '/admin/collections', exact: true, name:"Collections", component: SlugAndCategory},
    { path: '/admin/sales/user', exact: true, name:"User", component: Customer},
    { path: '/admin/setting/profile', exact: true, name:"Profile", component: Profile},


    { path: '/admin/theme',  exact: true, name: 'Theme', component: Colors },
    { path: '/admin/theme/colors',  exact: true, name: 'Colors',  component: Colors },
    { path: '/admin/theme/typography', exact: true, name: 'Typography', component: Typography },
    { path: '/admin/base', name: 'Base', component: Cards, exact: true },
    { path: '/admin/base/accordion', name: 'Accordion', component: Accordion },
    { path: '/admin/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
    { path: '/admin/base/cards', name: 'Cards', component: Cards },
    { path: '/admin/base/carousels', name: 'Carousel', component: Carousels },
    { path: '/admin/base/collapses', name: 'Collapse', component: Collapses },
    { path: '/admin/base/list-groups', name: 'List Groups', component: ListGroups },
    { path: '/admin/base/navs', name: 'Navs', component: Navs },
    { path: '/admin/base/paginations', name: 'Paginations', component: Paginations },
    { path: '/admin/base/placeholders', name: 'Placeholders', component: Placeholders },
    { path: '/admin/base/popovers', name: 'Popovers', component: Popovers },
    { path: '/admin/base/progress', name: 'Progress', component: Progress },
    { path: '/admin/base/spinners', name: 'Spinners', component: Spinners },
    { path: '/admin/base/tables', name: 'Tables', component: Tables },
    { path: '/admin/base/tooltips', name: 'Tooltips', component: Tooltips },
    { path: '/admin/buttons', name: 'Buttons', component: Buttons, exact: true },
    { path: '/admin/buttons/buttons', name: 'Buttons', component: Buttons },
    { path: '/admin/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns },
    { path: '/admin/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
    { path: '/admin/charts', name: 'Charts', component: Charts },
    { path: '/admin/forms', name: 'Forms', component: FormControl, exact: true },
    { path: '/admin/forms/form-control', name: 'Form Control', component: FormControl },
    { path: '/admin/forms/select', name: 'Select', component: Select },
    { path: '/admin/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios },
    { path: '/admin/forms/range', name: 'Range', component: Range },
    { path: '/admin/forms/input-group', name: 'Input Group', component: InputGroup },
    { path: '/admin/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels },
    { path: '/admin/forms/layout', name: 'Layout', component: Layout },
    { path: '/admin/forms/validation', name: 'Validation', component: Validation },
    { path: '/admin/icons', exact: true, name: 'Icons', component: CoreUIIcons },
    { path: '/admin/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
    { path: '/admin/icons/flags', name: 'Flags', component: Flags },
    { path: '/admin/icons/brands', name: 'Brands', component: Brands },
    { path: '/admin/notifications', name: 'Notifications', component: Alerts, exact: true },
    { path: '/admin/notifications/alerts', name: 'Alerts', component: Alerts },
    { path: '/admin/notifications/badges', name: 'Badges', component: Badges },
    { path: '/admin/notifications/modals', name: 'Modals', component: Modals },
    { path: '/admin/notifications/toasts', name: 'Toasts', component: Toasts },
    { path: '/admin/widgets', name: 'Widgets', element: Widgets },
    // { path: '/admin/orders', exact: true, name:"Orders", component: Orders},
];

export {Routes2, Routes}
