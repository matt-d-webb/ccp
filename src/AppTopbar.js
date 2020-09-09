import React from 'react';

export function AppTopbar(props) {

    const { onMenuButtonClick } = props;

    return (<div className="topbar clearfix">
        <div className="topbar-left">
            <img alt="Logo" src="assets/layout/images/logo.png" className="topbar-logo" />
        </div>
        <div className="topbar-right">
            <button className="p-link" id="menu-button" onClick={onMenuButtonClick}>
                <i className="fa fa-angle-left"></i>
            </button>
        </div>
    </div>)

}
