import Vue from 'vue';
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

function defaultSelectedTodo() {
	return {
		title: '',
		description: '',
		date: null,
		completed: false
	}
}

const store = new Vuex.Store({
	state: {
		isShowedTodos: false,
		todos: [],
		selectedTodo: defaultSelectedTodo(),
		settingsMode: '',
	},
	mutations: {
		setTodos(state, todos) {
			state.todos = [...todos];
		},
		addTodo(state, todo) {
			state.todos.push(todo);
		},
		showTodos(state) {
			state.isShowedTodos = !state.isShowedTodos;
		},
		selectTodo(state, todo) {
			state.selectedTodo = {...todo};
			state.selectedTodo.date = new Date(state.selectedTodo.date);
		},
		replaceTodo(state, todo) {
			const todoPosition = store.getters.todoPosition(todo);
			state.todos.splice(todoPosition, 1, todo);
		},
		setSettingsMode(state, mode) {
			state.settingsMode = mode;
		},
		clearSelectedTodo(state) {
			state.selectedTodo = defaultSelectedTodo();
		},
		deleteTodo(state, id) {
			const index = state.todos.findIndex(todo => {
				return todo.id === id
			});
			state.todos.splice(index, 1);
		}
	},
	actions: {
		async getTodos(context) {
			await axios
				.get(`https://my-json-server.typicode.com/GoodJaa/todo-serv/todos`)
				.then(response => context.commit('setTodos', response.data));
		},
		async addTodo(context, todo) {
			await axios
				.post('https://my-json-server.typicode.com/GoodJaa/todo-serv/todos', {
					...todo
				})
				.then(response => {
					context.commit('addTodo', response.data);
				});
		},
		async updateTodo(context, todo) {
			await axios
				.put(`https://my-json-server.typicode.com/GoodJaa/todo-serv/todos/${todo.id}`, {...todo})
				.then(todo => {
					context.commit('replaceTodo', todo.data)
				})
		},
		async deleteTodo(context, id) {
			await axios
				.delete(`https://my-json-server.typicode.com/GoodJaa/todo-serv/todos/${id}`)
				.then(() => {
					context.commit('deleteTodo', id)
				})
		}
	},
	getters: {
		selectedTodo: state => state.selectedTodo,
		todoPosition: state => todo => state.todos.findIndex(oldTodo => oldTodo.id === todo.id),
		getTodosFromStore: state => state.todos,
		getFormatDate: () => (dateValue) => {
			return new Date(dateValue)?.toLocaleString('ru-RU', {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric'
			});
		}
	}
})

export default store;