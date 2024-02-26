$(document).ready(function () {
    ("use strict"); // Start of use strict

    $("#create-template-select2").select2({
        dropdownParent: $("#create-modal"),
        tags: true,
    });

    $("#create-form").submit(function (e) {
        e.preventDefault();
        store($(this));
    });

    $("#edit_template-select2").select2({
        dropdownParent: $("#edit-modal"),
        tags: true,
    });
    $("#update-form").submit(function (e) {
        e.preventDefault();
        update($(this));
    });
});

function showCreateModal() {
    $("#create-template-select2").empty();
    $("#create-paper-size").empty();
    $("#create-orientation").empty();
    axios
        .get($("#page-axios-data").data("fetch-print-data"))
        .then((res) => {
            $.each(res.data.data.templates, function (key, temp) {
                $("#create-template-select2").append(
                    '<option value="' + temp.id + '">' + temp.name + "</option>"
                );
            });
            $.each(res.data.data.paper_sizes, function (key, paper) {
                $("#create-paper-size").append(
                    '<option value="' + key + '">' + paper + "</option>"
                );
            });
            $.each(res.data.data.orientations, function (key, orientation) {
                $("#create-orientation").append(
                    '<option value="' + key + '">' + orientation + "</option>"
                );
            });
        })
        .catch((err) => {
            showAxiosErrors(err);
        });

    $("#create-modal").modal("show");
}

function showEditModal(id) {
    axios
        .get($("#page-axios-data").data("edit"), {
            params: {
                id: id,
            },
        })
        .then((res) => {
            $("#edit_top_margin").val(
                res.data.data.templatePrintSetup.top_margin
            );
            $("#edit_bottom_margin").val(
                res.data.data.templatePrintSetup.bottom_margin
            );
            $("#edit_left_margin").val(
                res.data.data.templatePrintSetup.left_margin
            );
            $("#edit_right_margin").val(
                res.data.data.templatePrintSetup.right_margin
            );
            $("#update_id").val(res.data.data.templatePrintSetup.id);
            $("#edit-template-select2").empty();
            $("#edit-paper-size").empty();
            $("#edit-orientation").empty();
            $.each(res.data.data.templates, function (key, temp) {
                let template_selected =
                    temp.id == res.data.data.templatePrintSetup.template_id
                        ? "selected"
                        : null;
                $("#edit-template-select2").append(
                    '<option value="' +
                        temp.id +
                        '" ' +
                        template_selected +
                        ">" +
                        temp.name +
                        "</option>"
                );
            });

            $.each(res.data.data.paper_sizes, function (key, paper) {
                let paper_size_selected =
                    res.data.data.templatePrintSetup.paper_size == key
                        ? "selected"
                        : null;
                $("#edit-paper-size").append(
                    '<option value="' +
                        key +
                        '" ' +
                        paper_size_selected +
                        ">" +
                        paper +
                        "</option>"
                );
            });
            $.each(res.data.data.orientations, function (key, orientation) {
                let orientation_selected =
                    res.data.data.templatePrintSetup.orientation == key
                        ? "selected"
                        : null;
                $("#edit-orientation").append(
                    '<option value="' +
                        key +
                        '" ' +
                        orientation_selected +
                        ">" +
                        orientation +
                        "</option>"
                );
            });

            $("#edit-modal").modal("show");
        })
        .catch((err) => {
            showAxiosErrors(err);
        });
}

/**
 * Store data
 * @param form
 */
function store(form) {
    var data = form.serialize();
    axios
        .post($("#page-axios-data").data("create"), data)
        .then(function (response) {
            toastr.success(response.data.message, "Success");
            $("#create-modal").modal("hide");
            form.trigger("reset");
            $($("#page-axios-data").data("table-id"))
                .DataTable()
                .ajax.reload(null, false);
        })
        .catch((err) => {
            showAxiosErrors(err);
        });
}

/**
 * Update data
 * @param form
 */
function update(form) {
    var data = form.serialize();
    axios
        .put($("#page-axios-data").data("update"), data)
        .then(function (response) {
            toastr.success(response.data.message, "Success");
            $("#edit-modal").modal("hide");
            form.trigger("reset");
            $($("#page-axios-data").data("table-id"))
                .DataTable()
                .ajax.reload(null, false);
        })
        .catch((err) => {
            showAxiosErrors(err);
        });
}
