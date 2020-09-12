import React from 'react';
import styled from 'styled-components';
import NavButton from '../Common/Buttons/NavButton';
import { Todo } from '../../redux/modules/todos';
import { getToday } from '../../libs/utilFunctions';

const HeaderWrapper = styled.header`
	background-color: #dbeeff;
	padding: 10px 16px;
	width: 100vw;
`;
const HeaderInner = styled.div`
	align-items: center;
	display: flex;
	margin: 0 auto;
	max-width: 1200px;
`;
const TitleWrapper = styled.div`
	padding: 5px 0;
`;
const Title = styled.h1`
	font-size: 30px;
	font-weight: bold;

	@media (max-width: 560px) {
		font-size: 24px;
	}
`;
const TextWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-left: auto;
	padding: 5px 10px;
`;
const TextInner = styled.div`
	& + & {
		margin-left: 20px;
	}

	@media (max-width: 560px) {
		display: none;
	}
`;
const Span = styled.span`
	font-size: 20px;
	font-weight: bold;
`;
type Props = {
	todos: Todo[];
	handleOpenForm: (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
};

const Header: React.FC<Props> = React.memo(
	({ todos, handleOpenForm }): JSX.Element => {
		const totalTodos = todos.filter((todo) => todo.status !== 'complete');
		const todayTodos = todos.filter(
			(todo) => todo.dueDate === getToday() && todo.status !== 'complete',
		);

		return (
			<HeaderWrapper id="header" aria-hidden="false">
				<HeaderInner>
					<TitleWrapper>
						<Title>TodoApp</Title>
					</TitleWrapper>
					<TextWrapper>
						<TextInner>
							<Span>Total: {totalTodos.length}</Span>
						</TextInner>
						<TextInner>
							<Span>Due Today: {todayTodos.length}</Span>
						</TextInner>
					</TextWrapper>
					<NavButton text="Create Project" method={(e) => handleOpenForm(e)} />
				</HeaderInner>
			</HeaderWrapper>
		);
	},
);

Header.displayName = 'Header';
export default Header;
