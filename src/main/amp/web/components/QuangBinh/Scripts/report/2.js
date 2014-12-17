function displayFont(){
    var singleValues = $( "#SelectFont1").val() ;

    $( ".fontName1" ).html( singleValues );
}

$( "#SelectFont1" ).change( displayFont );
displayFont();

