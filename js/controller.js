var controller = (function(budgetCtrl, uiCtrl) {

    var setupEventListeners = function() {
        var DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);
        
        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
            
    };

    function updatePercentages() {
        budgetCtrl.calculatePercentages();
        budgetCtrl.test();
        var IdsAndPercents = budgetCtrl.getAllIdsAndPersentages();   
        uiCtrl.updateItemsPercentages(IdsAndPercents);
    };
        
    function ctrlAddItem(e) {
        e.preventDefault();

        var input = uiCtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test();
            uiCtrl.renderListItem(newItem, input.type);
            uiCtrl.clearFields();
            generateTestData.init();
            updateBudget();
        } else {
            alert('Заполните поля!');
        };

        updatePercentages();

    };

    function ctrlDeleteItem(e) {
        var itemID, splitID, type, ID;

        if (e.target.closest('.item__remove')) {
            itemID = e.target.closest('li.budget-list__item').id;
            
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            budgetCtrl.deleteItem(type, ID);
            uiCtrl.deleteListItem(itemID);
            updateBudget();
        };

        updatePercentages();
        
    };

    function updateBudget() {
        budgetCtrl.calculateBudget();
        var budgetObj = budgetCtrl.getbudget();
        uiCtrl.updateBudget(budgetObj);
    }

    return {
        init: function() {
            console.log('app started');
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
        }
    };
    
    
})(modelController, viewController);

controller.init();