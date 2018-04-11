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
    logData: function() {
      return data;
    }
  }
})();




// UI Controller  ******************************
const UICtrl = (function() {

  // Public methods
  return {

  }
 })();



// App Controller *******************************
const App = (function(ItemCtrl, UICtrl) {
  
  // Public methods
  return {
    init: function() {
      console.log('initializing app...'); // testing only
    }
  }

 })(ItemCtrl, UICtrl);


 // Initialize app
 App.init();