// BUDGET CONTROLLER
var budgetController = (function () {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //
            //
            //

            // Create new ID
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1; // Get the ID of the last item

            //Creaete new item based on 'income' or 'expense' type
            if (type === 'expense') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'income') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;

        }
    };

})();



// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = { 
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();




// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) { // event or "e" is also common to use
            if (event.keyCode === 13 || event.which === 13) { // which is for older browsers that do not have the keyCode
                ctrlAddItem();
            }
        })
    };
    


    var ctrlAddItem = function () { 

        // 1. Get the field input data
        var input = UICtrl.getInput();

        // 2. Add the item to the budget controller

        // 3. Add the new item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

    };

    return {
        init: function() {
            console.log('App has started!');
            setupEventListeners();
        }
    }

})(budgetController, UIController); // Here they are linked to budgetCtrl and UICtrl.


controller.init();

