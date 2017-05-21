//budget controller
var budgetController = (function() {

  var Expense  = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income  = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;
      //create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id
      }
      else {
        ID = 0;
      }
      //create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      }
      else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      //push it into data structure
      data.allItems[type].push(newItem);
      //return new element
      return newItem;
    }
  }

})();

//ui controller
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function() {
      //will be either inc or exp
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },
    addListItem: function(object, type) {
      var html, newHtml, element;
      //create html string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%value</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      //replace placeholder text with actual data
      newHtml = html.replace('%id%', object.id);
      newHtml = newHtml.replace('%description%', object.description);
      newHtml = newHtml.replace('%value%', object.value);

      //insert html into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  }

})();

//global app controller
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function() {
    var input, newItem
    //get field input data
    input = UICtrl.getInput();
    //add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //add item to UI
    UICtrl.addListItem(newItem, input.type);
    //calculate budget

    //display budget
  };

  return {
    init: function() {
      setupEventListeners();
    }
  }
})(budgetController, UIController);

controller.init();
