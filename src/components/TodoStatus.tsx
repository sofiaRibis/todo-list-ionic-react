import {IonSelect, IonSelectOption} from '@ionic/react';

const TodoStatus: React.FC<{
    status: 'pending' | 'done';
    onStatusChange: (status: 'pending' | 'done') => void;
}> = props => {
    function onStatusChange(value: 'pending' | 'done'): void {
        props.onStatusChange(value);
    }
    return (
        <IonSelect
            aria-label="Todo Status"
            label="Status:"
            value={props.status}
            onIonChange={e => onStatusChange(e.detail.value)}
        >
            <IonSelectOption value="pending">pending</IonSelectOption>
            <IonSelectOption value="done">done</IonSelectOption>
        </IonSelect>
    );
};

export default TodoStatus;
