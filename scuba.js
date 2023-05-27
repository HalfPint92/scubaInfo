// Form for comments on Certifications page
// Form to like an image displayed by clickable hearts that fill when clicked
//Form for contact on About page in footer



// Get the saved items container
const savedItemsContainer = document.getElementById('saved-items');

// Function to create a delete button
function createDeleteButton(item) {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', () => {
    // Remove the item from the saved items list
    const savedItems = JSON.parse(localStorage.getItem('savedItems'));
    const updatedItems = savedItems.filter(savedItem => savedItem.imageUrl !== item.imageUrl);

    // Save the updated list back to localStorage
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));

    // Refresh the saved items display
    displaySavedItems();
  });

  return deleteButton;
}

function displaySavedItems() {
  savedItemsContainer.innerHTML = ''; // Clear the container

  // Get the saved items from localStorage
  const savedItems = localStorage.getItem('savedItems');

  if (savedItems) {
    const items = JSON.parse(savedItems);

    // Display each saved item
    items.forEach(item => {
      const container = document.createElement('div');
      container.classList.add('saved-item');

      const image = document.createElement('img');
      image.classList.add('saved-image');
      image.src = item.imageUrl;
      image.alt = item.altText;
      container.appendChild(image);

      const deleteButton = createDeleteButton(item); // Create delete button
      container.appendChild(deleteButton); // Append delete button to saved item container

      savedItemsContainer.appendChild(container);
    });
  } else {
    const p = document.createElement('p');
    p.textContent = 'No saved items.';
    savedItemsContainer.appendChild(p);
  }
}


// Function to display the alert with the number of saved items
function displayAlert() {
  const savedItems = JSON.parse(localStorage.getItem('savedItems'));
  const count = savedItems ? savedItems.length : 0;
  const message = `Image saved for later. You have ${count} item${count !== 1 ? 's' : ''} saved.`;
  alert(message);
}

// Add event listener to each save button
const saveButtons = document.querySelectorAll('.save-button');
saveButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the item information from the data attributes
    const item = {
      imageUrl: button.previousElementSibling.src,
      altText: button.previousElementSibling.alt,
      description: button.nextElementSibling.textContent
    };

    // Get the current saved items from localStorage
    let savedItems = localStorage.getItem('savedItems');
    savedItems = savedItems ? JSON.parse(savedItems) : [];

    // Check if the item is already saved
    const isSaved = savedItems.some(savedItem => savedItem.imageUrl === item.imageUrl);

    if (!isSaved) {
      // Add the item to the saved items list
      savedItems.push(item);

      // Save the updated list back to localStorage
      localStorage.setItem('savedItems', JSON.stringify(savedItems));

      // Display the alert
      displayAlert();
    }

    // Refresh the saved items display
    displaySavedItems();
  });
});

// Function to toggle the filled class and heart icon style on click
function toggleHeart(event) {
  const heartIcon = event.target;
  heartIcon.classList.toggle('filled');

  // Toggle between far and fas classes
  if (heartIcon.classList.contains('far')) {
    heartIcon.classList.remove('far');
    heartIcon.classList.add('fas');
  } else {
    heartIcon.classList.remove('fas');
    heartIcon.classList.add('far');
  }
}

// Add event listener to each heart icon
const heartIcons = document.querySelectorAll('.heart-icon');
heartIcons.forEach(heartIcon => {
  heartIcon.addEventListener('click', toggleHeart);
});

// Function to create a comment item
function createCommentItem(commentText) {
  const commentItem = document.createElement('div');
  commentItem.classList.add('comment-item');

  const commentTextElement = document.createElement('span');
  commentTextElement.textContent = commentText;
  commentItem.appendChild(commentTextElement);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  // Display a small "x" symbol
  deleteButton.innerHTML = '&times;';
  deleteButton.addEventListener('click', () => {
    // Remove the comment item from the comments container
    commentItem.remove();
  });
  commentItem.appendChild(deleteButton);

  return commentItem;
}

// Function to handle comment submission
function handleCommentSubmission(event) {
  event.preventDefault();

  const commentForm = event.target;
  const commentInput = commentForm.querySelector('.comment-input');
  const commentText = commentInput.value.trim();

  if (commentText !== '') {
    const commentsContainer = commentForm.parentNode.querySelector('.comments-container');
    const commentItem = createCommentItem(commentText);
    commentsContainer.appendChild(commentItem);

    commentInput.value = ''; // Clear the comment input field
  }
}

// Add event listeners to comment forms
const commentForms = document.querySelectorAll('.comment-form');
commentForms.forEach(commentForm => {
  commentForm.addEventListener('submit', handleCommentSubmission);
});




// Display the saved items on page load
displaySavedItems();
