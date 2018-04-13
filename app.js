// TRACALORIE APP
// Storage Controller here
const StorageCtrl = (function() {
  // Public methods
  return {
    storeItem: function(item) {
      let items;
      // check if any items in localStorage
      if(localStorage.getItem('items') === null) {
        items = [];
        // Push new item
        items.push(item);
        // set localStorage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // get what is already in local storage
        items = JSON.parse(localStorage.getItem('items'));

        // push new item
        items.push(item);

        // reset local storage
        localStorage.setItem('items', JSON.stringify(items));
      }

    },
    // get items from local storage
    getItemsFromStorage: function() {
      let items;
      if(localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },

    // update item in local storage
    updateItemStorage: function(updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index) {
        if(updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    // delete item from local storage
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach(function(item, index) {
        if(id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },

    // clear all items from local storage
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
})();


// Item Controller IIFE  *****************************************************
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  // Data Structure / State
  const data = {
    // sample data, just to show data structure
    // items: [
    //   // { id: 0, name: 'Burger Dinner', calories: 1200 },
    //   // { id: 1, name: 'Cookie', calories: 200 },
    //   // { id: 2, name: 'Pizza', calories: 850 }
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totatCalories: 0
  }
  // Public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Create ID
      if(data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Parse calories as a number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);
      // Add to items array
      data.items.push(newItem);
      
      return newItem;
    },

    // Get item to edit by id
    getItemById: function(id) {
      let found = null;
      // loop through items
      data.items.forEach(function(item){
        if(item.id === id) {
          found = item;
        }
      });
      return found;
    },

    // update item
    updateItem: function(name, calories) {
      // calories to number
      calories = parseInt(calories);
      let found = null;
      // loop through items
      data.items.forEach(function(item) {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    // delete item
    deleteItem: function(id) {
      // get the ids
      const ids = data.items.map(function(item){
        return item.id;
      });

      // get index
      const index = ids.indexOf(id);

      // remove item from array
      data.items.splice(index, 1);
    },

    // clear all items from data structure method
    clearAllItems: function() {
      data.items = [];
    },

    // set the current item
    setCurrentItem: function(item) {
      data.currentItem = item;
    },

    // get the current item
    getCurrentItem: function() {
      return data.currentItem;
    },

    // Get total calories
    getTotalCalories: function() {
      let total = 0;
      //loop through items and add calories
      data.items.forEach(function(item){
        total += item.calories;
      });
      // set total calories in data structure
      data.totalCalories = total;
      // return total
      return data.totalCalories;
    },

    logData: function() {
      return data;
    }
  }
})();


// UI Controller  ****************************************************************
const UICtrl = (function() {
  // DOM selectors here for ease of maintenance
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    clearBtn: '.clear-btn',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  // Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      // loop through the list of items
      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
      </li>`;
      });

      // insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    // get form input
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    // add item to UI
    addListItem: function(item) {
      // display list if hidden
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // create li element
      const li = document.createElement('li');
      // add class
      li.className = 'collection-item';
      // add ID
      li.id = `item-${item.id}`;
      // add HTML
      li.innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>`;
      // insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
    },
    // update list item
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems); // returns node list
      // convert listItems node list into array
      listItems = Array.from(listItems);
      // loop through the array
      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');

        if(itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}:</strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>`;
        }
      });
    },
    // delete item from UI
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    // remove all items from UI
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems); // returns node list
      // create array from node list
      listItems = Array.from(listItems);
      listItems.forEach(function(item) {
        item.remove();
      });
    },
    // clear input field method
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    // add current item to form for editing
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    // hide empty list
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    // clear the edit state of the session
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    // make UISelectors publicly available
    getSelectors: function() {
      return UISelectors;
    }
  }
 })();


// App Controller ******************************************************************
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {

  //  Load event listeners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();  // get the UI selectors

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // disable submit on enter
    document.addEventListener('keypress', function(e) {
      if(e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

     // Delete item event
     document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

     // Clear all event listener
     document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

    // back button clears entry field event
    // preventDefault here prevents page reload and clearing entries
    document.querySelector(UISelectors.backBtn).addEventListener('click', function(e) {
      UICtrl.clearEditState();
      e.preventDefault();
    });
  }

  // add item submit
  const itemAddSubmit = function(e) {
    // console.log('The button was clicked');  // testing only
    // get form input from UICtrl
    const input = UICtrl.getItemInput();

    // Check for entries in both fields before submitting
    if(input.name !== '' && input.calories !== '') {
      // add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // add item to UI list
      UICtrl.addListItem(newItem);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in localStorage
      StorageCtrl.storeItem(newItem);

      // clear input fields
      UICtrl.clearInput();
    }

    e.preventDefault();  // prevent the default behavior
  }
// click edit item
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')){
      // get list item id (item-0, item-1, etc)
      const listId = e.target.parentNode.parentNode.id;
      // split into an array, at hyphen character
      const listIdArr = listId.split('-');
      // get the actual id number at position 1 in array
      const id = parseInt(listIdArr[1]);
      // get entire item
      const itemToEdit = ItemCtrl.getItemById(id);
      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // add item to form
      UICtrl.addItemToForm();
    }
  
    e.preventDefault();  // prevent the default behavior
  }

  // update and submit item edits
  const itemUpdateSubmit = function(e) {
    // get item input
    const input = UICtrl.getItemInput();
    // update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // update UI w updated item
    UICtrl.updateListItem(updatedItem);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Update local storage
    StorageCtrl.updateItemStorage(updatedItem);

    UICtrl.clearEditState();

    e.preventDefault();  // prevent the default behavior
  }

  // delete button event
  const itemDeleteSubmit = function(e) {
    // get current item
    const currentItem = ItemCtrl.getCurrentItem();
    // delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Delete from local storage
    StorageCtrl.deleteItemFromStorage(currentItem.id);

    UICtrl.clearEditState();

    e.preventDefault();  // prevent the default behavior
  }

  // clear all items event
  const clearAllItemsClick = function(e) {
    // delete all items from data structure
    ItemCtrl.clearAllItems();

    // get total calories from local storage
    const totalCalories = ItemCtrl.getTotalCalories();
    // add total calories from local storage to UI
    UICtrl.showTotalCalories(totalCalories);

    // remove all items from the UI
    UICtrl.removeItems();

    // remove all items from local storage
    StorageCtrl.clearItemsFromStorage();

    // Hide ul
    UICtrl.hideList();

    e.preventDefault();  // prevent the default behavior
  }
  
  // Public methods
  return {
    init: function() {
      // clear initial session edit state
      UICtrl.clearEditState();

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // get total calories from local storage
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories from local storage to UI
      UICtrl.showTotalCalories(totalCalories);

      // Load event listeners
      loadEventListeners();
    }
  }

 })(ItemCtrl, StorageCtrl, UICtrl);

 // Initialize app
 App.init();