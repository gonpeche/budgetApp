// BUDGET CONTROLLER
var budgetController = (function () {

    // some code

})();




// UI CONTROLLER
var UIController = (function () {

    return {
        getInput: function () {
            return {
                type: document.querySelector('.add__type').value, // Will be either inc or exp
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value
            };
        }
    }

})();




// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
  
    var ctrlAddItem = function () { 

        // 1. Get the field input data

        // 2. Add the item to the budget controller

        // 3. Add the new item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

        console.log("funciona!")
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) { // event or "e" is also common to use

        if (event.keyCode === 13 || event.which === 13) { // which is for older browsers that do not have the keyCode
            ctrlAddItem();
        }
    })

})(budgetController, UIController); // Here they are linked to budgetCtrl and UICtrl.
