import React, { useEffect } from 'react';
import Project from '../Project';
import TodoApp from '../TodoApp';
import { downloadTodos } from '../../redux/modules/todos';
import { downloadProjects } from '../../redux/modules/projects';
import { useDispatch, useSelector } from 'react-redux';
import ModalCover from '../Common/Modal/ModalCover';
import { RootState } from '../../redux/modules/reducers';

const home: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const projectFormIsShown = useSelector(
		(state: RootState) => state.projectFormIsShown,
	);
	const todoFormIsShown = useSelector(
		(state: RootState) => state.todoFormIsShown,
	);

	useEffect(() => {
		dispatch(downloadTodos());
		dispatch(downloadProjects());
		return;
	}, []);

	return (
		<>
			<main>
				<Project />
				<TodoApp />
			</main>
			{(projectFormIsShown || todoFormIsShown) && <ModalCover />}
		</>
	);
});

home.displayName = 'home';
export default home;
