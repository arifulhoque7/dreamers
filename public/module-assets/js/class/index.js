$(document).ready(function () {
    ("use strict"); // Start of use strict

    $("#create-class-form").submit(function (e) {
        e.preventDefault();
        store($(this));
    });

    $("#update-class-form").submit(function (e) {
        e.preventDefault();
        update($(this));
    });
});

function showCreateModal() {
    $("#create-class-modal").modal("show");
}

function showEditModal(id) {
    axios
        .get($("#page-axios-data").data("edit"), {
            params: {
                id: id,
            },
        })
        .then((res) => {
            $("#update_class_id").val(res.data.data.classes.id);
            $("#update_name").val(res.data.data.classes.name);
            $("#update_description").val(res.data.data.classes.description);
            let selected = res.data.data.classes.status;

            if (selected == 1) {
                $('#update_status').val('1');
            } else {
                $('#update_status').val('0');
            }
            $("#edit-class-modal").modal("show");
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
            $("#create-class-modal").modal("hide");
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
            $("#edit-class-modal").modal("hide");
            form.trigger("reset");
            $($("#page-axios-data").data("table-id"))
                .DataTable()
                .ajax.reload(null, false);
        })
        .catch((err) => {
            showAxiosErrors(err);
        });
}


function showViewModal(id) {
    var html = "";
    axios
        .get($("#page-axios-data").data("view"), {
            params: {
                id: id,
            },
        })
        .then((res) => {
            console.log(res);
            $('.view-class-info').html(res.data);
            $("#view-class-modal").modal("show");
            // showViewModal();
        })
        .catch((err) => {
            showAxiosErrors(err);
        });
}

