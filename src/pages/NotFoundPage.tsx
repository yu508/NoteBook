import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import { Link, useRouteError } from 'react-router-dom';

const NotFoundPage = () => {
	const error = useRouteError()
	return (
		<div>
			<h1>404 Not Found</h1>
			<Link to="/"><MyButton >Back to Home Page</MyButton></Link>
			<p>{error.statusText ?? error.message}</p>
		</div>
	);
}

export default NotFoundPage;
