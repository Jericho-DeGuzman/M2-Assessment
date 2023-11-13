import React from 'react'

interface props {
    open: boolean,
    onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal = ({open, onclick}: props) => {
    return (
        <dialog id="my_modal_1" className={`modal ${open && 'modal-open'}`}>
            <div className="modal-box bg-white">
                <h3 className="font-bold text-lg">Oops!</h3>
                <p className="py-4">Please select an answer!</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-accent text-white" onClick={onclick}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default Modal
