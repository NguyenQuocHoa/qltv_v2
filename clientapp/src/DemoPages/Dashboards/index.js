import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// DASHBOARDS

import BasicDashboard from './Basic/';

// BORROW BOOK

import BorrowBookExample from './borrowbook/';

// RETURN BOOK

import ReturnBookExample from './returnbook/';

// USER 

import UserExample from './user/';

// BOOK  

import BookExample from './book/';
 
// CATEGORY  

import CategoryExample from './category/';

// STUDENT

import StudentExample from './student/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

const Dashboards = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}/basic`} component={BasicDashboard}/>
                    <Route path={`${match.url}/borrowbook`} component={BorrowBookExample}/>
                    <Route path={`${match.url}/returnbook`} component={ReturnBookExample}/>
                    <Route path={`${match.url}/user`} component={UserExample}/>
                    <Route path={`${match.url}/book`} component={BookExample}/>
                    <Route path={`${match.url}/category`} component={CategoryExample}/>
                    <Route path={`${match.url}/student`} component={StudentExample}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Dashboards;