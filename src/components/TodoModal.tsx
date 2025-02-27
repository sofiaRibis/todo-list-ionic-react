import {IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonModal, IonButtons, IonInput} from '@ionic/react';

import useTodoStore from '../todoStore';

const TodoModal: React.FC<{
    modalTitle: string;
    modalInputLabel: string;
    modalInputValue: string;
    modalButton: string;
    modalType: string;
    modalId: string | number;
    handleChange: (e: CustomEvent) => void;
    handleConfirmChoice: () => void;
}> = props => {
    const {modalId, closeModal} = useTodoStore();

    return (
        <>
            <IonModal isOpen={modalId === props.modalId}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>{props.modalTitle}</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={closeModal}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonInput
                        label={props.modalInputLabel}
                        labelPlacement="floating"
                        placeholder={props.modalInputLabel}
                        value={props.modalInputValue}
                        onIonChange={props.handleChange}
                    ></IonInput>
                    <IonButton expand="block" onClick={props.handleConfirmChoice}>
                        {props.modalButton}
                    </IonButton>
                </IonContent>
            </IonModal>
        </>
    );
};

export default TodoModal;
