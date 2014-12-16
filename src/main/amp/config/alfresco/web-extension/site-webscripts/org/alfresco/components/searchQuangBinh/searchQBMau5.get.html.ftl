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
	                        <tr>
	                            <td class="col-md-1 text-center">STT</td>
	                            <td class="col-md-4">Tên phông</td>
	                            <td class="col-md-1 text-center">Số mét giá</td>
	                            <td class="col-md-1 text-center">Số hồ sơ</td>
	                            <td class="col-md-1 text-center">Mật</td>
	                            <td class="col-md-1 text-center">Tối mật</td>
	                            <td class="col-md-1 text-center">Tuyệt mật</td>
	                            <td class="col-md-2 text-center">Ghi chú</td>
	                        </tr>
	                        <tr>
	                            <th class="col-md-5 text-center" colspan="2">Tổng cộng</th>
	                            <th class="col-md-1 text-center">Số mét giá</th>
	                            <th class="col-md-1 text-center">Số hồ sơ</th>
	                            <th class="col-md-1 text-center">Mật</th>
	                            <th class="col-md-1 text-center">Tối mật</th>
	                            <th class="col-md-1 text-center">Tuyệt mật</th>
	                            <th class="col-md-2 text-center">Ghi chú</th>
	
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
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/actionreport.js"></script>