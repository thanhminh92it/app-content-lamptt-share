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
	            <h4 class="text-center">Thống kê tài liệu đã số hóa</h4>
	            <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
	        </div>
	        <div class="row">
	             <div class="panel-body">
	                <p>Số lượng phông:&nbsp;&nbsp;${data.companyhome.fo1}</p>
	                <p>Tổng số mét giá tài liệu (8 hộp = 1 mét):&nbsp;&nbsp;${data.companyhome.fo2/8}</p>
	                <p>Tổng số hộp:&nbsp;&nbsp;${data.companyhome.fo2}</p>
	                <p>Tổng số hồ sơ:&nbsp;&nbsp;${data.companyhome.f3}</p>
	             </div>
	        </div>
	        <#if count == 0>
	            <div><h3>Không có dữ liệu hiển thị</h3></div>
	        <#else>
	            <div class="row">
                	            <div class="table-responsive">
                	                <table class="table table-bordered">
                	                    <thead>
                	                        <tr>
                	                            <th class="col-md-1 text-center">STT</th>
                	                            <th class="col-md-3 text-center" >Tên phông/ sưu tập lưu trữ</th>
                	                            <th class="col-md-1 text-center">Số mét giá</th>
                	                            <th class="col-md-1 text-center">Số hộp</th>
                	                            <th class="col-md-1 text-center">Số hồ sơ</th>
                	                            <th class="col-md-3 text-center">Kho lưu trữ</th>
                	                            <th class="col-md-2 text-center">Ghi chú</th>
                	                        </tr>
                	                    </thead>
                	                    <tbody>
                	                    <#assign x = 0>
                                        <#list data.items as child>
                                            <#assign x=x+1>
                                            <tr>
                                                <td class="col-md-1 text-center">${x}</td>
                                                <td class="col-md-3">${child.name}</td>
                                                <td class="col-md-1 text-center">${child.fo2/8}</td>
                                                <td class="col-md-1 text-center">${child.fo2}</td>
                                                <td class="col-md-1 text-center">${child.fo3}</td>
                                                <td class="col-md-3">${child.path}</td>
                                                <td class="col-md-2">${child.description}</td>
                                            </tr>
                                        </#list>
                	                    </tbody>
                	                </table>
                	            </div>
                	        </div>
	        </#if>
	        <div class="row">
	            <button title="Quay về kho" type="button" class="btn btn-default">Quay trở về kho</button>
	            <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="BCTKTaiLieuChung"><span class='glyphicon glyphicon-print'></span></button>
	        </div>
	    </div>		
      </div>

   </@>
</@>
<script>
    $(document).ready(function() {
        $('#dataTables-example').dataTable();
    });
    </script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/actionreport.js"></script>