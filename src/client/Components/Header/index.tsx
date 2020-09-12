import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/modules/reducers';
import Header from './Header';
import { toggleProjectFormIsShown } from '../../redux/modules/projectFormIsShown';
import { useDispatch } from 'react-redux';
import { toggleAriaHidden, toggleScrollLock } from '../../libs/utilFunctions';

const Component: React.FC = React.memo(
	(): JSX.Element => {
		const dispatch = useDispatch();
		const todos = useSelector((state: RootState) => state.todos.todos);

		/**
		 * project formを表示する関数
		 */
		const handleOpenForm = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				toggleAriaHidden('true');
				toggleScrollLock('true');
				dispatch(toggleProjectFormIsShown(true));
			},
			[],
		);

		return <Header todos={todos} handleOpenForm={handleOpenForm} />;
	},
);

Component.displayName = 'Component';
export default Component;
