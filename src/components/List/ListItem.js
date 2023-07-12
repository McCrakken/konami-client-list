import React from 'react';

const ListItem = (props) => {
  return (
    <li className={'list-item'}>
      <div className={'list-item-data'}>
        <p className={'list-item-name'}>{props.firstName} {props.lastName}</p>
        <p>ID: {props.id}</p>
        <p>DOB: {props.dateOfBirth.toLocaleDateString()}</p>
      </div>
      <div className={'list-item-actions'}>
        <button onClick={props.onEditItem.bind(this, props.id)}
                className={'list-item-button list-item-button-edit'}
        >
          EDIT
        </button>
        <button onClick={props.onDeleteItem.bind(this, props.id)}
                className={'list-item-button list-item-button-delete'}
        >
          DELETE
        </button>
      </div>
    </li>
  )
}

export default ListItem;