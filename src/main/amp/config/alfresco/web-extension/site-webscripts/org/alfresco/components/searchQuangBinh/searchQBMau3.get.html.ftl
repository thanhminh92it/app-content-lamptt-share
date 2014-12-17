<@markup id="css" >
<#-- CSS Dependencies -->
    <#include "../form/form.css.ftl"/>
    <@link href="${url.context}/res/components/QuangBinh/bootstrap/css/bootstrap.min.css" group="search"/>
    <@link href="${url.context}/res/components/QuangBinh/Style/datepicker.css" group="search"/>
    <@link href="${url.context}/res/components/QuangBinh/Style/report/3.css" group="search"/>
</@>

<@markup id="js">
<#-- JavaScript Dependencies -->
    <#include "../form/form.js.ftl"/>
    <@script src="${url.context}/res/components/QuangBinh/Scripts/jquery-1.11.1.min.js" group="search"></@script>
    <@script src="${url.context}/res/components/QuangBinh/Scripts/FileSaver.js" group="search"></@script>
    <@script src="${url.context}/res/components/QuangBinh/Scripts/bootstrap-datepicker.js" group="search"></@script>

<#--	<script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.js">
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">-->
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
                <h4 class="text-center">
                    Từ ngày <input type="text" id="datepicker-start" placeholder=".../.../..." class="datepiker-box"/> đến ngày <input type="text" id="datepicker-end" placeholder=".../.../..." class="datepiker-box"/>
                </h4>
                <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
            </div>
            <div class="row">
                <div class="ReportBody">
                    <p><b>1. Thành phần tài liệu đưa ra số hóa</b></p>
                    <p>...</p>
                    <p><b>2. Thời gian thực hiện</b></p>
                    <p>Từ ngày .../.../.... đến ngày .../.../.....</p>
                    <p><b>3. Người thực hiện</b></p>
                    <p>...</p>
                    <p><b>4. Kết quả đạt được</b></p>
                    <p>- Tổng số trang văn bản (trang A4) được scan: ....</p>
                    <p>- Tổng số văn bản được nhập nhiệu: ....</p>
                    <button type="button" title="Quay 	về kho" class="btn btn-default">Quay trở về kho</button>
                    <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="BCTKSoHoaTaiLieu"><span class='glyphicon glyphicon-print'></span></button>
                </div>
            </div>
        </div>
    </div>
    </@>
</@>

<@script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/actionreport.js"></@script>
<@script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/3.js"></@script>





