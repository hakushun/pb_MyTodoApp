import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/modules/reducers';
import {
	Project as typeProject,
	addProject,
	deleteProject,
	updateProject,
} from '../../redux/modules/projects';
import Project from './Project';
import {
	deleteTodosWithProject,
	Todo as typeTodo,
} from '../../redux/modules/todos';
import { toggleProjectFormIsShown } from '../../redux/modules/projectFormIsShown';
import { toggleAriaHidden, toggleScrollLock } from '../../libs/utilFunctions';

const Component: React.FC = React.memo(
	(): JSX.Element => {
		const dispatch = useDispatch();
		const isLoading = useSelector(
			(state: RootState) => state.projects.isLoading,
		);
		const projects = useSelector((state: RootState) => state.projects.projects);
		const todos = useSelector((state: RootState) => state.todos.todos);
		const initialProject = { id: 0, title: '', isComplete: false };
		const [project, setProject] = useState<typeProject>(initialProject);

		/**
		 * inputへの入力内容を制御する関数
		 */
		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				setProject({ ...project, title: e.target.value });
			},
			[project],
		);

		/**
		 * inputへの入力内容が有効か判断し、有効であれば登録する関数
		 */
		const handleSubmit = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				if (!project.title) return;
				dispatch(addProject(project.title));
				setProject(initialProject);
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleProjectFormIsShown(false));
			},
			[project],
		);

		/**
		 * 該当のprojectを削除する関数
		 */
		const handleDelete = useCallback(
			(
				e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
				prjct: typeProject,
			) => {
				e.preventDefault();
				if (window.confirm(`本当に${prjct.title}を削除しますか？`)) {
					dispatch(deleteProject(prjct.id));
					dispatch(deleteTodosWithProject(prjct.id));
				}
			},
			[setProject],
		);

		/**
		 * 該当のprojectを編集するためのformを表示する関数
		 */
		const handleEdit = useCallback(
			(
				e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
				prjct: typeProject,
			) => {
				e.preventDefault();
				setProject(prjct);
				toggleAriaHidden('true');
				toggleScrollLock('true');
				dispatch(toggleProjectFormIsShown(true));
			},
			[setProject],
		);

		/**
		 * inputへの入力内容が有効か判断し、有効であれば内容を上書きする関数
		 */
		const handleUpdate = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				if (!project.title) return;
				dispatch(updateProject(project));
				setProject(initialProject);
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleProjectFormIsShown(false));
			},
			[project],
		);

		/**
		 * inputへの入力内容を破棄する関数
		 */
		const handleCancelInput = useCallback(
			(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault();
				setProject(initialProject);
				toggleAriaHidden('false');
				toggleScrollLock('false');
				dispatch(toggleProjectFormIsShown(false));
			},
			[setProject],
		);

		/**
		 * 引数のtodosが全て完了済みかを判断する関数
		 */
		const isTodosComplete = useCallback((items: typeTodo[]) => {
			if (items.length === 0) return false;
			return items.every((item) => item.status === 'complete');
		}, []);
		return (
			<Project
				projects={projects}
				isLoading={isLoading}
				todos={todos}
				project={project}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
				handleUpdate={handleUpdate}
				handleCancelInput={handleCancelInput}
				isTodosComplete={isTodosComplete}
			/>
		);
	},
);

Component.displayName = 'Component';
export default Component;
