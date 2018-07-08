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

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function(curr) {
            sum += curr.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            expense: [],
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        percentage: -1 // it doesn't exists at this point
    };


    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            
            //
            //
            //

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1; // Get the ID of the last item
            } else {
                ID = 0;
            }

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
        },

        calculateBudget: function() {

            // Calculate total income and expenses
            calculateTotal('expense');
            calculateTotal('income');

            // Calculate the budget: income - expenses
            data.budget = data.totals.income - data.totals.expense;

            // Calculate the percentage of income that we spent
            if (data.totals.income > 0) {
            data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.percentage = -1; // When there is no percentage
            }
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.income,
                totalExp: data.totals.expense,
                percentage: data.percentage
            }
        },

        testing: function() {
            console.log(data);
        },
    };

})();





// UI CONTROLLER
var UIController = (function () {

    var DOMstrings = { 
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either income or expense
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // takes the strings and converts it to number
            };
        },

        addListItem: function (obj, type) { // Get the object & type
            var html, newHtml, element;
            // Create HTML string with placeholder text

            if (type === 'income') { 
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'expense') { 
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() { // clears the fields input
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.inputDescription +  ', ' + DOMstrings.inputValue); // returns a list that we have to convert to an array. We use the array method called SLICE, that returns a copy of the array. The trick is to send a list "as" an array.

            fieldsArr = Array.prototype.slice.call(fields); 

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            
            fieldsArr[0].focus();
        },
        
        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '----';
            }
        
        },

        getDOMstrings: function () {
            return DOMstrings;
        },
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
    

    var updateBudget = function () {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);

    }


    var ctrlAddItem = function () { 
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && input.value !== NaN && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    
            // 3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);
    
            // 4. Clear the fields
            UICtrl.clearFields();
    
            // 5. Calculate and update budget
            updateBudget();
        }

    };

    return {
        init: function() {
            console.log('App has started!');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();

        }
    }

})(budgetController, UIController); // Here they are linked to budgetCtrl and UICtrl.


controller.init();

