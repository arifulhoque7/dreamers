$(document).ready(function () {
    "use strict"; // Start of use strict
    //summernote
    $("#output-faq-answer").summernote({
        placeholder: "Hello Bootstrap 4",
        tabsize: 2,
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true, // set focus to editable area after initializing summernote
    });
    $("#openai-form").submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        // disable button
        $("#generate").attr("disabled", true);
        //add d-none class to submit button
        $("#generate_submit").addClass("d-none");
        // remove d-none class to loading button
        $("#generate_loading").removeClass("d-none");
        axios
            .post($(this).attr("action"), formData)
            .then(function (response) {
                // append to textarea
                let old_text = $("#output-faq-answer").summernote("code");
                // let responseText = JSON.parse(response.data.data);

                $("#output-faq-answer").summernote(
                    "code",
                    old_text + "<br/>" + response.data.data
                );
                toastr.success(response.data.message);
                //
                $("#generate").attr("disabled", false);
                //add d-none class to submit button
                $("#generate_submit").removeClass("d-none");
                // remove d-none class to loading button
                $("#generate_loading").addClass("d-none");
            })
            .catch((err) => {
                showAxiosErrors(err);

                $("#generate").attr("disabled", false);
                //add d-none class to submit button
                $("#generate_submit").removeClass("d-none");
                // remove d-none class to loading button
                $("#generate_loading").addClass("d-none");
            });
    });
});
