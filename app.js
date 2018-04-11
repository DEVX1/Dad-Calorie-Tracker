// Storage Controller here




// Item Controller IIFE  *****************************
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  // Data Structure / State
  const data = {
    items: [
      // { id: 0, name: 'Burger Dinner', calories: 1200 },
      // { id: 1, name: 'Cookie', calories: 200 },
      // { id: 2, name: 'Pizza', calories: 850 }
    ],
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
    logData: function() {
      return data;
    }
  }
})();




// UI Controller  ******************************
const UICtrl = (function() {
  // DOM selectors here for ease of maintenance
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
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
    // clear input field method
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    // hide empty list
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    // make UISelectors publicly available
    getSelectors: function() {
      return UISelectors;
    }
  }
 })();



// App Controller *******************************
const App = (function(ItemCtrl, UICtrl) {

  //  Load event listeners
  const loadEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();  // get the UI selectors

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

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

      // clear input fields
      UICtrl.clearInput();
    }

    e.preventDefault();  // prevent the default behavior
  }
  
  // Public methods
  return {
    init: function() {

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if(items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // Load event listeners
      loadEventListeners();

    }
  }

 })(ItemCtrl, UICtrl);


 // Initialize app
 App.init();