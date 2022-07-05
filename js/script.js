function updateTotal(){
    let total_cost = document.querySelector(".total_cost");
        let sum = 0;
        
        let checkboxes = document.querySelectorAll(".menu_checkbox");
        let inputs = document.querySelectorAll(".menu_input")
        
        for (let i = 0; i < checkboxes.length; i++){
            sum += parseFloat(checkboxes[i].value) * parseInt(inputs[i].value);
            if (parseInt(inputs[i].value) > 0){
                checkboxes[i].checked = true;
            } else {
                checkboxes[i].checked = false;
            }
        }
        
        total_cost.textContent = sum;
};

document.querySelectorAll(".menu_input").forEach(element => {
    element.addEventListener("change", updateTotal)
});

document.querySelectorAll(".menu_checkbox").forEach(element => {
    element.addEventListener("change", function(){
        if (element.checked){
            document.querySelector(`input[name=${element.name}][type=number]`).value = 1;
        } else {
            document.querySelector(`input[name=${element.name}][type=number]`).value = 0;
        }
        updateTotal();
    })
});

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

let check_num = 0;

document.querySelector(".checkout button").addEventListener("click", function(){
    if (document.querySelector(".first_name").value === ""){
        alert("Имя - обязательное поле.");
        return;
    }
    if (document.querySelector(".total_cost").textContent === "0"){
        alert("Чек пустой.");
        return;
    }
    let check = `Покупатель: ${document.querySelector(".first_name").value} ${document.querySelector(".second_name").value}`;
    
    document.querySelectorAll("input[type=checkbox]").forEach(element => {
        if (element.checked){
            check += document.querySelector(`label[name=${element.name}]`).textContent.replace(/\s+$/g, '') + ' x' + document.querySelector(`input[name=${element.name}][type=number]`).value;
        }
    });
    
    check += '\n' + document.querySelector(".total").textContent;
    
    download(`чек${check_num++}.txt`, check);
});


window.addEventListener('scroll', function() {
    arrow_up.style.opacity = (pageYOffset) / 120;
});