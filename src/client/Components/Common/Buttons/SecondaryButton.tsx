import React from 'react';
import styled from 'styled-components';

const Secondary = styled.button`
	background-color: #dbeeff;
	border: 2px solid #dbeeff;
	border-radius: 3px;
	box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.5);
	color: #33322c;
	cursor: pointer;
	font-size: 16px;
	font-weight: bold;
	max-width: 200px;
	min-width: 150px;
	outline: none;
	padding: 7px;

	&:hover {
		background-color: #fff;
	}

	&:focus {
		background-color: #fff;
	}

	&:active {
		box-shadow: none;
		transform: translateY(3px);
	}
`;

type Props = {
	method?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	text: string;
};

const SecondaryButton: React.FC<Props> = React.memo(({ method, text }) => {
	return (
		<Secondary type="button" onClick={method}>
			{text}
		</Secondary>
	);
});

SecondaryButton.displayName = 'SecondaryButton';
export default SecondaryButton;
