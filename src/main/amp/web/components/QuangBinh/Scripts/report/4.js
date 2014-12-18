/**
 * Created by Brook on 18/12/2014.
 */

$(function() {
    $( "#datepicker-start" ).datepicker();
    $( "#datepicker-end" ).datepicker();
});

function displaySoTrang(){

    var user1 = $( ".selectUser1").val() ;
    var date1 = $( "#datepicker-start").val() ;
    var date2 = $( "#datepicker-end").val() ;
    displayData( user1, date1, date2 );

}

$( ".selectUser1" ).change( displaySoTrang );

/*    $(document).ready(function(){
 $(".datepicker-box").change(function(){
 alert("The text has been changed.");
 });
 });*/

/*
$("#datepicker-end").datepicker({
    onSelect: function(dateText) {
        alert("Selected date: " + dateText + "; input's current value: " + this.value);
    }
});
*/


function displayData( user1, date1, date2 ){
    $( ".soTrangScan" ).html("");
    $( ".tongSoVB" ).html("");
    window.data =null;
    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/report/4?user="
    + user1 + "&datefrom=" + date1 + "&dateto=" + date2 );
    $.get(url, function(data){
/*        var soTrangScan ="";
        var tongSoVB ="";*/
        if(data != undefined)
            {
/*              soTrangScan = data.User.SoTrangA4;
                tongSoVB = data.User.SoVanBanNhapLieu;*/
                if (data.User.SoTrangA4 >= 0) $( ".soTrangScan" ).html(data.User.SoTrangA4);
                if (data.User.SoVanBanNhapLieu >= 0) $( ".tongSoVB" ).html(data.User.SoVanBanNhapLieu);
                window.data = data;
            }

    });
}

