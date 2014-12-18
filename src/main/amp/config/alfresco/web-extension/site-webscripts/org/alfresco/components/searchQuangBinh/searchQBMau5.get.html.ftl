<@markup id="css" >
   <#-- CSS Dependencies -->
   <#include "../form/form.css.ftl"/>
   <@link href="${url.context}/res/components/QuangBinh/bootstrap/css/bootstrap.min.css" group="search"/>
</@>

<@markup id="js">
   <#-- JavaScript Dependencies -->
   <#include "../form/form.js.ftl"/>
   <@script src="${url.context}/res/components/QuangBinh/Scripts/jquery-1.11.1.min.js" group="search"></@script>
   <@script src="${url.context}/res/components/QuangBinh/Scripts/FileSaver.js" group="search"></@script>
</@>

<@markup id="widgets">
   <@createWidgets group="search"/>
</@>

<@markup id="html">
   <@uniqueIdDiv>
      <#assign el=args.htmlid?html>
      <div id="${el}-body" class="search">
		<div class="container">
	        <div class="row">
	            <h4 class="text-center">BÁO CÁO</h4>
	            <h4 class="text-center">Thống kê tài liệu có dấu chỉ các mức độ mật</h4>
	            <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
	        </div>
	        <div class="row">
	            <div class="table-responsive">
	                <table class="table table-bordered">
	                    <thead>
	                        <tr>
	                            <th class="col-md-1 text-center" rowspan="2">STT</th>
	                            <th class="col-md-4 text-center" rowspan="2">Tên phông/ sưu tập lưu trữ</th>
	                            <th class="col-md-1 text-center" rowspan="2">Số mét giá</th>
	                            <th class="col-md-1 text-center" rowspan="2">Số hồ sơ</th>
	                            <th class="col-md-3 text-center" colspan="3">Số văn bản</th>
	                            <th class="col-md-2 text-center" rowspan="2">Ghi chú</th>
	                        </tr>
	                        <tr>
	                            <th class="col-md-1 text-center">Mật</th>
	                            <th class="col-md-1 text-center">Tối mật</th>
	                            <th class="col-md-1 text-center">Tuyệt mật</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                        <#assign x = 0>
	                        <#assign tongMetGia = 0>
	                        <#assign tongHoSo = 0>
	                        <#assign tongHoSoMat = 0>
	                        <#assign tongHoSoToiMat = 0>
	                        <#assign tongHoSoTuyetMat = 0>
                            <#list data.items as child>
                                <#assign x=x+1>
                                <#assign tongMetGia = tongMetGia + child.fo2/8 >
                                <#assign tongHoSo = tongHoSo + child.fo3 >
                                <#assign tongHoSoMat = tongHoSoMat + child.mat2>
                                <#assign tongHoSoToiMat = tongHoSoToiMat + child.mat3>
                                <#assign tongHoSoTuyetMat = tongHoSoTuyetMat + child.mat4>
                                <tr>
                                    <td class="col-md-1 text-center">${x}</td>
                                    <td class="col-md-4">${child.name}</td>
                                    <td class="col-md-1 text-center">${child.fo2/8}</td>
                                    <td class="col-md-1 text-center">${child.fo3}</td>
                                    <td class="col-md-1 text-center">${child.mat2}</td>
                                    <td class="col-md-1 text-center">${child.mat3}</td>
                                    <td class="col-md-1 text-center">${child.mat4}</td>
                                    <td class="col-md-2 text-center">${child.description}</td>
                                </tr>
                            </#list>
	                        <tr>
	                            <th class="col-md-5 text-center" colspan="2">Tổng cộng</th>
	                            <th class="col-md-1 text-center">${tongMetGia}</th>
	                            <th class="col-md-1 text-center">${tongHoSo}</th>
	                            <th class="col-md-1 text-center">${tongHoSoMat}</th>
	                            <th class="col-md-1 text-center">${tongHoSoToiMat}</th>
	                            <th class="col-md-1 text-center">${tongHoSoTuyetMat}</th>
	                            <th class="col-md-2 text-center"></th>
	
	                        </tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
	        <div class="row">
	            <button title="Quay về kho" type="button" class="btn btn-default">Quay trở về kho</button>
	            <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="BCTKTaiLieuMatTatCaPhong"><span class='glyphicon glyphicon-print'></span></button>
	        </div>
	    </div>	
      </div>
   </@>
</@>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/5 .js"></script>