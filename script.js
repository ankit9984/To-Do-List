
// Get references to HTML elements
const input = document.querySelector('#item');
const toDoList = document.querySelector('#to-do-List');
const addTask = document.querySelector('#addTask')
const deleteAllTask = document.querySelector('#delete');

// Add event listener for add task button
addTask.addEventListener('click', function() {
  // Check if input field is empty
  if (input.value == '') {
    input.style.border = '1px solid red';
  } else {
    // Add task to list
    addTo(input.value);
    // Clear input field
    input.value = '';
    // Remove red border from input field
    input.style.border = 'none';
  }
});

// Function to add task to list
const addTo = function(text){
  // Create new list item
  const listItem = document.createElement('li');
  // Add text and icons to list item
  listItem.innerHTML = `${text} <i class="fa-solid fa-pen-to-square"></i> <i class="fas fa-times"></i>`;
  // Add list item to list
  toDoList.appendChild(listItem);

  // Add event listener for delete icon
  listItem.querySelector('.fa-times').addEventListener('click',function(){
    // Remove list item from list
    listItem.remove();
  })

  // Add event listener for edit icon
  listItem.querySelector('.fa-pen-to-square').addEventListener('click',function(){
    // Create new input field with current text value
    const inputField = document.createElement('input');
    inputField.type='text';
    inputField.value=text;
    inputField.style.width='400px'
    inputField.style.padding='10px'
    inputField.style.outline='none'
    inputField.style.border='none'
    inputField.style.margin='10px 5px'

    // Replace list item with input field
    listItem.replaceWith(inputField);

    // Focus on new input field
    inputField.focus();

    // Add event listener for enter key press in new input field
    inputField.addEventListener('keyup',function(event){
      if(event.key == "Enter"){
        // Update text value with new value from input field
        text=inputField.value;
        // Replace input field with updated list item
        inputField.replaceWith(listItem);
        listItem.innerHTML=`${text} <i class="fa-solid fa-pen-to-square"></i> <i class="fas fa-times"></i>`

        // Add event listeners for icons in updated list item
        listItem.querySelector('.fa-times').addEventListener('click',function(){
          listItem.remove();
        })
        listItem.querySelector('.fa-pen-to-square').addEventListener('click',function(){
          addTo(text);
          listItem.remove();
        })
      }
    })
  })
}

// Add event listener for delete all tasks button
deleteAllTask.addEventListener('click',function(){
  // Remove all tasks from list
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
});

