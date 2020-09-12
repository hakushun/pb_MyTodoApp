import { Reducer } from 'redux';
import axios from 'axios';
import { savesProjects, calculateId } from '../../libs/utilFunctions';

axios.defaults.withCredentials = true;

// action type
const add_project = 'add_project';
const delete_project = 'delete_project';
const update_project = 'update_project';
const set_projects = 'set_projects';
const toggle_complete = 'toggle_complete';

export interface Project {
	id: number;
	title: string;
	isComplete: boolean;
}
interface Projects {
	isLoading: boolean;
	projects: Project[];
}

type AddProject = {
	type: typeof add_project;
	payload: string;
};
type DeleteProject = {
	type: typeof delete_project;
	payload: number;
};
type UpdateProject = {
	type: typeof update_project;
	payload: Project;
};
type SetProjects = {
	type: typeof set_projects;
	payload: Project[];
};
type ToggleComplete = {
	type: typeof toggle_complete;
	payload: { id: number; status: boolean };
};

// action creator
export const addProject = (title: string): AddProject => {
	return { type: add_project, payload: title };
};
export const deleteProject = (id: number): DeleteProject => {
	return { type: delete_project, payload: id };
};
export const updateProject = (project: Project): UpdateProject => {
	return { type: update_project, payload: project };
};
export const setProjects = (projects: Project[]): SetProjects => {
	return { type: set_projects, payload: projects };
};
export const toogleComplete = (id: number, status: boolean): ToggleComplete => {
	return { type: toggle_complete, payload: { id, status } };
};

export const downloadProjects = () => {
	// ここの型定義が不明
	return async (dispatch: any) => {
		const res = await axios.get('/api/projects/');
		const projects = await JSON.parse(res.data);
		return dispatch(setProjects(projects));
	};
};

type Action =
	| AddProject
	| DeleteProject
	| UpdateProject
	| SetProjects
	| ToggleComplete;

const initialState: Projects = {
	isLoading: true,
	projects: [],
};

const projects: Reducer<Projects, Action> = (
	state = initialState,
	action,
): Projects => {
	switch (action.type) {
		case add_project:
			savesProjects([
				...state.projects,
				{
					id: calculateId(state.projects),
					title: action.payload,
					isComplete: false,
				},
			]);
			return {
				isLoading: false,
				projects: [
					...state.projects,
					{
						id: calculateId(state.projects),
						title: action.payload,
						isComplete: false,
					},
				],
			};

		case delete_project:
			savesProjects(
				state.projects.filter((project) => project.id !== action.payload),
			);
			return {
				isLoading: false,
				projects: state.projects.filter(
					(project) => project.id !== action.payload,
				),
			};

		case update_project: {
			const otherState = state.projects.filter(
				(project) => project.id !== action.payload.id,
			);
			savesProjects([...otherState, action.payload]);
			return { isLoading: false, projects: [...otherState, action.payload] };
		}

		case set_projects:
			return { isLoading: false, projects: [...action.payload] };

		case toggle_complete: {
			const targetProject = state.projects.find(
				(project) => project.id === action.payload.id,
			);
			const otherState = state.projects.filter(
				(project) => project.id !== action.payload.id,
			);
			if (targetProject) {
				savesProjects([
					...otherState,
					{ ...targetProject, isComplete: action.payload.status },
				]);
				return {
					isLoading: false,
					projects: [
						...otherState,
						{ ...targetProject, isComplete: action.payload.status },
					],
				};
			}
			return state;
		}

		default:
			return state;
	}
};

export default projects;
