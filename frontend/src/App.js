import React, { useState } from "react";
import {CustomModal} from "./components/Modal";
import axios from "axios";


function App() {
  const [isComplete, setComplete] = useState(true);
  const [modal, setModal] = useState(false);
  const [todoItems, setToDoItems] = useState([]);

  const handleSubmit = (item) => {
    setModal(!modal);
    if (item.id) {
      axios
      .put(`http://localhost:8000/api/todos/${item.id}/`, item)
      .then(res => refreshList());
    } else {
      axios
        .post(`http://localhost:8000/api/todos/`, item)
        .then(res => refreshList());
    }
  };

  const handleDelete = (item) => {
    axios
    .delete(`http://localhost:8000/api/todos/${item.id}`, item)
    .then(res => refreshList());
  };

  const [Item, setItem] = useState({title: "", description: "", completed: false });
  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setItem(item);
    console.log(modal);
    setModal(!modal);
  };

  const editItem = ( item ) => {
    setItem(item);
    setModal(!modal);
  };

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then(res => setToDoItems(res.data))
      .catch(err => console.log(err));
  };

  const displayCompleted = (status) => {
    if (status) {
      setComplete(true);
    } else {
      setComplete(false);
    }
  };

  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => displayCompleted(true)}
          className={isComplete ? "active" : ""}
        >
          complete
        </span>
        <span onClick={() => displayCompleted(false)}
              className={isComplete ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const items = todoItems.filter(item => item.completed === isComplete);
    return items.map(item => (
      <li key={ item.id } className="list-group-item d-flex justify-content-between align-items-center">
        <span 
          className={`todo-title mr-2 ${
                isComplete ? "completed-todo" : ""
              }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button onClick={() => editItem(item)} className="btn btn-secondary mr-2"> Edit </button>
          <button onClick={() => handleDelete(item)} className="btn btn-danger"> Delete </button>
        </span>
      </li>
    ));
  };

  return (
    <main>
      <h1 className="text-white text-uppercase text-center my-4">To Do App</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-primary">Add task</button>
            </div>
            { renderTabList() }
            <ul className="list-group list-group-flush">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <CustomModal
          activeItem={Item}
          modal={modal}
          toggle={setModal}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
}

export default App;
