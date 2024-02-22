import React from 'react'
import Footer from './Footer.js'
import Navbar from "./Navbar.js"
import SidebarSuper from './SidebarSuper.js'
import "../../assets/admin/css/styles.css"
import "../../assets/admin/js/scripts.js"
import { Routes2 } from '../../routes/Routes.js'
import { Switch, Route, Redirect} from 'react-router-dom'


const MasterlayoutSuper = () => {
    return (
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                 <div id="layoutSidenav_nav">
                     <SidebarSuper />
                 </div>
                 <div id="layoutSidenav_content">
                     <main>
                        <Switch>
                            {Routes2.map((rout, idx) => {
                                return (
                                    rout.component && (
                                        <Route 
                                            key={idx}
                                            path={rout.path}
                                            exact={rout.exact}
                                            name={rout.name}
                                            render={(props) => (
                                                <rout.component {...props} />
                                            )}
                                        />
                                    )
                                )
                            })

                            }
                            <Redirect from="admin" to="/adminsuper/dashboard" /> 
                
                        </Switch>
                     </main>
                     <Footer />
                 </div>
            </div>
        </div>
    )
}

export default MasterlayoutSuper
