function CheckAllForm(form)
{
    
    if(validateDate(form) && validateFamilyTrip(form) && validateName(form) && validateEmail(form) && validateFamilyTrip(form)
    
    ){
        createTableQuaotation(form);

    }
    else
        return false;
}

function validateDate(form){
    //Check empty Date input
    var ffieldDate = form.elements["dateTrip"];

    if(ffieldDate.validity.valueMissing){
        ffieldDate.setCustomValidity("Please enter the date");
        return false;
    }else if (ffieldDate.validity.rangeUnderflow) {
        ffieldDate.setCustomValidity("Please enter the date greater than December 1, 2021");
        return false;
    }else if (ffieldDate.validity.rangeOverflow){
        ffieldDate.setCustomValidity("Please enter the date no later than December 31, 2022");
        return false;
    }else{
        ffieldDate.setCustomValidity("");
        return true;
    }   
}


function validateName(form){

    var ffieldNameInst = form.elements["fullName"];

    if(ffieldNameInst.validity.valueMissing){
        ffieldNameInst.setCustomValidity("Please enter the Full Name");
        return false;
    }else{
        ffieldNameInst.setCustomValidity("");
        return true;
    }
}

function validateEmail(form){
    
    var ffieldEmail = form.elements["userEmail"];
    var ffieldEmailText = ffieldEmail.value;
    

    if(ffieldEmail.validity.valueMissing){
        ffieldEmail.setCustomValidity("Please enter the student email address");
        return false;
        
    }else if(ffieldEmail.validity.typeMismatch){
        ffieldEmail.setCustomValidity("Please enter the correct form of email. the email: '" + ffieldEmailText + "' is not in a correct format");
        return false;

    }else{
        ffieldEmail.setCustomValidity("");
        return true;
    }
}

function validateFamilyTrip(form){
    //Check Attached Radio button
    var ffieldA = form.elements["familyTrip"];
    console.log(ffieldA);

    if (!(ffieldA[0].checked == false && ffieldA[1].checked == false)){
        ffieldA[0].setCustomValidity("");
        ffieldA[1].setCustomValidity("");
        return true;
    }else{
        ffieldA[1].setCustomValidity("Please select either Yes or No");
        return false;
    }
}

function validateDetails(form){
    //Check empty incidentdetail input
    var ffieldDetail = form.elements["otherInfos"];

    if(ffieldDetail.validity.valueMissing){
        ffieldDetail.setCustomValidity("Please write the details");
        return false;
    }else{
        ffieldIncidentDetail.setCustomValidity("");
        return true;
    }
}

function createTableQuaotation(form)
{
    
    var formcountry = form.elements["originCountry"].value
    var priceCountry = 0;

    if(formcountry == "Brazil" ){
        priceCountry = 150;
    }else if(formcountry == "Argentina"){
        priceCountry = 185;
    }else if(formcountry == "Mexico"){
        priceCountry = 215;
    }else{
        priceCountry = 250;
    }

    var taxPriorityDate = 0;
    var formData = new Date(form.elements["dateTrip"].value);
    var datalimit01 = Date.parse('dec 15, 2021');
    var datalimit02 = Date.parse('dec 31, 2021');
    
    if(formData < datalimit01){
        taxPriorityDate = 300;
    }else if(formData < datalimit02){
        taxPriorityDate = 150
    }else{
        taxPriorityDate = 0
    }


    var formNumAdult =form.elements["numberAdults"].value
    var formNumChild =form.elements["numberAdults"].value
    
    var tableQuot = document.querySelector(".quotation_table");

    var quotTr0 = createTr("Priority Rate Data", 1, taxPriorityDate);
    tableQuot.appendChild(quotTr0);

    var quotTr1 = createTr("Reservation", 1, 150);
    tableQuot.appendChild(quotTr1);
    
    var quotTr2 = createTr(formcountry, 1, priceCountry);
    tableQuot.appendChild(quotTr2);
    
    var quotTr3 = createTr("Transfer Adults", formNumAdult, 215);
    tableQuot.appendChild(quotTr3);

    var quotTr4 = createTr("Transfer Children", formNumChild, 145);
    tableQuot.appendChild(quotTr4);

    
    var CostTotal = ((150)+(priceCountry)+(formNumAdult * 215)+(formNumChild * 145));
    
    
    var quotTr5 = createTFoot("Total", "......", "......" ,CostTotal);
    tableQuot.appendChild(quotTr5);

    var sectionTableQuote = document.querySelector(".table_results_listed2");

    console.log(sectionTableQuote);

    sectionTableQuote.classList.remove("table_results_listed2");

    sectionTableQuote.classList.add("table_results_listed");
    

}




function createTr(dataItem, dataNumber, dataUnit)
{
    //criando TR and TDs
    var quotTr = document.createElement("tr");
       
    quotTr.appendChild(createTd(dataItem));
    quotTr.appendChild(createTd(dataNumber));
    quotTr.appendChild(createTd(dataUnit));
    quotTr.appendChild(createTd(dataNumber * dataUnit));
    
    return quotTr
}

function createTFoot(dataItem, dataNumber, dataUnit, dataTotal)
{
    //criando TR and TDs
    var quotTfoot = document.createElement("tfoot");
    var quotTr = document.createElement("tr");
       
    quotTr.appendChild(createTd(dataItem));
    quotTr.appendChild(createTd(dataNumber));
    quotTr.appendChild(createTd(dataUnit));
    quotTr.appendChild(createTd(dataTotal));
    
    quotTfoot.appendChild(quotTr);

    return quotTfoot
}

function createTd(dataCell)
{
    var td = document.createElement("td");
    td.textContent = dataCell;
    return td;
}