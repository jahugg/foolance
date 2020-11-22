const { response } = require('express');

const form = document.getElementById('add-tracker');
const display = document.getElementById('tracker-list');
const trackerUserInput = document.getElementById('add-tracker__input');

// fetch API (GET REQUEST)
const getTodos = () => {
  fetch('/getTodos', { method: 'get' })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayTodos(data);
    });
};

// submitting
form.submit((e) => {
  e.preventDefault;
  fetch('/', {
    method: 'post',
    body: JSON.stringify({ tracker: todoUserInput.val() }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.result.ok == 1 && data.result.n == 1) {
        let ids = buildIDS(data.document);
        display.append(buildTemplate(data.document, ids));
        //   editTodo(data.document.ids.todoID,ids.editID);
        //   deleteTodo(data.document, ids.listItemID,ids.deleteID);
      }
      resetTrackerInput();
    });
});

getTodos();

// helper functions
const resetTrackerInput = () => {
  trackerUserInput.setAttribute('val', '');
};

const buildIDS = (tracker) => {
  return {
    editID: 'edit_' + tracker._id,
    deleteID: 'delete_' + tracker._id,
    listItemID: 'listItem_' + tracker._id,
    trackerID: 'tracker_' + tracker._id,
  };
};

const buildTemplate = (tracker, ids) => {
  let item = document.createElement('li');
  item.id = ids.listItemID;
  item.innerHTML = `<div id="${ids.trackerID}">${tracker.tracker}</div>
        <button type="button" id="${ids.editID}">Edit</button>
        <button type="button" id="${ids.deleteID}">Delete</button>`;

  return item;
};

const displayTodos = (data) => {
  data.forEach((tracker) => {
    let ids = buildIDS(tracker);
    display.append(buildTemplate(tracker, ids));
    // editTodo(tracker, ids.trackerID, ids.editID);
    // deleteTodo(tracker, ids.listItemID, ids.deleteID);
  });
};
