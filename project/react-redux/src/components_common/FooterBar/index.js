import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import './index.scss';

const FooterBar = (/*{match, location, history}*/) => {

    return (

        <div className='m-footer-bar'>

            <NavLink to='/home' activeClassName='tab-selected'>tab1</NavLink>
            <NavLink to='/site' activeClassName='tab-selected'>tab2</NavLink>
            <NavLink to='/my' activeClassName='tab-selected'>tab3</NavLink>

        </div>

    )

};

export default withRouter(FooterBar)
