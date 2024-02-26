$(document).ready(function () {
    ("use strict"); // Start of use strict
    // declare global variable
    //summernote
    $("#output-result").summernote({
        placeholder: "You can write your own text here",
        tabsize: 2,
        height: 300, // set editor height
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: true, // set focus to editable area after initializing summernote
    });
    // document create with axios
    $("#document-form").submit(function (e) {
        e.preventDefault();
        $("#output-result").val($("#output-result").summernote("code"));
        var formData = new FormData(this);
        // disable button
        $("#document_submit").attr("disabled", true);
        //add d-none class to submit button
        $("#document_submit").addClass("d-none");
        // remove d-none class to loading button
        $("#document_loading").removeClass("d-none");
        axios
            .post($(this).attr("action"), formData)
            .then(function (response) {
                toastr.success(response.data.message);
                $("#document").attr("disabled", false);
                //add d-none class to submit button
                $("#document_submit").removeClass("d-none");
                // remove d-none class to loading button
                $("#document_loading").addClass("d-none");
                // add value in hidden input from axios response data
                $("#response_id").val(response.data.data);
            })
            .catch(function (error, response) {
                // call showAxiosErrors function that can nanopkg-assets/js/main.js
                // showAxiosErrors(error);
                $("#document").attr("disabled", false);
                //add d-none class to submit button
                $("#document_submit").removeClass("d-none");
                // remove d-none class to loading button
                $("#document_loading").addClass("d-none");
            });
    });
    // copy output result to clipboard
    $("#copy-output-to-clipboard").on("click", function () {
        if (window.location.protocol != "https:") {
            toastr.error('Please use "https" protocol to copy image.');
        } else {
            // Get the plain text version of the editor's contents
            var plainText = getPlainText("#output-result");

            // Create a temporary textarea to hold the plain text
            var tempTextArea = document.createElement("textarea");
            tempTextArea.value = plainText;
            document.body.appendChild(tempTextArea);

            // Copy the plain text to the clipboard
            tempTextArea.select();
            navigator.clipboard.writeText(plainText).then(
                function () {
                    // Success
                    toastr.success(
                        "Successfully copied to clipboard. You can paste it in any text editor."
                    );
                },
                function () {
                    // Error
                    toastr.error("Error copying to clipboard.");
                }
            );
            // Remove the temporary textarea from the document
            document.body.removeChild(tempTextArea);
        }
    });

    // export output result to txt file
    $("#export-output-to-txt").on("click", function () {
        var plainText = getPlainText("#output-result");

        // Create a Blob with the plain text contents
        var blob = new Blob([plainText], { type: "text/plain" });

        // Create a download link for the file
        var url = URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "text.txt";
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up the anchor element
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
    });
    // export output result to doc file
    $("#export-output-to-word").on("click", function () {
        var header =
            "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";

        var footer = "</body></html>";
        var contents = $("#output-result").summernote("code");
        var sourceHTML = header + contents + footer;
        var source =
            "data:application/vnd.ms-word;charset=utf-8," +
            encodeURIComponent(sourceHTML);

        var fileDownload = document.createElement("a");

        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = "document.doc";
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toastr.success("Word document was created successfully");
    });

    // print output result
    $("#print-output").on("click", function () {
        var printContents = $("#output-result").summernote("code");
        var css = "";
        if ($("#template-print-setup")) {
            css += $("#template-print-setup").data("print-setup");
        }
        var newTab = window.open("url", "print");
        // Set the page margins using CSS

        newTab.document.write(css + printContents);
        newTab.document.close();
        newTab.focus();
        newTab.print();
        newTab.close();
    });

    // get plain text from summernote
    function getPlainText(id) {
        var editor = $(id);

        return editor
            .summernote("code")
            .replace(/<\/p>/gi, "\n")
            .replace(/<br\/?>/gi, "\n")
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/&nbsp;/gi, " ");
    }
});
