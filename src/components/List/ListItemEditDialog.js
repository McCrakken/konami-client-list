import React, {useState} from 'react';

const ListItemEditDialog = React.memo(props => {
  //Frustrating known JS date input where it picks a day before the one you select
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
  const [enteredDateOfBirth, setEnteredDateOfBirth] = useState(props.dateOfBirth);
  const [enteredFirstName, setEnteredFirstName] = useState(props.firstName);
  const [enteredLastName, setEnteredLastName] = useState(props.lastName);

  const submitHandler = event => {
    event.preventDefault();
    // Do we have values? if not do nothing but show error
    const updatedClientInfo = {
      dateOfBirth: enteredDateOfBirth,
      firstName: enteredFirstName,
      id: props.id,
      lastName: enteredLastName
    }
    props.onSubmitHandler(updatedClientInfo);
  };

  const cancelEditHandler = event => {
    event.preventDefault();
    props.onSubmitHandler(undefined);
  };

  return (
    <div className={'page-content'}>
      <h1 className={'page-header'}>Edit Client</h1>
      <form onSubmit={submitHandler} className={'list-item-edit-form'}>
        <p>ID: {props.id}</p>
        <div className={'list-item-edit-input'}>
          <label htmlFor="firstName">First Name</label>
          <input type="text"
                 id={'firstName'}
                 value={enteredFirstName}
                 onChange={event => setEnteredFirstName(event.target.value)}
          />
        </div>
        <div className={'list-item-edit-input'}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text"
                 id={'lastName'}
                 value={enteredLastName}
                 onChange={event => setEnteredLastName(event.target.value)}
          />
        </div>
        <div className={'list-item-edit-input'}>
          <label htmlFor={'dateOfBirth'}>Date of Birth</label>
          <input type="Date"
                 id={'dateOfBirth'}
                 value={enteredDateOfBirth.toISOString().substring(0,10)}
                 onChange={event => setEnteredDateOfBirth(new Date(event.target.value))}
          />
        </div>
        <div className={'list-item-edit-actions'}>
          <button type={'button'} onClick={cancelEditHandler} className={'list-item-button list-item-button-edit'}>
            Cancel
          </button>
          <button type={'submit'} className={'list-item-button list-item-button-edit'}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
});

export default ListItemEditDialog;