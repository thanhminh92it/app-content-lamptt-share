$("input").change(function () {
    var from = document.getElementById("datepicker-start").value,
        to = document.getElementById("datepicker-end").value;
    document.getElementById("start").value=from;
    document.getElementById("end").value=to;
});
