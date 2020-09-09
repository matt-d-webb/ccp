import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
// import {
// 	BrowserRouter as Router,
// 	Switch,
// 	Route,
// 	Link
//   } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Access from "./pages/Access";

class AppWrapper extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0)
		}
	}

	render() {
		switch (this.props.location.pathname) {
			case "/login":
				return <Route path="/login" component={Login} />
			case "/error":
				return <Route path="/error" component={Error} />
			case "/notfound":
				return <Route path="/notfound" component={NotFound} />
			case "/access":
				return <Route path="/access" component={Access} />
			default:
				return <App />;
		}
	}
}

// export function AppWrapper() {
// 	return (
// 		<Switch>
// 			<Route exact path="/">
// 				<App />
// 			</Route>
// 			<Route path="/error">
// 				<Error />
// 			</Route>
// 			<Route path="/access">
// 				<Access />
// 			</Route>
// 			<Route path="/access">
// 				<Access />
// 			</Route>
// 			<Route path="/notfound">
// 				<NotFound />
// 			</Route>
// 		</Switch>
// 	)
// }


export default withRouter(AppWrapper);
