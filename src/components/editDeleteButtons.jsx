import React from "react";

export default function EditDeleteButtons(props) {
    return (
        <div id="edit_delete_wrapper">
            <button 
                type="button" 
                onClick={()=> props.editClick}>
                Edit
            </button>
            <button 
                type="button" 
                onClick={()=> console.log('this will delete')}>
                Delete
            </button>
        </div>
    )
}