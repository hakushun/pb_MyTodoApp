import { Reducer } from 'redux';
import axios from 'axios';
import { saveTodos, calculateId } from '../../libs/utilFunctions';

axios.defaults.withCredentials = true;

// action type
const add_todo = 'add_todo';
const delete_todo = 'delete_todo';
const update_todo = 'update_todo';
const change_status = 'change_status';
const set_todos = 'set_todos';
const delete_todos_with_project = 'delete_todos_with_project';

export type Status = 'new' | 'in_progress' | 'reviewing' | 'complete';
export interface Todo {
	id: number;
	title: string;
	dueDate: string;
	status: Status;
	projectId: number;
}
interface Todos {
	isLoading: boolean;
	todos: Todo[];
}

type AddTodo = {
	type: 'add_todo';
	payload: { title: string; dueDate: string; projectId: number };
};
type DeleteTodo = {
	type: 'delete_todo';
	payload: number;
};
type UpdateTodo = {
	type: 'update_todo';
	payload: Todo;
};
type ChangeStatus = {
	type: 'change_status';
	payload: { id: number; status: Status };
};
type SetTodos = {
	type: 'set_todos';
	payload: Todo[];
};
type DeleteTodosWithProject = {
	type: 'delete_todos_with_project';
	payload: number;
};

// action creator
export const addTodo = (
	title: string,
	dueDate: string,
	projectId: number,
): AddTodo => {
	return { type: add_todo, payload: { title, dueDate, projectId } };
};

export const deleteTodo = (id: number): DeleteTodo => {
	return { type: delete_todo, payload: id };
};

export const updateTodo = (todo: Todo): UpdateTodo => {
	return { type: update_todo, payload: todo };
};

export const changeStatus = (id: number, status: Status): ChangeStatus => {
	return { type: change_status, payload: { id, status } };
};

export const setTodos = (todos: Todo[]): SetTodos => {
	return { type: set_todos, payload: todos };
};
export const deleteTodosWithProject = (
	prjId: number,
): DeleteTodosWithProject => {
	return { type: delete_todos_with_project, payload: prjId };
};

export const downloadTodos = () => {
	// ここの型定義が不明
	return async (dispatch: any) => {
		const res = await axios.get('/api/todos/');
		const todos = await JSON.parse(res.data);
		return dispatch(setTodos(todos));
	};
};

type Action =
	| AddTodo
	| DeleteTodo
	| UpdateTodo
	| ChangeStatus
	| SetTodos
	| DeleteTodosWithProject;

const initialState: Todos = { isLoading: true, todos: [] };

const todos: Reducer<Todos, Action> = (state = initialState, action): Todos => {
	switch (action.type) {
		case add_todo:
			if (!action.payload) return state;
			saveTodos([
				...state.todos,
				{
					id: calculateId(state.todos),
					title: action.payload.title,
					dueDate: action.payload.dueDate,
					status: 'new',
					projectId: action.payload.projectId,
				},
			]);
			return {
				isLoading: false,
				todos: [
					...state.todos,
					{
						id: calculateId(state.todos),
						title: action.payload.title,
						dueDate: action.payload.dueDate,
						status: 'new',
						projectId: action.payload.projectId,
					},
				],
			};

		case delete_todo:
			saveTodos(state.todos.filter((todo) => todo.id !== action.payload));
			return {
				isLoading: false,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};

		case update_todo: {
			const otherState = state.todos.filter(
				(todo) => todo.id !== action.payload.id,
			);
			saveTodos([...otherState, action.payload]);
			return { isLoading: false, todos: [...otherState, action.payload] };
		}

		case change_status: {
			const targetTodo = state.todos.find(
				(todo) => todo.id === action.payload.id,
			);
			const otherTodos = state.todos.filter(
				(todo) => todo.id !== action.payload.id,
			);
			if (targetTodo) {
				saveTodos([
					...otherTodos,
					{ ...targetTodo, status: action.payload.status },
				]);
				return {
					isLoading: false,
					todos: [
						...otherTodos,
						{ ...targetTodo, status: action.payload.status },
					],
				};
			}
			return state;
		}

		case set_todos:
			return { isLoading: false, todos: [...action.payload] };

		case delete_todos_with_project:
			saveTodos(
				state.todos.filter((todo) => todo.projectId !== action.payload),
			);
			return {
				isLoading: false,
				todos: state.todos.filter((todo) => todo.projectId !== action.payload),
			};

		default:
			return state;
	}
};

export default todos;
