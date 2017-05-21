//budget controller
var budgetController = (function() {

})();

//ui controller
var UIController = (function() {

  return {
    getInput: function() {
      //will be either inc or exp
      return {
        type: document.querySelector('.add__type').value,
        description: document.querySelector('.add__description').value,
        value: document.querySelector('.add__value').value
      }
    }
  }

})();

//global app controller
var controller = (function(budgetCtrl, UICtrl) {

  var ctrlAddItem = function() {
    //get field input data
    var input = UICtrl.getInput();
    console.log(input);
    //add item to budget controller

    //add item to UI

    //calculate budget

    //display budget
  }

  document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });

})(budgetController, UIController);
