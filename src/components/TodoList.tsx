import {IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, IonButton, IonIcon} from '@ionic/react';
import {pencilSharp, trashSharp} from 'ionicons/icons';
import useTodoStore from '../todoStore';
import {useState} from 'react';

import TodoModal from './TodoModal';
import TodoStatus from './TodoStatus';

const TodoList = () => {
    const {todos, deleteTodo, openModal, modifyTodo, closeModal} = useTodoStore();

    const [changeTodo, setChangeTodo] = useState<string>('');

    const handleChange = (e: CustomEvent) => {
        setChangeTodo((e.target as HTMLInputElement).value);
    };

    const handleConfirmChoice = (index: number) => {
        modifyTodo(index, {...todos[index], text: changeTodo});
        closeModal();
    };

    const handleStatusChange = (index: number, status: 'pending' | 'done') => {
        modifyTodo(index, {...todos[index], status});
    };

    return (
        <IonList>
            {todos.map((todo, index) => (
                <IonItem key={index}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size="auto">
                                <TodoStatus
                                    status={todo.status}
                                    onStatusChange={status => handleStatusChange(index, status)}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{todo.text}</IonLabel>
                            </IonCol>
                            <IonCol size="auto">
                                <IonButton
                                    aria-label="modify todo"
                                    shape="round"
                                    onClick={() => {
                                        setChangeTodo(todos[index].text);
                                        openModal(`modifyTodo-${index}`);
                                    }}
                                >
                                    <IonIcon slot="icon-only" icon={pencilSharp}></IonIcon>
                                </IonButton>
                            </IonCol>
                            <IonCol size="auto">
                                <IonButton aria-label="delete todo" shape="round" onClick={() => deleteTodo(index)}>
                                    <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel>{todo.date}</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <TodoModal
                        modalTitle="Modify todo"
                        modalInputLabel="Modify the current todo"
                        modalInputValue={changeTodo}
                        modalButton="Confirm"
                        modalType="modifyTodo"
                        modalId={`modifyTodo-${index}`}
                        handleChange={handleChange}
                        handleConfirmChoice={() => handleConfirmChoice(index)}
                    />
                </IonItem>
            ))}
        </IonList>
    );
};

export default TodoList;
