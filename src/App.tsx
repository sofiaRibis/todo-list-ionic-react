import {IonApp, setupIonicReact} from '@ionic/react';
import {IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFooter, IonAlert, IonIcon} from '@ionic/react';
import {useState, useEffect} from 'react';
import useTodoStore from './todoStore';

/* Component imports */
import TodoModal from './components/TodoModal';
import TodoList from './components/TodoList';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
    const {todos, newTodo, openModal, setNewTodo, addTodo, closeModal, loadTodos} = useTodoStore();

    useEffect(() => {
        loadTodos();
    }, []);

    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

    const handleChange = (e: CustomEvent) => {
        setNewTodo((e.target as HTMLInputElement).value);
    };

    const handleAddTodo = () => {
        if (newTodo === '') {
            setIsAlertOpen(true);
            return;
        }

        addTodo(newTodo);
        setNewTodo('');
        closeModal();
    };

    return (
        <IonApp>
            <IonAlert
                isOpen={isAlertOpen}
                trigger="present-alert"
                header="Error"
                message="The value entered is invalid. Please provide a non-empty value."
                buttons={['OK']}
                onDidDismiss={() => setIsAlertOpen(false)}
            ></IonAlert>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Todo List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {todos.length > 0 ? <TodoList /> : <div className="ion-text-center">No todos</div>}
                <TodoModal
                    modalTitle="Add a new Todo"
                    modalInputLabel="Add new todo"
                    modalInputValue={newTodo}
                    modalButton="Add Todo"
                    modalType="addTodo"
                    modalId="addTodo"
                    handleChange={handleChange}
                    handleConfirmChoice={handleAddTodo}
                />
            </IonContent>
            <IonFooter>
                <IonToolbar className="ion-padding">
                    <IonButton id="open-modal" expand="block" onClick={() => openModal('addTodo')}>
                        Add a new todo
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonApp>
    );
};

export default App;
