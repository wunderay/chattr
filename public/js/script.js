function validateForm(){
    var pw = document.querySelector("#txtSPassword");
    var pw2 = document.querySelector("#txtSPasswordMatch");
    var divPWError = document.querySelector("#divPasswordError");
    var divPW2Error = document.querySelector("#divPassword2Error");
    var formIsValid = true;
    if(pw.value !== pw2.value){
        /* Show Error and Change Style of confirmpassword field */
        divPW2Error.classList.remove("invisible");
        divPW2Error.innerHTML = "Passwords do not match.";
        pw2.classList.add("hasError");
        /* Reject */
        formIsValid = false;
    }
    else{
        divPW2Error.classList.add("invisible");
        divPW2Error.innerHTML = "";
        pw2.classList.remove("hasError");  
    }
    /** Adapted from https://stackoverflow.com/questions/1027224/how-can-i-test-if-a-letter-in-a-string-is-uppercase-or-lowercase-using-javascrip */
    var upper = false;
    var lower = false;
    var num = false;
    for(let i=0; i<pw.value.length; i++){
        let charcheck = pw.value.charAt(i);
        if(!isNaN(charcheck)){
            num = true;
        }
        else{
            if(charcheck == charcheck.toUpperCase()){
                upper = true;
            }
            if(charcheck == charcheck.toLowerCase()){
                lower = true;
            }
        }
        
        
    }
    if (upper && lower && num){
        divPWError.classList.add("invisible");
        divPWError.innerHTML = "";
        pw.classList.remove("hasError");  
    }
    else{
        /* Show Error and Change Style of confirmpassword field */
        divPWError.classList.remove("invisible");
        divPWError.innerHTML = "Password need an at least one of each of the following: uppercase, lowercase, number.";
        pw.classList.add("hasError");
        /* Reject */
        formIsValid = false;
    }


    var elements = document.getElementsByTagName("input");
    var invalidChars = ['<','>','#'/*,'-'*/,'{','}','(',')','\'','"','`'];
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.remove("hasError");
    }
    for(let i = 0; i < elements.length; i++){
        for(let j = 0; j < invalidChars.length; j++){
            if(elements[i].value.indexOf(invalidChars[j]) != -1){
                elements[i].classList.add("hasError");
                elements[i].classList.add("forbiddenChar");
                formIsValid = false;
            }
        }
    }

    for(let i=0; i< elements.length; i++){
        if (elements[i].classList.contains("forbiddenChar")){
            alert("Can\'t contain: <, >, #, -, {, }, (, ), \', \", `");
        }
    }



    return formIsValid;

    
};

function showSec(){
    if(document.querySelector("#dlSecQ").value !="")
    {
        document.querySelector("#txtSecQ").classList.remove("invisible");
    }
};

$("#dlSecQ").on(onchange, $("txtSecQ").show());