import React from 'react';
import { Project as typeProject } from '../../redux/modules/projects';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { Todo as typeTodo } from '../../redux/modules/todos';
import { RootState } from '../../redux/modules/reducers';
import { useSelector } from 'react-redux';

type Props = {
	projects: typeProject[];
	isLoading: boolean;
	todos: typeTodo[];
	project: typeProject;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleDelete: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
	handleEdit: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		prjct: typeProject,
	) => void;
	handleUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	handleCancelInput: (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => void;
	isTodosComplete: (items: typeTodo[]) => boolean;
};

const Project: React.FC<Props> = React.memo(
	({
		projects,
		isLoading,
		todos,
		project,
		handleChange,
		handleSubmit,
		handleDelete,
		handleEdit,
		handleUpdate,
		handleCancelInput,
		isTodosComplete,
	}) => {
		const projectFormIsShown = useSelector(
			(state: RootState) => state.projectFormIsShown,
		);
		return (
			<>
				{projectFormIsShown && (
					<ProjectForm
						project={project}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						handleUpdate={handleUpdate}
						handleCancelInput={handleCancelInput}
					/>
				)}
				<ProjectList
					projects={projects}
					isLoading={isLoading}
					todos={todos}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					isTodosComplete={isTodosComplete}
				/>
			</>
		);
	},
);

Project.displayName = 'Project';
export default Project;
