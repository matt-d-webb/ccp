import React from 'react';

export const AppFooter = () => {

    const goToGitHub = () => {
        // TODO: move to config:
        window.location.href = "https://github.com/chess-centre/welcome"
    }

    return (<div className="layout-footer">
        <span className="footer-text-left">
            <img alt="Logo" src="assets/layout/images/logo-dark.png" />
        </span>
        <span className="footer-text-right">
            Est. 2020
            <button className="p-link" onClick={() => goToGitHub()}><i className="fa fa-github"></i></button>
        </span>
    </div>
    )
}