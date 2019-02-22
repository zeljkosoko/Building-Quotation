//Building class

class Building {

    constructor(type,surface,carpentry){
        this.type= type;
        this.surface= surface;
        this.carpentry = carpentry;
    }
    quotation(building){
           //initial costs
    let totalCost = 0;
    const archEntepreneurCost = 5000;
    let base = 3000;
    
    //quotation related to type
    const type = building.type;
    const typeCostM2 = this.gettypeCostM2M2(type);  //this is for Building object
    
    //quotation related to surface*typeCostM2
    const surface = building.surface;

    switch (surface) {
        case "70":
            totalCost = archEntepreneurCost + base + 70 * typeCostM2;
            break;
        case "80":
            totalCost = archEntepreneurCost + base * 1.15 + 80 * typeCostM2;
            break;
        case "90":
            totalCost = archEntepreneurCost + base * 1.30 + 90 * typeCostM2;
            break;
        case "100":
            totalCost = archEntepreneurCost + base * 1.45 + 100 * typeCostM2;
            break;
        case "110":
            totalCost = archEntepreneurCost + base * 1.60 + 110 * typeCostM2;
            break;
        default:
            break;
    } 
  
    //quotation related to carpentry
    const carpentry = building.carpentry;
    const carpCost = this.getCarpentryCost(carpentry, surface);
    totalCost += carpCost;
    
    return totalCost;
    }
    gettypeCostM2M2(type){
        const blocks = 70, ytong = 50, stone = 120; //quantity / M2

        if(type === "1"){
            return blocks * 1.5; //cost/m2
        } else if(type === "2") {
            return ytong * 3.5;
        } else {
            return 120 * 4.0;
        } 
    }
    getCarpentryCost(carpentry, surface){
       //carpentry cost depends on the surface
        let carpCost;

        if(carpentry === 'wood'){
            if(surface >= 70 && surface <=90){
                carpCost = 2500;
            } else {
                carpCost = 4000; //additional carp
            }
            
        } else {
            if(surface >= 70 && surface <=90){
                carpCost = 3500;
            } else {
                carpCost = 5000;
            }
        }
        return carpCost; 
    }
}

//UI class
class UserInterface{
    constructor(){}
    
    displayYears(){
        var selectList = document.getElementById("surface");

        const surface = [70, 80, 90, 100, 110];
        for(var i = 0; i < surface.length; i++){
            var option = document.createElement("option");
            option.value = surface[i];
            option.textContent = surface[i];
            selectList.appendChild(option);
        } 
    }
    displayError(message){
         //inside form#request insert 'divError' before 'div.form-group'
        var reqForm = document.getElementById("request");
        var divError = document.createElement("div");
        var fgroup = document.querySelector('.form-group');
        divError.innerHTML = `<p class="error">${message}</p>`;
        
        //reqForm.appendChild(divError);
        reqForm.insertBefore(divError, fgroup);
        setTimeout(() => {
            divError.remove();
        }, 4000);
    }
    displayResult(totalCost, building){
        var result = document.getElementById("result");
    
        var spinner = document.querySelector('#loading img');
        spinner.style.display = 'block';
        //after 3s hide spinner node in DOM and display result
        setTimeout(() => {
            spinner.style.display = 'none';
    
            var div = document.createElement("div");
            let readableType = building.type;
            switch (readableType) {
                case '1':
                readableType = 'Block';
                break;
                case '2':
                readableType = 'Ytong';
                break;
                case '3':
                readableType = 'Stone';
                break;
                default:
                break;
            }
            div.innerHTML = `<p class="header">**Building**</p>`+
                        `<p>${readableType}</p>`+
                        `<p>${building.surface}</p>`+
                        `<p>${building.carpentry}</p>`+
                        `<p>${totalCost}</p>`;
        
        result.appendChild(div);
        }, 3000);    
    }
}