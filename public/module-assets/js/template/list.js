$(document).ready(function () {
    ("use strict"); // Start of use strict

    var Shuffle = window.Shuffle;
    var element = document.querySelector(".shuffle-container");
    var shuffleInstance = new Shuffle(element, {
        itemSelector: "div",
    });

    $(".shuffle-filter-item").on("click", function (e) {
        e.preventDefault();
        $(".shuffle-filter-item").removeClass("active");
        $(this).addClass("active");
        var keyword = $(this).attr("data-target");
        shuffleInstance.filter(keyword);
    });

    if ($(".shuffle-filter-item.active").length > 0) {
        $(".shuffle-filter-item.active").trigger("click");
    }

    $(document).on("click", ".favorite", function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        var $this = $(this);
        axios
            .post(url)
            .then((res) => {
                if (res.data.data.fav) {
                    $this.html('<i class="fa-solid fa-star fa-xl"></i>');
                } else {
                    $this.html('<i class="fa-regular fa-star fa-xl"></i>');
                }
            })
            .catch((err) => {
                showAxiosErrors(err);
            });
    });
});
