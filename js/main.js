//class instance
const ui = new UserInterface();

allEventListeners();

function allEventListeners() {
    
    document.addEventListener('DOMContentLoaded',function () {
        //1. fill select list with displayYears
        ui.displayYears();
    });

    document.addEventListener('submit',function (event) {
        event.preventDefault();//prevent sending form, first validate
        //read the values
        var type = document.getElementById("type").value;
        var surface = document.getElementById("surface").value;
        var carpentry = document.querySelector('input[name="carpentry"]:checked').value;
        
        if(type === '' || surface === '' || carpentry ==='') {
            ui.displayError('All fields are required!');
        } else {
           //BUILDING
           const building = new Building(type,surface,carpentry);//object
           const totalCost = building.quotation(building);//pass object for quotation

           //if there is (previous)div - remove it, otherwise displayResult
           if( document.querySelector('#result div') != null)
           document.querySelector('#result div').remove();
           ui.displayResult(totalCost, building);//pass total and building for display
        }  
    });
}