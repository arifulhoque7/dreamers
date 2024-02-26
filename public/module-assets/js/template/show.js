$(document).ready(function () {
    ("use strict"); // Start of use strict

    // declare global variable
    var generateCancelToken = "";
    ("use strict"); // Start of use strict
    $("#openai-form").submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        // disable button
        $("#generate").attr("disabled", true);
        //add d-none class to submit button
        $("#generate_submit").addClass("d-none");
        // remove d-none class to loading button
        $("#generate_loading").removeClass("d-none");
        // create cancel token
        window.generateCancelToken = axios.CancelToken.source();
        // show cancel button
        generateCancelShow();
        // call axios
        axios
            .post($(this).attr("action"), formData, {
                cancelToken: window.generateCancelToken.token,
            })
            .then(function (response) {
                // append to textarea
                let old_text = $("#output-result").summernote("code");
                // // let responseText = JSON.parse(response.data.data);
                let data = response.data.data;
                data = data.replace(/(?:\r\n|\r|\n)/g, "<br>");
                if (old_text != "") {
                    data = old_text + "<br/>" + data;
                }
                $("#output-result").summernote("code", data);
                toastr.success(response.data.message);

                $("#generate").attr("disabled", false);
                //add d-none class to submit button
                $("#generate_submit").removeClass("d-none");
                // remove d-none class to loading button
                $("#generate_loading").addClass("d-none");
                // remove cancel button
                generateCancelHide();
            })
            .catch(function (error, response) {
                // call showAxiosErrors function that can nanopkg-assets/js/main.js
                showAxiosErrors(error);
                $("#generate").attr("disabled", false);
                //add d-none class to submit button
                $("#generate_submit").removeClass("d-none");
                // remove d-none class to loading button
                $("#generate_loading").addClass("d-none");
                // remove cancel button
                generateCancelHide();
            });
    });
    $("#generate-cancel-btn").click(function (e) {
        e.preventDefault();
        // cancel axios
        window.generateCancelToken.cancel("Operation canceled by the user.");
    });

    function generateCancelShow() {
        $("#generate-cancel-container").removeClass("d-none");
    }
    function generateCancelHide() {
        $("#generate-cancel-container").addClass("d-none");
    }
});
