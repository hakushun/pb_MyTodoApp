// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import './libs/dnd-polyfill';
import React from 'react';
import Header from './Components/Header';
import Home from './Components/Pages/Home';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
	${reset}
	html {
		box-sizing: border-box;
	}

	*,
	*::before,
	*::after {
		box-sizing: inherit;
	}

	body {
		background-color: #fff8dc;
		color: #333;
		font-family: 'Noto Sans', 'Noto Sans JP', sans-serif;
	}
`;

const app = (): JSX.Element => {
	return (
		<>
			<GlobalStyle />
			<Header />
			<Home />
		</>
	);
};

export default app;
