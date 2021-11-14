import React from 'react'
import './Modal.scss'
function Modal({ onConfirm, onAbort, message }) {

    return (
        <aside className="modal">
            <div className="modal__wrapper">
                <p>{message}</p>
                <div className="modal__wrapper__btn">
                    <button onClick={onConfirm}>Confirmer</button> <button onClick={onAbort}>Annuler</button>
                </div>

            </div>

        </aside>
    )
}

export default Modal
