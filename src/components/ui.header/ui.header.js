import React from 'react';
import './ui.header.css';

class AppHeader extends React.Component{
    render(){
        return      (
            <nav className="navbar navbar-default navbar-static-top">
                <h1> Snappy Locations </h1>
            </nav>
        );
    }

}

export default AppHeader;