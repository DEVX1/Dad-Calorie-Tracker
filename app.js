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
      { id: 0, name: 'Burger Dinner', calories: 1200 },
      { id: 1, name: 'Cookie', calories: 200 },
      { id: 2, name: 'Pizza', calories: 850 }
    ],
    currentItem: null,
    totatCalories: 0
  }
  // Public methods
  return {
    getItems: function() {
      return data.items;
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
    itemList: '#item-list'
  }

  // Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
      </li>`;
      });

      // insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    }
  }
 })();



// App Controller *******************************
const App = (function(ItemCtrl, UICtrl) {
  
  // Public methods
  return {
    init: function() {

      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Populate list with items
      UICtrl.populateItemList(items);

    }
  }

 })(ItemCtrl, UICtrl);


 // Initialize app
 App.init();