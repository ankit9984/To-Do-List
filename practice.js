

const input = document.getElementById('item');
const toDoList = document.getElementById('to-do-List');
const addTask = document.getElementById('addTask');
const deleteAllTask = document.getElementById('delete');


addTask.addEventListener('click', function() {
  if(input.value == '') {
    input.style.border = '1px solid red'
  } else {
    addTo(input.value);
    input.value = '';
    input.style.border = '1px solid black'
  }
});

input.addEventListener('keyup', function(event) {
  if(event.key === 'Enter') {
    if(input.value == '') {
      input.style.border = '1px solid red'
    } else {
      addTo(input.value);
      input.value = '';
      input.style.border = '1px solid black'
    }
  }
});


input.addEventListener('input', () => {
  if(input.value) {
    input.style.border = '1px solid green';
  } else {
    input.style.border = '1px solid red'
  }
});


const addTo = function(text) {
  // Create new list item
  const listItem = document.createElement('li');
  listItem.classList.add('li-class')
  // Add text and icons to list item
  listItem.innerHTML = `${text} <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button> <button class='delete-btn'><i class="fas fa-times"></i></button>`;
  const penIcon = listItem.querySelector('.fa-pen-to-square');
  const timeIcon = listItem.querySelector('.fa-times');
  const editBtn = listItem.querySelector('.edit-btn');
  const deletBtn = listItem.querySelector('.delete-btn')
  penIcon.classList.add('icon-class');
  timeIcon.classList.add('icon-class');
  // Add list item to list
  toDoList.appendChild(listItem);

  // Handle delete button click
  listItem.querySelector('.fa-times').addEventListener('click', function() {
    listItem.remove();
  })

  // Handle edit button click
  editBtn.addEventListener('click', function() {
    // Disable all edit buttons
   const editButtons = toDoList.querySelectorAll('.edit-btn');
  for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].disabled = true;
    }
    deleteAllTask.disabled = true;
    addTask.disabled = true;
    


    const inputField = document.createElement('input');
    inputField.setAttribute('type', 'text');
    inputField.setAttribute('placeholder', 'Enter task here...');
    inputField.classList.add('my-class');
    inputField.type = 'text';
    inputField.value = text;

    inputField.addEventListener('input', function() {
      if(inputField.value) {
        inputField.style.border = '1px solid green'
        inputField.style.outline = 'none'
      } else if(inputField.value == '') {
        inputField.style.border = '1px solid red'
      }
    })

    // Replace list item with input field
    listItem.replaceWith(inputField);

    inputField.focus();
    inputField.addEventListener('keyup', function() {
      if(event.key == 'Enter') {
        text = inputField.value;
        inputField.replaceWith(listItem)
        listItem.innerHTML = `${text} <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button> <i class="fas fa-times"></i>`
        const editBtn = listItem.querySelector('.edit-btn');
        editBtn.addEventListener('click', function() {
          addTo(text);
          listItem.remove();
        })

        // Handle delete button click
        listItem.querySelector('.fa-times').addEventListener('click', function() {
          listItem.remove();
        })

        // Enable all edit buttons
        for (let i = 0; i < editButtons.length; i++) {
          editButtons[i].disabled = false;
        }
        deleteAllTask.disabled = false;
        addTask.disabled = false;
      }
    })
  })
}

deleteAllTask.addEventListener('click',function(){
      while(toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);
      }
  })
