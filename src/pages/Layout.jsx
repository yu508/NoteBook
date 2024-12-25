import React from 'react';
import { Outlet, useNavigate, useParams} from 'react-router-dom';
import Header from "../components/UI/header/Header.tsx";

const Layout = () => {
	useParams()
	useNavigate()
 	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
}

export default Layout;
