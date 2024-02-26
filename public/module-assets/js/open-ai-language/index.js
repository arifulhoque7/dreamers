$(document).ready(function () {
    ("use strict"); // Start of use strict

    /**
     *
     * create group
     */
    $("#create-tone-group").select2({
        dropdownParent: $("#create-tone-modal"),
        tags: true,
    });

    /**
     *
     * create form submit
     */
    $("#create-permission-form").submit(function (e) {
        e.preventDefault();
        store($(this));
    });
    /**
     * edit group
     */
    $("#edit-group").select2({
        dropdownParent: $("#edit-modal"),
        tags: true,
    });
    /**
     * update form submit
     */
    $("#update-form").submit(function (e) {
        e.preventDefault();
        update($(this));
    });
});
/**
 * Show create modal
 */
function showCreateModal() {
    $("#create-modal").modal("show");
}

/**
 * Show edit modal
 */
function showEditModal(id) {
    axios
        .get($("#page-axios-data").data("edit"), {
            params: {
                id: id,
            },
        })
        .then((res) => {
            $("#update_name").val(res.data.data.name);
            $("#update_key").val(res.data.data.key);
            $("#update_id").val(res.data.data.id);
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
