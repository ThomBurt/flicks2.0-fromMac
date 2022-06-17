import React from 'react';

import './drinkModal.css';

export function HistoryDrinkModal({ props, open, onClose }){
    if (!open) return null;
    console.log(props)

   // const { name, description, image_url } = props;
    
    return (
        <div className='drink-modal-main'>
            <button onClick={onClose} className="close-button">
                {/* <Icon name="close" /> */}
                X
            </button>
            <h4>Hello</h4>
        </div>
    )
}

