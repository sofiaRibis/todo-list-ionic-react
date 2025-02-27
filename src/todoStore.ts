import {create} from 'zustand';
import storage from './storage';

interface Todo {
    text: string;
    date: string;
    status: 'pending' | 'done';
}

interface TodoState {
    modalId: string | number | null;
    todos: Todo[];
    newTodo: string;
    loadTodos: () => Promise<void>;
    addTodo: (todo: string) => void;
    setNewTodo: (todo: string) => void;
    deleteTodo: (index: number) => void;
    modifyTodo: (index: number, modifiedTodo: {text: string; status: 'pending' | 'done'}) => void;
    openModal: (modalId: string | number) => void;
    closeModal: () => void;
}

const useTodoStore = create<TodoState>()((set, get) => ({
    modalId: null,
    todos: [],
    newTodo: '',
    loadTodos: async () => {
        const savedTodos = await storage.get('todos');
        if (savedTodos) {
            set({todos: savedTodos});
        }
    },
    addTodo: todo => {
        const date = new Date().toLocaleDateString();
        const initialStatus: 'pending' = 'pending';
        const updatedTodos = [...get().todos, {text: todo, date, status: initialStatus}];
        set({todos: updatedTodos});
        storage.set('todos', updatedTodos);
    },
    setNewTodo: todo => set(() => ({newTodo: todo})),
    deleteTodo: index => {
        const updatedTodos = get().todos.filter((_, i) => i !== index);
        set({todos: updatedTodos});
        storage.set('todos', updatedTodos);
    },
    modifyTodo: (index, modifiedTodo) => {
        const updatedTodos = get().todos.map((todo, i) =>
            i === index ? {...todo, text: modifiedTodo.text, status: modifiedTodo.status} : todo
        );
        set({todos: updatedTodos});
        storage.set('todos', updatedTodos);
    },
    openModal: modalId => set(() => ({modalId})),
    closeModal: () => set(() => ({modalId: null})),
}));

export default useTodoStore;
