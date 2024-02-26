$(document).ready(function () {
    ("use strict"); // Start of use strict

    // declare global variable
    var generateCancelToken = "";
    // fetch openai images list
    fetchOpenaiImagesList();
    // declare a  function fetch openai images list
    function fetchOpenaiImagesList() {
        let fetchUrl = $("#openai-images-list-url").data("url");
        axios
            .get(fetchUrl)
            .then(function (response) {
                $("#openai-images-list").html(imageCard(response.data.data));
            })
            .catch((err) => {
                showAxiosErrors(err);
            });
    }

    // Generate Image Card
    function imageCard(data) {
        let card = "";
        if (data.length == 0) {
            card += '<div class="col-md-12 col-lg-12 col-xl-12 col-xxl-12">';
            card += '<div class="card p-3 my-3">';
            card += '<div class="mt-3 text-center">';
            card += "<h4> No Image Found </h4>";
            card += "</div></div></div>";
            return card;
        }
        data.forEach((element) => {
            card += '<div class="col-md-6 col-lg-12 col-xl-6 col-xxl-3">';
            card += '<div class="card p-3 my-3">';
            card +=
                '<img id="generate_image_' +
                element.id +
                '" src="' +
                element.image_path +
                '">';
            card += '<div class="mt-3 text-center">';
            card +=
                '<a  href="' +
                element.download_url +
                '" target="__blank" class="btn btn-light btn-sm mb-2 me-1"> <i class="fas fa-download me-1"></i> Download</a>';
            card +=
                "<button  onclick=\"copyImageToClipboard('#generate_image_" +
                element.id +
                '\')"  type="button" class="btn btn-light btn-sm mb-2 me-1"> <i class="fas fa-copy me-1"></i> Copy</button>';
            card +=
                "<button onclick=\"printImages('#generate_image_" +
                element.id +
                '\')" type="button" class="btn btn-light btn-sm mb-2 me-1"> <i class="fas fa-print me-1"></i> Print</button>';
            card += "</div></div></div>";
        });
        return card;
    }

    // openai image generate
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
        axios
            .post($(this).attr("action"), formData, {
                cancelToken: window.generateCancelToken.token,
            })
            .then(function (response) {
                fetchOpenaiImagesList();
                toastr.success(response.data.message);
                //
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
                // generate btn disable false
                $("#generate").attr("disabled", false);
                //add d-none class to submit button
                $("#generate_submit").removeClass("d-none");
                // remove d-none class to loading button
                $("#generate_loading").addClass("d-none");
                // remove cancel button
                generateCancelHide();
            });
    });

    /**
     *
     * Cancel axios request
     */
    $("#generate-cancel-btn").click(function (e) {
        e.preventDefault();
        // cancel axios
        window.generateCancelToken.cancel("Operation canceled by the user.");
    });
    /**
     * Show generate cancel button
     */
    function generateCancelShow() {
        $("#generate-cancel-container").removeClass("d-none");
    }
    /**
     * Hide generate cancel button
     */
    function generateCancelHide() {
        $("#generate-cancel-container").addClass("d-none");
    }
});
function printImages(id) {
    var images = $(id).attr("src");

    printJS({
        printable: images,
        type: "image",
        header: "", // Optional
        showModal: true, // Optional
        modalMessage: "Printing Images...", // Optional
    });
}
