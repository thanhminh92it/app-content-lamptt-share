(function(){var D=YAHOO.util.Dom,C=YAHOO.util.Event,v=YAHOO.util.Selector,l=YAHOO.Bubbling;var y=Alfresco.util.encodeHTML,w=Alfresco.util.combinePaths,j=Alfresco.util.userProfileLink,e=Alfresco.util.activateLinks;beCPG.component.BulkEdit=function(M){beCPG.component.BulkEdit.superclass.constructor.call(this,"beCPG.component.BulkEdit",M,["button","container","datasource","datatable","calendar","paginator","animation","history"]);this.rendererHelper=beCPG.module.EntityDataRendererHelper;this.datalistColumns={};this.dataTableColumn=[];this.selectedFields=[];this.dataRequestFields=[];this.dataResponseFields=[];this.currentPage=1;this.selectedItems={};this.afterBulkEditUpdate=[];YAHOO.Bubbling.on("selectedItemsChanged",this.onSelectedItemsChanged,this);YAHOO.Bubbling.on("selectedTypeChanged",this.onSelectedTypeChanged,this);YAHOO.Bubbling.on("dataItemUpdated",this.onDataItemUpdated,this);YAHOO.Bubbling.on("bulkDataChanged",this.onBulkEditShow,this);this.deferredListPopulation=new Alfresco.util.Deferred(["onReady"],{fn:this.populateBulkEdit,scope:this});return this};YAHOO.extend(beCPG.component.BulkEdit,Alfresco.component.Base);YAHOO.lang.augmentObject(beCPG.component.BulkEdit.prototype,{options:{siteId:"",siteTitle:"",initialSearchTerm:"",initialSearchTag:"",initialSearchAllSites:true,initialSearchRepository:false,initialSort:"",searchQuery:"",usePagination:false,initialPage:1,pageSize:100,maxResults:1000,loadingMessageDelay:1000,searchQuery:null,itemType:null,formId:null,editSelectedFormId:"create",nodeRef:null,entityNodeRefs:null,showThumbnails:false,},rendererHelper:null,currentPage:null,totalRecords:null,selectedItems:null,afterBulkEditUpdate:null,datalistColumns:null,dataTableColumn:null,dataRequestFields:null,dataResponseFields:null,selectedFields:null,widgets:{},dataUrl:Alfresco.constants.PROXY_URI_RELATIVE+"becpg/entity/datalists/data/node",itemUrl:Alfresco.constants.PROXY_URI_RELATIVE+"becpg/entity/datalists/item/node/",columnsUrl:Alfresco.constants.URL_SERVICECONTEXT+"module/entity-datagrid/config/columns",saveFieldUrl:Alfresco.constants.PROXY_URI_RELATIVE+"becpg/bulkedit/save",fnRenderCellSelected:function H(){var N=this;return function M(P,O,Q,S){var R=O.getData().permissions.userAccess.edit;if(R){D.setStyle(P,"width",Q.width+"px");D.setStyle(P.parentNode,"width",Q.width+"px");P.innerHTML='<input id="checkbox-'+O.getId()+'" type="checkbox" name="fileChecked" value="'+S+'"'+(N.selectedItems[S]?' checked="checked">':">")}}},fnRenderCellThumbnail:function t(){return function M(V,W,S,N){var O=100,Q=W.getData(),R="";Q.jsNode={};Q.jsNode.type=Q.nodeType;var P=Q.itemData.prop_cm_name.value,U=new Alfresco.util.NodeRef(Q.nodeRef),T=P.substring(P.lastIndexOf("."));R='<span class="thumbnail"><img src="'+Alfresco.constants.PROXY_URI+"api/node/"+U.uri+'/content/thumbnails/doclib?c=queue&ph=true" alt="'+T+'" title="'+y(P)+'" /></span>';S.width=O;D.setStyle(V,"width",S.width+"px");D.setStyle(V.parentNode,"width",S.width+"px");V.innerHTML=R}},fnRenderCellCode:function q(M){var N=this;return function O(U,S,V,W){var Q="";if(S&&V){if(!W){W=S.getData("itemData")[V.field]}if(W){W=YAHOO.lang.isArray(W)?W:[W];for(var P=0,R=W.length,T;P<R;P++){T=W[P];Q+='<a href="'+Alfresco.util.siteURL("entity-details?nodeRef="+S.getData("nodeRef"),{site:S.getData("site")!=null?S.getData("site").shortName:null})+'">'+y(T.displayValue)+"</a>"}}}U.innerHTML=Q}},fnRenderCellActions:function u(){var M=this;return function N(P,O,Q,S){var R=O.getData().permissions.userAccess.edit;if(R){D.setStyle(P,"width",Q.width+"px");D.setStyle(P.parentNode,"width",Q.width+"px");P.innerHTML='<div id="'+M.id+"-actions-"+O.getId()+'" class="action-set simple" ><div class="onActionEdit"><a title="'+M.msg("action.modify")+'"  class="action-link" href="" rel="edit"><span>'+M.msg("action.modify")+"</span></a></div></div>"}}},onSelectedItemsChanged:function(){if(this.getSelectedItems().length>0){this.widgets.editSelected.set("disabled",false)}else{this.widgets.editSelected.set("disabled",true)}},onSelectedTypeChanged:function(){this.populateBulkEdit();this.widgets.showButton.set("disabled",false)},onReady:function d(){var P=this;this.widgets.typeSelect=Alfresco.util.createYUIButton(this,"itemTypeSelect-button",this.onTypeSelect,{type:"menu",menu:"itemTypeSelect-menu",lazyloadmenu:false});this.widgets.typeSelect.getMenu().subscribe("click",function(S,R){var T=R[1];if(T){P.widgets.typeSelect.set("label",T.cfg.getProperty("text"))}});this.widgets.itemSelect=Alfresco.util.createYUIButton(this,"itemSelect-button",this.onItemSelect,{type:"menu",menu:"itemSelect-menu",disabled:true});var Q=this.widgets.typeSelect.getMenu().getItem(0);if(Q){P.widgets.typeSelect.set("label",Q.cfg.getProperty("text"));var O=Q._oAnchor.children[0].attributes[0].nodeValue;this.options.itemType=O.split("#")[0];this.options.formId=O.split("#")[1];this.options.editSelectedFormId=O.split("#")[2]}var M=function N(T,S){var R=l.getOwnerByTagName(S[1].anchor,"div");if(R!==null){if(typeof P[R.className]=="function"){S[1].stop=true;var U=P.widgets.dataTable.getRecord(S[1].target.offsetParent).getData();P[R.className].call(P,U,R)}}return true};l.addDefaultAction("action-link",M);this.widgets.showButton=Alfresco.util.createYUIButton(this,"show-button",this.onBulkEditShow,{disabled:false});this.widgets.editSelected=Alfresco.util.createYUIButton(this,"edit-selected",this.onEditSelected,{disabled:true});this.widgets.exportCSVButton=Alfresco.util.createYUIButton(this,"export-csv",this.onExportCSV,{disabled:true,value:"export"});this.widgets.showThumbnailsButton=Alfresco.util.createYUIButton(this,"show-thumbnails",this.onShowThumbnails,{type:"checkbox",value:this.options.showThumbnails,checked:this.options.showThumbnails});D.removeClass(this.id+"-selectTypeMessage","hidden");this.deferredListPopulation.fulfil("onReady");D.setStyle(this.id+"-body","visibility","visible")},_onDataListFailure:function G(O,N){Alfresco.util.PopupManager.displayPrompt({title:N.title,text:N.text,modal:true,buttons:[{text:this.msg("button.ok"),handler:function M(){this.destroy()},isDefault:true}]})},populateBulkEdit:function s(){if(this.options.itemType!=null){Alfresco.util.Ajax.jsonGet({url:w(this.columnsUrl+"?mode=bulk-edit&itemType="+encodeURIComponent(this.options.itemType)+"&formId="+encodeURIComponent(this.options.formId)),successCallback:{fn:this.onDatalistColumns,scope:this},failureCallback:{fn:this._onDataListFailure,obj:{title:this.msg("message.error.columns.title"),text:this.msg("message.error.columns.description")},scope:this}})}},onDatalistColumns:function m(M){this.datalistColumns=M.json.columns;this._setupPropsPicker();D.addClass(this.id+"-selectTypeMessage","hidden")},_buildDataParamsUrl:function I(M,N){var O=this.options.initialSearchAllSites?"":this.options.siteId;var P=YAHOO.lang.substitute("dataListName=bulk-edit&site={site}&repo={repo}&itemType={itemType}&sort={sort}&pageSize={pageSize}&maxResults={maxResults}",{site:encodeURIComponent(O),repo:(this.options.initialSearchRepository||this.options.searchQuery.length!==0).toString(),maxResults:N?N:this.options.maxResults,sort:encodeURIComponent(this.options.initialSort),itemType:encodeURIComponent(this.options.itemType),pageSize:M?M:this.options.pageSize});if(this.options.entityNodeRefs!=null){P+="&entityNodeRef="+this.options.entityNodeRefs}return P},_setupDataSource:function x(){for(var O=0,Q=this.datalistColumns.length;O<Q;O++){var P=this.datalistColumns[O],N=P.name.replace(":","_"),M=this._buildFormsName(P);if(this._isSelectedProp(M)){this.dataRequestFields.push(N);this.dataResponseFields.push(M);this.dataTableColumn.push(P)}this.datalistColumns[M]=P}this.widgets.dataSource=new YAHOO.util.DataSource(this.dataUrl+"?"+this._buildDataParamsUrl(),{connMethodPost:true,responseType:YAHOO.util.DataSource.TYPE_JSON,responseSchema:{resultsList:"items",metaFields:{startIndex:"startIndex",totalRecords:"totalRecords",queryExecutionId:"queryExecutionId"}}});this.widgets.dataSource.connMgr.setDefaultPostHeader(Alfresco.util.Ajax.JSON)},_isSelectedProp:function b(N){if("prop_cm_name"==N||"prop_bcpg_code"==N){return true}for(var M in this.selectedFields){if(N==this.selectedFields[M].value){if(this.selectedFields[M].checked){return true}}}return false},_setupPropsPicker:function F(){var S=D.get(this.id+"-itemProps-container"),R="";if(S!=null){var N=0;var U=0;for(var P=0,V=this.datalistColumns.length;P<V;P++){var O=this.datalistColumns[P];var Q=this._buildFormsName(O);var M=O.label;if(!(O.protectedField||O.disabled||"prop_cm_name"==Q||"prop_bcpg_code"==Q)){var T="";if(U<Math.floor(N/5)){T="reset "}U=Math.floor(N/5);T+="column-"+U;R+='<li class="'+T+'"><input id="propSelected-'+P+'" type="checkbox" name="propChecked" value="'+Q+'" /><label for="propSelected-'+P+'" >'+M+"</label></li>";N++}}S.innerHTML='<ul style="width:'+((U+1)*20)+'em;">'+R+"</ul>";this.selectedFields=v.query('input[type="checkbox"]',S)}},_setupDataTable:function c(O){var S=[{key:"nodeRef",label:"",sortable:false,formatter:this.fnRenderCellSelected(),width:16}];if(this.options.showThumbnails){S.push({key:"thumbnail",label:"",sortable:false,formatter:this.fnRenderCellThumbnail(),width:100})}var N,W;for(var Q=0,X=this.dataTableColumn.length;Q<X;Q++){N=this.dataTableColumn[Q];W=this._buildFormsName(N);if(this._isSelectedProp(W)){S.push({key:this.dataResponseFields[Q],label:N.label,sortable:true,sortOptions:{field:this.dataResponseFields[Q],sortFunction:this.rendererHelper.getSortFunction()},formatter:W=="prop_bcpg_code"?this.fnRenderCellCode(N):this.rendererHelper.getCellFormatter(this),editor:W=="prop_bcpg_code"?null:this.rendererHelper.getCellEditor(this,N,this.saveFieldUrl)})}}S.sort(function(ab,Z){var aa=ab.key;var Y=Z.key;if(aa=="nodeRef"){return -1}else{if(Y=="nodeRef"){return 1}}if(aa=="thumbnail"){return -1}else{if(Y=="thumbnail"){return 1}}if(aa=="prop_cm_name"&&Y!="prop_bcpg_code"){return -1}else{if(aa=="prop_bcpg_code"){return -1}else{if(Y=="prop_bcpg_code"){return 1}else{if(Y=="prop_cm_name"&&aa!="prop_bcpg_code"){return 1}}}}return 0});S.push({key:"actions",label:"",sortable:false,formatter:this.fnRenderCellActions(),width:35});var U=this;this.widgets.dataTable=new YAHOO.widget.DataTable(this.id+"-grid",S,this.widgets.dataSource,{renderLoopSize:this.options.usePagination?16:32,initialLoad:false,dynamicData:false,MSG_EMPTY:this.msg("message.empty"),MSG_ERROR:this.msg("message.error"),paginator:null,});this.widgets.dataTable.handleDataReturnPayload=function M(Z,Y,aa){if(U.widgets.paginator){U.widgets.paginator.set("totalRecords",Y.meta.totalRecords);U.widgets.paginator.setPage(Y.meta.startIndex,true)}U.queryExecutionId=Y.meta.queryExecutionId;return Y.meta};this.widgets.dataTable.doBeforeLoadData=function V(Z,aa,ac){if(aa.error){try{var Y=YAHOO.lang.JSON.parse(aa.responseText);U.widgets.dataTable.set("MSG_ERROR",Y.message)}catch(ab){U._setDefaultDataTableErrors(U.widgets.dataTable)}}if(aa.results.length===0){this.fireEvent("renderEvent",{type:"renderEvent"})}return true};this.widgets.dataTable.doBeforeSortColumn=function T(Z,Y){return true};this.widgets.dataTable.subscribe("checkboxClickEvent",function(Y){var Z=Y.target.value;this.selectedItems[Z]=Y.target.checked;l.fire("selectedItemsChanged")},this,true);this.widgets.dataTable.subscribe("cellMouseoverEvent",function(Y){var Z=Y.target;if(YAHOO.util.Dom.hasClass(Z,"yui-dt-editable")){this.highlightCell(Z)}});this.widgets.dataTable.subscribe("cellMouseoutEvent",this.widgets.dataTable.onEventUnhighlightCell);this.widgets.dataTable.subscribe("cellClickEvent",this.widgets.dataTable.onEventShowCellEditor);this.widgets.dataTable.subscribe("cellUpdateEvent",this.onCellChanged);var U=this;if(U.options.usePagination){U.currentPage=parseInt(U.options.initialPage,10);this.widgets.paginator=new YAHOO.widget.Paginator({containers:[U.id+"-paginatorTop",U.id+"-paginatorBottom"],rowsPerPage:U.options.pageSize,initialPage:this.options.initialPage,template:U.msg("pagination.template"),pageReportTemplate:U.msg("pagination.template.page-report"),previousPageLinkLabel:U.msg("pagination.previousPageLinkLabel"),nextPageLinkLabel:U.msg("pagination.nextPageLinkLabel")});var P=function R(Z,Y){Y.currentPage=Z.page;Y._updateBulkEdit.call(Y)};this.widgets.paginator.subscribe("changeRequest",P,this);D.setStyle(U.id+"-bulk-editBarBottom","display","block");if(!this.widgets.paginator.getContainerNodes().length){this.widgets.paginator.set("containers",this.widgets.dataTable._defaultPaginatorContainers(true))}this.widgets.paginator.render()}},onItemSelect:function g(Q,P,O){var M=P[0],N=P[1];this.selectItems(Alfresco.util.findEventClass(N));C.preventDefault(M)},onTypeSelect:function f(Q,P,O){var N=P[1];var M=Alfresco.util.findEventClass(N);this.options.itemType=M.split("#")[0];this.options.formId=M.split("#")[1];this.options.editSelectedFormId=M.split("#")[2];l.fire("selectedTypeChanged")},getSelectedItems:function i(){var N=[],Q=this.widgets.dataTable.getRecordSet(),O=0,R=Q.getLength(),M;for(var P=O;P<=R;P++){M=Q.getRecord(P);if(M!=null&&this.selectedItems[M.getData("nodeRef")]){N.push(M.getData())}}return N},selectItems:function n(T){var S=this.widgets.dataTable.getRecordSet(),Q=v.query('input[type="checkbox"]',this.widgets.dataTable.getTbodyEl()),P=0,N=Q.length,O,R,M;switch(T){case"selectAll":M=function(U,V){return true};break;case"selectNone":M=function(U,V){return false};break;case"selectInvert":M=function(U,V){return !V};break;default:M=function(U,V){return V}}for(R=0;R<N;R++){O=S.getRecord(R+P);this.selectedItems[O.getData("nodeRef")]=Q[R].checked=M(O.getData("type"),Q[R].checked)}l.fire("selectedItemsChanged")},onCellChanged:function J(M,N,O){},onBulkEditShow:function L(M){this.dataRequestFields=[];this.dataResponseFields=[];this.dataTableColumn=[];this._setupDataSource();this._setupDataTable();this.widgets.itemSelect.set("disabled",false);this.widgets.exportCSVButton.set("disabled",false);this._updateBulkEdit.call(this)},_setDefaultDataTableErrors:function p(M){var N=Alfresco.util.message;M.set("MSG_EMPTY",N("message.empty","beCPG.component.BulkEdit"));M.set("MSG_ERROR",N("message.error","beCPG.component.BulkEdit"))},_updateBulkEdit:function K(X){X=X||{};var U=null,Q=null,V=this;var R=function N(){if(Q){U=Alfresco.util.PopupManager.displayMessage({displayTime:0,text:'<span class="wait">'+y(this.msg("message.loading"))+"</span>",noEscape:true});if(YAHOO.env.ua.ie>0){this.loadingMessageShowing=true}else{U.showEvent.subscribe(function(){this.loadingMessageShowing=true},this,true)}}};this._setDefaultDataTableErrors(this.widgets.dataTable);this.loadingMessageShowing=false;Q=YAHOO.lang.later(this.options.loadingMessageDelay,this,R);var Y=null;Y=function P(){if(Q){Q.cancel();Q=null}if(U){if(this.loadingMessageShowing){U.destroy();U=null}else{if(Y!=null){YAHOO.lang.later(100,V,Y)}}}};var T=function S(Z,aa,ab){Y();this.currentPage=X.page||1;this.widgets.dataTable.onDataReturnInitializeTable.call(this.widgets.dataTable,Z,aa,ab)};var O=function M(aa,ab){Y();this.afterBulkEditUpdate=[];if(ab.status==401){window.location.reload(true)}else{try{var Z=YAHOO.lang.JSON.parse(ab.responseText);this.widgets.dataTable.set("MSG_ERROR",Z.message);this.widgets.dataTable.showTableMessage(Z.message,YAHOO.widget.DataTable.CLASS_ERROR);if(ab.status==404){l.fire("deactivateAllControls")}}catch(ac){this._setDefaultDataTableErrors(this.widgets.dataTable)}}};var W=this._buildBulkEditParams();Alfresco.logger.debug("DataSource requestParams: ",W);if(Alfresco.util.CSRFPolicy.isFilterEnabled()){V.widgets.dataSource.connMgr.initHeader(Alfresco.util.CSRFPolicy.getHeader(),Alfresco.util.CSRFPolicy.getToken(),false)}this.widgets.dataSource.sendRequest(YAHOO.lang.JSON.stringify(W),{success:T,failure:O,scope:this})},_buildBulkEditParams:function a(N){var M={fields:this.dataRequestFields,page:N?N:this.currentPage};if(this.options.nodeRef!=null&&this.options.nodeRef.length>0){M.filter={filterId:"nodePath",filterData:this.options.nodeRef}}else{if(this.options.searchQuery!=null&&this.options.searchQuery.length>0){M.filter={filterId:"filterform",filterData:this.options.searchQuery};if(this.options.initialSearchTerm!=null&&this.options.initialSearchTerm.length>0){M.extraParams=YAHOO.lang.JSON.stringify({searchTerm:this.options.initialSearchTerm})}}else{if(this.options.initialSearchTerm!=null&&this.options.initialSearchTerm.length>0){M.filter={filterId:"fts",filterData:this.options.initialSearchTerm}}else{if(this.options.initialSearchTag!=null&&this.options.initialSearchTag.length>0){M.filter={filterId:"tag",filterData:this.options.initialSearchTag}}}}}return M},_buildFormsName:function h(N){var M="";if(N.type=="association"){M="assoc_"}else{M="prop_"}M+=N.name.replace(/:/g,"_");return M},onExportCSV:function z(){var M="";for(var N in this.dataRequestFields){if(M.length>0){M+="$"}M+=this.dataRequestFields[N]}var O=5000;var P=1;window.location=this.dataUrl+"/export?format=xls&"+this._buildDataParamsUrl(O,O)+"&metadata="+encodeURIComponent(YAHOO.lang.JSON.stringify(this._buildBulkEditParams(P)))},onShowThumbnails:function r(){this.options.showThumbnails=!this.options.showThumbnails;this.onBulkEditShow.call(this)},onEditSelected:function E(){var V=function O(W,X){Alfresco.util.populateHTML([X.id+"-dialogTitle",this.msg("label.edit-selected.title")],[X.id+"-dialogHeader",this.msg("label.edit-selected.header")]);if(D.get(X.id+"-form-bulkAction")){D.setStyle(X.id+"-form-bulkAction","display","none");D.setStyle(X.id+"-form-bulkAction-msg","display","none")}};var T=[];for(var Q in this.selectedFields){if(this.selectedFields[Q].checked){T.push(this.selectedFields[Q].value)}}if(T.length<1){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.edit-selected.nofields")});return false}var N=this.getSelectedItems(),P="";for(var Q in N){if(P.length>0){P+=","}P+=encodeURIComponent(N[Q].nodeRef)}var M=YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT+"components/form?formId={formId}&bulkEdit=true&fields={fields}&submissionUrl={submissionUrl}&itemKind={itemKind}&itemId={itemId}&mode={mode}&submitType={submitType}&showCancelButton=true",{itemKind:"type",formId:this.options.editSelectedFormId,itemId:this.options.itemType,mode:"create",submitType:"json",submissionUrl:"/becpg/bulkedit/type/"+this.options.itemType.replace(":","_")+"/bulksave?nodeRefs="+P,fields:T});var S=new Alfresco.module.SimpleDialog(this.id+"-createRow");S.setOptions({width:"36em",templateUrl:M,actionUrl:null,destroyOnHide:true,doBeforeDialogShow:{fn:V,scope:this},onSuccess:{fn:function R(W){YAHOO.Bubbling.fire("bulkDataChanged");Alfresco.util.PopupManager.displayMessage({text:this.msg("message.edit-selected.success")})},scope:this},onFailure:{fn:function U(W){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.edit-selected.failure")})},scope:this}}).show()},onActionEdit:function A(Q){var P=this;var O=function M(U,V){Alfresco.util.populateHTML([V.id+"-dialogTitle",this.msg("label.edit-row.title")]);if(D.get(V.id+"-form-bulkAction")){D.get(V.id+"-form-bulkAction").checked=true;D.get(V.id+"-form-bulkAction-msg").innerHTML=this.msg("button.bulk-action-edit")}};var S=YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT+"components/form?formId=bulk-edit&itemKind={itemKind}&itemId={itemId}&mode={mode}&submitType={submitType}&showCancelButton=true",{itemKind:"node",itemId:Q.nodeRef,mode:"edit",submitType:"json"});var R=new Alfresco.module.SimpleDialog(this.id+"-editDetails");R.setOptions({width:"850px",templateUrl:S,actionUrl:null,destroyOnHide:false,doBeforeDialogShow:{fn:O,scope:this},onSuccess:{fn:function T(U){Alfresco.util.Ajax.jsonPost({url:this.itemUrl+new Alfresco.util.NodeRef(Q.nodeRef).uri,dataObj:this._buildBulkEditParams(),successCallback:{fn:function V(Z){l.fire("dataItemUpdated",{item:Z.json.item});var X=D.get(this.id+"-editDetails-form-bulkAction");if(X&&X.checked){var Y=P._findNextItemByParameter(Z.json.item.nodeRef,"nodeRef");if(Y!=null){P.onActionEdit(Y)}}Alfresco.util.PopupManager.displayMessage({text:this.msg("message.details.success")})},scope:this},failureCallback:{fn:function W(X){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.details.failure")})},scope:this}})},scope:this},onFailure:{fn:function N(U){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.details.failure")})},scope:this}}).show()},_findNextItemByParameter:function o(Q,P){var O=this.widgets.dataTable.getRecordSet();for(var N=0,M=O.getLength();N<M;N++){if(O.getRecord(N).getData(P)==Q){if((N+1)!=M){return O.getRecord(N+1).getData()}}}return null},onDataItemUpdated:function B(N,M){var Q=M[1];if(Q&&(Q.item!==null)){var P=this._findRecordByParameter(Q.item.nodeRef,"nodeRef");if(P!==null){this.widgets.dataTable.updateRow(P,Q.item);var O=this.widgets.dataTable.getTrEl(P);Alfresco.util.Anim.pulse(O)}}},_findRecordByParameter:function k(Q,P){var O=this.widgets.dataTable.getRecordSet();for(var N=0,M=O.getLength();N<M;N++){if(O.getRecord(N).getData(P)==Q){return O.getRecord(N)}}return null}},true)})();