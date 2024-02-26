async function copyImageToClipboard(id) {
    if (window.location.protocol != "https:") {
        toastr.error('Please use "https" protocol to copy image.');
    } else {
        try {
            const imageSource = $(id).attr("src");
            await CopyImageClipboard.copyImageToClipboard(imageSource);
            toastr.success("Image copied to clipboard.");
        } catch (e) {
            toastr.error(
                'Your browser does not support "copy image to clipboard.'
            );
        }
    }
}
