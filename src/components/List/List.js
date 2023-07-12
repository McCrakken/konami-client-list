import React, {useState} from 'react';
import ListItem from './ListItem';
import ListItemEditDialog from "./ListItemEditDialog";
import "./List.css";

const INITIAL_CLIENT_LIST = [
  {firstName: 'Steve', lastName: 'Young', id: 1, dateOfBirth: new Date('07/13/1970')},
  {firstName: 'Jim', lastName: 'McMahon', id: 2, dateOfBirth: new Date('01/22/1969')},
  {firstName: 'John', lastName: 'Elway', id: 3, dateOfBirth: new Date('11/17/1965')},
  {firstName: 'Peyton', lastName: 'Manning', id: 4, dateOfBirth: new Date('09/25/1982')}
];

const List = (props) => {
  const [clientList, setClientList] = useState(INITIAL_CLIENT_LIST);
  const [editClient, setEditClient] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const editClientHandler = (client) => {
    // Perform an edit if client is provided, selecting cancel will send back undefined
    if (client) {
      // Use the array index of the original client to edit their information in our clientList array
      const originalClientIndex = clientList.indexOf(clientList.find(c => c.id === client.id));
      const updatedList = [...clientList];
      updatedList[originalClientIndex] = client;
      setClientList(updatedList);
    }
    // Reset our edit states to their default values
    setEditClient({});
    setIsEdit(false);
  };

  const startClientEdit = (clientId) => {
    setIsEdit(true);
    setEditClient(clientList.find(client => client.id === clientId));   //Find and set our desired client by id
  }

  const deleteClientHandler = (clientId) => {
    //Check if clientId is included in our clientList. Do nothing if it's not present
    if (!clientList.some(client => client.id === clientId)) {
      alert('Unable to delete client that doesn\'t exist!');
    }
    else {
      //Filter clients matching the clientId from our clientList
      setClientList(clientList.filter(client => client.id !== clientId));
    }
  };

  const clientListContent = (
    <div className={'page-content'}>
      <h1 className={'page-header'}>Client List</h1>
      <ul className={'list'}>
        {clientList.map(client =>
          <ListItem {...client}
                    key={client.id}
                    onEditItem={startClientEdit}
                    onDeleteItem={deleteClientHandler}
          />
        )}
      </ul>
    </div>
  );

  return isEdit
    ? <ListItemEditDialog {...editClient}
                          onSubmitHandler={editClientHandler}
                          updateEditClient={setEditClient}
    />
    : clientListContent;
}

export default List;