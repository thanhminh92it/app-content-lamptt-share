function TenPhong(){
    var TenPhong = $('.SelectPhong').val();

    displayData(TenPhong);
}

$('.SelectPhong').change(TenPhong);

function displayData(TenPhong){
    $( "#TenPhong" ).html(TenPhong);
    $( ".SoMet" ).html("");
    $( ".SoVBMat" ).html("");
    $( ".SoVBToiMat" ).html("");
    $( ".SoVBTuyetMat" ).html("");
    window.data =null;
    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/report/6?name=" + TenPhong);
    $.get(url, function(data){
        /*        var soTrangScan ="";
         var tongSoVB ="";*/
        if(data != undefined)
        {
            /*              soTrangScan = data.User.SoTrangA4;
             tongSoVB = data.User.SoVanBanNhapLieu;*/
            if (data.Phong.fo2 > 0) $( "#SoMet" ).html(data.Phong.fo2);
            else{
                $( "#SoMet" ).html("Không có mét nào");
            }
            if (data.Phong.mat2 > 0) $( "#SoVBMat" ).html(data.Phong.mat2 + "&nbsp;văn bản");
            else{
                $( "#SoVBMat" ).html("Không có văn bản nào");
            }
            if (data.Phong.mat3 > 0) $( "#SoVBToiMat" ).html(data.Phong.mat3 + "&nbsp;văn bản");
            else{
                $( "#SoVBToiMat" ).html("Không có văn bản nào");
            }
            if (data.Phong.mat3 > 0) $( "#SoVBTuyetMat" ).html(data.Phong.mat4 + "&nbsp;văn bản");
            else{
                $( "#SoVBTuyetMat" ).html("Không có văn bản nào");
            }

            window.data = data;
        }
        var HoSoMat = 0;
        var HoSoToiTuyetMat = 0;
        if(data.TaiLieu.length > 0) {
            for(var i=0;i<data.TaiLieu.length;i++){
                if(data.TaiLieu[i].Domat == "2"){
                    HoSoMat ++;
                    $('.table-Mat').append('<tr><td class="col-md-1 text-center">' + HoSoMat + '</td><td class="col-md-1 text-center">' + data.TaiLieu[i].SoKyHieuVanBan + '</td><td>' + data.TaiLieu[i].NgayThang + '</td><td>' + data.TaiLieu[i].TacGia + '</td><td>' + data.TaiLieu[i].TrichYeuNoiDung + '</td><td>' + data.TaiLieu[i].SoTrang + '</td><td>bbb</td></tr>');
                }
                else{
                    HoSoToiTuyetMat ++;
                    $('.table-Toi-Tuyet-Mat').append('<td class="col-md-1 text-center">' + HoSoToiTuyetMat + '</td><td class="col-md-1 text-center">' + data.TaiLieu[i].SoKyHieuVanBan + '</td><td>' + data.TaiLieu[i].NgayThang + '</td><td>' + data.TaiLieu[i].TacGia + '</td><td>' + data.TaiLieu[i].TrichYeuNoiDung + '</td><td>' + data.TaiLieu[i].SoTrang + '</td><td>bbb</td></tr>');
                }
            }
        }
    });
}
