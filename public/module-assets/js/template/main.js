$(document).ready(function () {
    ("use strict"); // Start of use strict

    if ($("#has_tone").is(":checked")) {
        createButton("output_tone");
    }
    if ($("#has_language").is(":checked")) {
        createButton("language");
    }
    $("#has_tone").on("change", function () {
        if (this.checked) {
            createButton("output_tone");
        } else {
            deleteButton("output_tone");
        }
    });
    $("#has_language").on("change", function () {
        if (this.checked) {
            createButton("language");
        } else {
            deleteButton("language");
        }
    });
});
// let i = 2;
function addField(plusElement) {
    let field_type = plusElement.previousElementSibling;
    let placeholder = field_type.previousElementSibling;
    let lable = placeholder.previousElementSibling;
    let id = lable.previousElementSibling;
    var string = id.value;
    var index = string.match(/\d+/)[0];
    index = parseInt(index) + 1;
    // Stopping the function if the input field has no value.
    if (placeholder.previousElementSibling.value.trim() === "") {
        toastr.error("Please enter a label/title for the label/title field.");
        return false;
    }
    let key = "field-" + index;

    let new_field = "";
    new_field += "<fieldset><legend>ID: " + key + "</legend>";
    new_field += '<div class="field input-group mb-4">';
    new_field += '<input type="hidden" name="fields[';
    new_field += key + '][id]" value="' + key + '" required>';
    new_field += '<input type="text" class="form-control mx-2" name="fields[';
    new_field += key + '][label]"';
    new_field += 'placeholder = "Enter Input Field Label/Title (Required)"';
    new_field += "required > ";
    new_field += ' <input type="text" class="form-control mx-2" name="fields[';
    new_field += key + '][placeholder]"';
    new_field += 'placeholder = "Enter Input Field Description">';
    new_field += '<select class="form-select mx-2" name="fields[';
    new_field += key + '][type]">';
    new_field += '<option value="input" selected>Input Field</option>';
    new_field += '<option value="textarea">Textarea Field</option>';
    new_field += "</select>";
    new_field += '<span onclick="addField(this)" class="btn btn-success">';
    new_field += '<i class="fa fa-btn fa-plus"></i>';
    new_field += "</span>";
    new_field += '<span onclick="removeField(this)"';
    new_field += ' class="btn btn-danger d-none">';
    new_field += '<i class="fa fa-btn fa-minus"></i>';
    new_field += "</span>";
    new_field += "</div>";
    new_field += "</fieldset>";

    $("#field-container").append(new_field);
    // Un hiding the minus sign.
    // plusElement.nextElementSibling.style.display = "block";
    // remove d-none class plush sign
    plusElement.nextElementSibling.classList.remove("d-none");
    plusElement.classList.add("d-none");
    createButton(key);
}

function removeField(minusElement) {
    let plusElement = minusElement.previousElementSibling;
    let field_type = plusElement.previousElementSibling;
    let placeholder = field_type.previousElementSibling;
    let label = placeholder.previousElementSibling;
    let id = label.previousElementSibling;
    // console.log(id);
    minusElement.parentElement.parentElement.remove();
    deleteButton(id.value);
}

function createButton(id) {
    let new_button =
        '<span onclick="insertText(this)" id="' +
        id +
        '-button" class="btn btn-success mx-2 my-2">' +
        id +
        "</span>";
    $("#field-buttons").append(new_button);
}

function deleteButton(id) {
    let button = document.getElementById(id + "-button");
    button.remove();
}

function insertText(value) {
    insertToPrompt(" ((`" + value.innerHTML + "`)) ");
}

function insertToPrompt(text) {
    var curPos = document.getElementById("prompt").selectionStart;
    let x = $("#prompt").val();
    $("#prompt").val(x.slice(0, curPos) + text + x.slice(curPos));
}
