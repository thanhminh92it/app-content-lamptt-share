(function(){var S=YAHOO.util.Dom,Q=YAHOO.util.Event,E=YAHOO.util.Selector,u=YAHOO.Bubbling;var M=Alfresco.util.encodeHTML,j=Alfresco.util.activateLinks;beCPG.module.EntityDataGrid=function(ab,ac){beCPG.module.EntityDataGrid.superclass.constructor.call(this,"beCPG.module.EntityDataGrid",ab,["button","container","datasource","datatable","paginator","animation","history"]);this.rendererHelper=beCPG.module.EntityDataRendererHelper;this.datalistMeta={};this.datalistColumns={};this.dataRequestFields=[];this.dataResponseFields=[];this.currentPage=1;this.showingMoreActions=false;this.currentFilter={filterId:"all",filterData:""};this.selectedItems={};this.afterDataGridUpdate=[];this.extraAfterDataGridUpdate=[];this.scopeId="";if(ac){this.scopeId=ab}u.on("activeDataListChanged",this.onActiveDataListChanged,this);u.on("dataListDetailsUpdated",this.onDataListDetailsUpdated,this);u.on("refreshDataGrids",this.onDataGridRefresh,this);u.on(this.scopeId+"columnRenamed",this.onColumnRenamed,this);u.on(this.scopeId+"scopedActiveDataListChanged",this.onActiveDataListChanged,this);u.on(this.scopeId+"userAccess",this.onUserAccess,this);u.on(this.scopeId+"filterChanged",this.onFilterChanged,this);u.on(this.scopeId+"changeFilter",this.onChangeFilter,this);u.on(this.scopeId+"versionChangeFilter",this.onChangeFilter,this);u.on(this.scopeId+"dataItemCreated",this.onDataItemCreated,this);u.on(this.scopeId+"dataItemUpdated",this.onDataItemUpdated,this);u.on(this.scopeId+"dataItemsDeleted",this.onDataItemsDeleted,this);u.on(this.scopeId+"dataItemsDuplicated",this.onDataGridRefresh,this);u.on(this.scopeId+"refreshDataGrid",this.onDataGridRefresh,this);u.on(this.scopeId+"selectedItemsChanged",this.onSelectedItemsChanged,this);u.on("beforeFormRuntimeInit",this.onBeforeFormRuntimeInit,this);this.deferredListPopulation=new Alfresco.util.Deferred(["onReady","onActiveDataListChanged"],{fn:this.populateDataGrid,scope:this});return this};YAHOO.extend(beCPG.module.EntityDataGrid,Alfresco.component.Base);YAHOO.lang.augmentProto(beCPG.module.EntityDataGrid,beCPG.module.EntityDataGridActions);YAHOO.lang.augmentObject(beCPG.module.EntityDataGrid.prototype,{options:{siteId:"",usePagination:false,displayBottomPagination:true,useFilter:false,filterParameters:[],sortable:false,sortUrl:null,initialPage:1,pageSize:25,initialFilter:{},actionsPopupTimeout:500,loadingMessageDelay:1000,splitActionsAt:3,entityNodeRef:"",extraParams:null,list:"",dataUrl:Alfresco.constants.PROXY_URI+"slingshot/datalists/data/node/",itemUrl:Alfresco.constants.PROXY_URI+"slingshot/datalists/item/node/",columnsUrl:Alfresco.constants.URL_SERVICECONTEXT+"module/entity-datagrid/config/columns",saveFieldUrl:null,itemType:null,groupBy:null,sortId:null,groupFormater:null,hiddenColumns:[],extraDataParams:"&repo=true",formWidth:"34em",initHistoryManager:true,useHistoryManager:true,forceLoad:false,postMethod:true},currentPage:null,queryExecutionId:null,currentFilter:null,selectedItems:null,currentActionsMenu:null,showingMoreActions:null,deferredActionsMenu:null,afterDataGridUpdate:null,extraAfterDataGridUpdate:null,datalistMeta:null,entity:null,datalistColumns:null,dataRequestFields:null,dataResponseFields:null,rendererHelper:null,scopeId:"",formsFilterRuntime:null,fnRenderCellSelected:function s(){var ab=this;return function ac(af,ae,ag,ah){S.setStyle(af,"width",ag.width+"px");S.setStyle(af.parentNode,"width",ag.width+"px");if(ab.options.sortable){var ad=ae.getData("permissions").userAccess;if(ad.sort){YAHOO.util.Dom.addClass(af.parentNode,"datagrid-sort-handle")}}af.innerHTML='<input id="checkbox-'+ae.getId()+'" type="checkbox" name="fileChecked" value="'+ah+'"'+(ab.selectedItems[ah]?' checked="checked">':">")}},fnRenderCellSelectedHeader:function K(){this.timeStampId=(new Date()).getTime();var ab="";ab+='<div id="'+this.id+"-"+this.timeStampId+'itemSelect-div" class="item-select hidden">';ab+='<button id="'+this.id+"-"+this.timeStampId+'itemSelect-button" name="datagrid-itemSelect-button">&nbsp;</button>';ab+='<div id="'+this.id+"-"+this.timeStampId+'itemSelect-menu" class="yuimenu">';ab+='   <div class="bd">';ab+="      <ul>";ab+='         <li><a href="#"><span class="selectAll">'+this.msg("menu.select.all")+"</span></a></li>";ab+='         <li><a href="#"><span class="selectInvert">'+this.msg("menu.select.invert")+"</span></a></li>";ab+='         <li><a href="#"><span class="selectNone">'+this.msg("menu.select.none")+"</span></a></li>";ab+="      </ul>";ab+="   </div>";ab+=" </div>";ab+=" </div>";return ab},fnRenderCellActions:function X(){var ac=this;return function ab(ae,ad,af,ag){S.setStyle(ae,"width",af.width+"px");S.setStyle(ae.parentNode,"width",af.width+"px");ae.innerHTML='<div id="'+ac.id+"-actions-"+ad.getId()+'" class="hidden"></div>'}},rowFormatter:function t(ab,ac){if(ac.getData("color")){S.setStyle(ab,"background-color",ac.getData("color"))}return true},_buildCellUrl:function V(ac){var ad="document",ab=null;if(ac.metadata!=null&&ac.metadata.length){ad=(ac.metadata=="container"?"folder":"document")}if(ac.siteId){ab=Alfresco.constants.URL_PAGECONTEXT+"site/"+ac.siteId+"/"+ad+"-details?nodeRef="+ac.value}else{ab=Alfresco.constants.URL_PAGECONTEXT+ad+"-details?nodeRef="+ac.value}return ab},onReady:function Z(){var af=this;this.widgets.newRowButton=Alfresco.util.createYUIButton(this,"newRowButton",this.onActionCreate,{disabled:false,value:"create"});this.widgets.selectedItems=Alfresco.util.createYUIButton(this,"selectedItems-button",this.onSelectedItems,{type:"menu",menu:"selectedItems-menu",lazyloadmenu:false,disabled:true});var ad=function ah(ak,aj){var ai=u.getOwnerByTagName(aj[1].anchor,"div");if(ai!==null){if(typeof af[ai.className]=="function"){aj[1].stop=true;var al=af.widgets.dataTable.getRecord(aj[1].target.offsetParent).getData();af[ai.className].call(af,al,ai)}}return true};u.addDefaultAction(af.id+"-action-link",ad);u.addDefaultAction(af.id+"-show-more",ad);var ag=function ab(ak,aj){var ai=aj[1].anchor;if(ai!==null){var al=ai.rel,am,an={};if(al&&al!==""){aj[1].stop=true;am=al.split("|");an={filterOwner:window.unescape(am[0]||""),filterId:window.unescape(am[1]||""),filterData:window.unescape(am[2]||"").replace("$ML$","|"),filterDisplay:window.unescape(am[3]||"")};Alfresco.logger.debug("DL_fnChangeFilterHandler","changeFilter =>",an);u.fire(this.scopeId+"changeFilter",an)}}return true};u.addDefaultAction("filter-change",ag);this.modules.actions=new Alfresco.module.DataListActions();this.modules.dataGrid=this;S.removeClass(this.id+"-selectListMessage","hidden");if(this.options.useFilter){this.widgets.filterFormSubmit=Alfresco.util.createYUIButton(this,"filterform-submit",this.onFilterFormSubmit);this.widgets.filterFormSubmit=Alfresco.util.createYUIButton(this,"filterform-clear",this.onFilterFormClear);this.widgets.filterForm=Alfresco.util.createYUIButton(this,"filterform-button",null,{type:"menu",menu:"filterform-panel",disabled:true})}if(S.get("toolbar-contribs-"+this.id)){var ac=S.getChildren("toolbar-contribs-"+this.id);if(ac){for(var ae in ac){(new YAHOO.util.Element("toolbar-contribs")).appendChild(ac[ae])}}}this.deferredListPopulation.fulfil("onReady");if(this.options.forceLoad){this.populateDataGrid()}S.setStyle(this.id+"-body","visibility","visible")},onHistoryManagerReady:function g(){Alfresco.logger.debug("EntityDataGrid_onHistoryManagerReady","changeFilter =>",this.options.initialFilter);u.fire(this.scopeId+"changeFilter",YAHOO.lang.merge({datagridFirstTimeNav:true},this.options.initialFilter))},_onDataListFailure:function N(ad,ac){Alfresco.util.PopupManager.displayPrompt({title:ac.title,text:ac.text,modal:true,buttons:[{text:this.msg("button.ok"),handler:function ab(){this.destroy()},isDefault:true}]})},renderDataListMeta:function f(){if(!YAHOO.lang.isObject(this.datalistMeta)||!this.datalistMeta.title){return}Alfresco.util.populateHTML([this.id+"-title",M(this.datalistMeta.entityName+" - "+this.datalistMeta.title)],[this.id+"-description",j(M(this.datalistMeta.description,true))])},populateDataGrid:function r(){if(!YAHOO.lang.isObject(this.datalistMeta)){return}if(this.options.useFilter){this.populateFilterForm()}this.renderDataListMeta();Alfresco.util.Ajax.jsonGet({url:this._getColumnUrl(),successCallback:{fn:this.onDatalistColumns,scope:this},failureCallback:{fn:this._onDataListFailure,obj:{title:this.msg("message.error.columns.title"),text:this.msg("message.error.columns.description")},scope:this}})},_getColumnUrl:function(ab){return this.options.columnsUrl+"?itemType="+encodeURIComponent(this.options.itemType!=null?this.options.itemType:this.datalistMeta.itemType)+"&list="+encodeURIComponent(this.datalistMeta.name!=null?this.datalistMeta.name:this.options.list)+(ab!=null?"&formId="+ab:"")},populateFilterForm:function y(){var ac=this.datalistMeta.name!=null?this.datalistMeta.name:this.options.list;var ab=YAHOO.lang.substitute(Alfresco.constants.URL_SERVICECONTEXT+"module/entity-datagrid/filter/form?itemKind={itemKind}&list={list}&itemId={itemId}&formId={formId}&submitType=json&showCancelButton=false&showSubmitButton=false"+((this.options.entityNodeRef!=null&&this.options.entityNodeRef.length>0)?"&entityNodeRef="+this.options.entityNodeRef:""),{itemKind:"type",itemId:this.options.itemType!=null?this.options.itemType:this.datalistMeta.itemType,formId:"filter",list:ac,submitType:"json"});Alfresco.util.Ajax.request({url:ab,dataObj:{htmlid:this.id+"-filterForm"},successCallback:{fn:this.onFilterFormTemplateLoaded,scope:this},failureCallback:{fn:function(){this.widgets.filterForm.set("disabled",true)},scope:this},scope:this,execScripts:true})},onFilterFormTemplateLoaded:function c(ab){S.get(this.id+"-filterform").innerHTML=ab.serverResponse.responseText;this.widgets.filterForm.set("disabled",false)},onFilterFormSubmit:function aa(){u.fire(this.scopeId+"changeFilter",{filterOwner:this.id,filterId:"filterform",filterData:YAHOO.lang.JSON.stringify(this.cleanFilterData(this.formsFilterRuntime.getFormData())).replace("|","$ML$")});this.widgets.filterForm.getMenu().hide()},onFilterFormClear:function v(){u.fire(this.scopeId+"changeFilter",{filterOwner:this.id,filterId:"all"});this.formsFilterRuntime.reset();this.widgets.filterForm.getMenu().hide()},cleanFilterData:function I(ad){var ab={};if(ad!=null){for(var ac in ad){if(ad[ac].length>0){ab[ac]=ad[ac]}}}return ab},onBeforeFormRuntimeInit:function U(ac,ab){if(this.formsFilterRuntime==null&&ab[1].eventGroup==this.id+"-filterForm-form"){this.formsFilterRuntime=ab[1].runtime;this.formsFilterRuntime.validations=[]}},onDatalistColumns:function L(ab){this.datalistColumns=ab.json.columns;this._setupHistoryManagers();this._setupDataSource();this._setupDataTable();S.addClass(this.id+"-selectListMessage","hidden");u.fire(this.scopeId+"onDatalistColumnsReady",{entityDatagrid:this});if(this.options.useHistoryManager){YAHOO.util.History.onReady(this.onHistoryManagerReady,this,true)}else{this.onHistoryManagerReady.call(this)}},_setupHistoryManagers:function o(){var ah=YAHOO.util.History.getBookmarkedState(this.scopeId+"filter");ah=ah===null?"all":(YAHOO.env.ua.gecko>0)?ah:window.escape(ah);try{while(ah!=(ah=decodeURIComponent(ah))){}}catch(ag){}var af=function ab(ai){var aj=ai.split("|"),ak={filterId:window.unescape(aj[0]||""),filterData:window.unescape((aj[1]||"")).replace("$ML$","|")};ak.filterOwner=Alfresco.util.FilterManager.getOwner(ak.filterId);return ak};this.options.initialFilter=af(ah);YAHOO.util.History.register(this.scopeId+"filter",ah,function ae(ai){Alfresco.logger.debug("HistoryManager: filter changed:"+ai);if(YAHOO.env.ua.gecko>0){ai=window.unescape(ai);Alfresco.logger.debug("HistoryManager: filter (after Firefox fix):"+ai)}this._updateDataGrid.call(this,{filter:af(ai)})},null,this);if(this.options.initHistoryManager&&this.options.useHistoryManager){try{YAHOO.util.History.initialize("yui-history-field","yui-history-iframe")}catch(ad){Alfresco.logger.error(this.name+": Couldn't initialize HistoryManager.",ad);var ac=args[1];if((ac!==null)&&(ac.entityDataGridModule!==null)){ac.entityDataGridModule.onHistoryManagerReady()}}}else{u.fire("dataGridReady",{entityDataGridModule:this})}},onFilterChanged:function a(ac,ab){var ad=ab[1];if((ad!==null)&&(ad.filterId!==null)){ad.filterOwner=ad.filterOwner||Alfresco.util.FilterManager.getOwner(ad.filterId);this.currentFilter=Alfresco.util.cleanBubblingObject(ad);Alfresco.logger.debug("DL_onFilterChanged: ",this.currentFilter)}},_setupDataSource:function i(){var ai=this;this.dataRequestFields=[];this.dataResponseFields=[];for(var af=0,ah=this.datalistColumns.length;af<ah;af++){var ag=this.datalistColumns[af],ad=ag.name.replace(":","_"),ac=(ag.type=="property"?"prop":"assoc");if(ag.dataType=="nested"&&ag.columns){ac="dt";ac+="_"+ad;for(var ae=0;ae<ag.columns.length;ae++){ad+="|"+ag.columns[ae].name.replace(":","_")}}else{ac+="_"+ad}this.dataRequestFields.push(ad);this.dataResponseFields.push(ac);this.datalistColumns[ac]=ag}this.widgets.dataSource=new YAHOO.util.DataSource(ai._getDataUrl(),{connMethodPost:ai.options.postMethod,responseType:YAHOO.util.DataSource.TYPE_JSON,responseSchema:{resultsList:"items",metaFields:{startIndex:"startIndex",totalRecords:"totalRecords",queryExecutionId:"queryExecutionId"}}});if(ai.options.postMethod){this.widgets.dataSource.connMgr.setDefaultPostHeader(Alfresco.util.Ajax.JSON)}this.widgets.dataSource.doBeforeCallback=function ab(al,aj,am){var ak=aj.metadata.parent.permissions;if(ak&&ak.userAccess){u.fire(ai.scopeId+"userAccess",{userAccess:ak.userAccess})}return am}},_getDataUrl:function(ab){var ac=this.datalistMeta.nodeRef!=null?new Alfresco.util.NodeRef(this.datalistMeta.nodeRef):null;return this.options.dataUrl+(ac!=null?ac.uri:"")+((this.options.entityNodeRef!=null&&this.options.entityNodeRef.length>0)?"?entityNodeRef="+this.options.entityNodeRef+"&":"?")+"itemType="+encodeURIComponent(this.options.itemType!=null?this.options.itemType:this.datalistMeta.itemType)+"&dataListName="+encodeURIComponent(this.datalistMeta.name!=null?this.datalistMeta.name:this.options.list)+"&pageSize="+(ab!=null?ab:this.options.pageSize)+"&site="+this.options.siteId+this._buildSortParam()+this.options.extraDataParams},_setupDataTable:function k(ag){var ap=this;var al=[{key:"nodeRef",label:this.fnRenderCellSelectedHeader(),sortable:false,formatter:this.fnRenderCellSelected(),width:16}];delete ap.widgets.itemSelect;for(var aj=0,ar=this.datalistColumns.length;aj<ar;aj++){var af=this.datalistColumns[aj];var aq=this.dataResponseFields[aj];if(this.options.hiddenColumns.length<1||!beCPG.util.contains(this.options.hiddenColumns,aq)){al.push({key:aq,label:af.label=="hidden"?"":af.label,hidden:af.label=="hidden",sortable:true,sortOptions:{field:af.formsName,sortFunction:this.rendererHelper.getSortFunction()},formatter:this.rendererHelper.getCellFormatter(this),editor:this.options.saveFieldUrl!=null?this.rendererHelper.getCellEditor(this,af,this.options.saveFieldUrl):null})}}al.push({key:"actions",label:this.msg("label.column.actions"),sortable:false,formatter:this.fnRenderCellActions(),width:80});if(!YAHOO.widget.GroupedDataTable){YAHOO.widget.GroupedDataTable=YAHOO.widget.DataTable}var ai={initialLoad:false,dynamicData:false,MSG_EMPTY:this.msg("message.empty"),MSG_ERROR:this.msg("message.error"),MSG_NOGROUP:this.msg("message.nogroup"),paginator:null,groupBy:this.options.groupBy,groupFormater:this.options.groupFormater,formatRow:this.rowFormatter};if(this.options.saveFieldUrl!=null){ai.selectionMode="singlecell"}this.widgets.dataTable=new YAHOO.widget.GroupedDataTable(this.id+"-grid",al,this.widgets.dataSource,ai);if(this.options.usePagination){var an=[this.id+"-paginator"];if(this.options.displayBottomPagination){an.push(this.id+"-paginatorBottom")}this.widgets.paginator=new YAHOO.widget.Paginator({containers:an,rowsPerPage:this.options.pageSize,initialPage:this.options.initialPage,template:this.msg("pagination.template"),pageReportTemplate:this.msg("pagination.template.page-report"),previousPageLinkLabel:this.msg("pagination.previousPageLinkLabel"),nextPageLinkLabel:this.msg("pagination.nextPageLinkLabel")});var ah=function ak(au,at){at._updateDataGrid.call(at,{page:au.page})};this.widgets.paginator.subscribe("changeRequest",ah,this);if(this.options.displayBottomPagination){S.setStyle(this.id+"-datagridBarBottom","display","block")}if(!this.widgets.paginator.getContainerNodes().length){this.widgets.paginator.set("containers",this.widgets.dataTable._defaultPaginatorContainers(true))}this.widgets.paginator.render()}this.widgets.dataTable.handleDataReturnPayload=function ad(au,at,av){if(ap.widgets.paginator){ap.widgets.paginator.set("totalRecords",at.meta.totalRecords);ap.widgets.paginator.setPage(at.meta.startIndex,true);if(at.meta.totalRecords>ap.options.pageSize){S.removeClass(ap.id+"-paginator","hidden");if(ap.options.displayBottomPagination){S.removeClass(ap.id+"-paginatorBottom","hidden")}}else{S.addClass(ap.id+"-paginator","hidden");if(ap.options.displayBottomPagination){S.addClass(ap.id+"-paginatorBottom","hidden")}}}ap.queryExecutionId=at.meta.queryExecutionId;return at.meta};this.widgets.dataTable.doBeforeLoadData=function ac(au,av,ax){if(!av||av.error){try{var at=YAHOO.lang.JSON.parse(av.responseText);ap.widgets.dataTable.set("MSG_ERROR",at.message)}catch(aw){ap._setDefaultDataTableErrors(ap.widgets.dataTable)}}if(av.results.length===0){this.fireEvent("renderEvent",{type:"renderEvent"})}return true};this.widgets.dataTable.doBeforeSortColumn=function ao(ax,au){ap.currentSort={oColumn:ax,sSortDir:au};var ay=this.get("sortedBy")||{};var av=(ay.key===ax.key)?true:false;var aw=(ax.sortOptions&&YAHOO.lang.isFunction(ax.sortOptions.sortFunction))?ax.sortOptions.sortFunction:null;if(!av||aw){aw=aw||this.get("sortFunction");var at=(ax.sortOptions&&ax.sortOptions.field)?ax.sortOptions.field:ax.field;this._oRecordSet.sortRecords(aw,((au==YAHOO.widget.DataTable.CLASS_DESC)?true:false),at)}else{this._oRecordSet.reverseRecords()}this.render();this.set("sortedBy",{key:ax.key,dir:au,column:ax});return false};this.widgets.dataTable.subscribe("checkboxClickEvent",function(at){var au=at.target.value;this.selectedItems[au]=at.target.checked;u.fire(this.scopeId+"selectedItemsChanged")},this,true);this.widgets.dataTable.subscribe("beforeRenderEvent",function(){if(ap.currentSort){var aw=ap.currentSort.oColumn,au=ap.currentSort.sSortDir,av=(aw.sortOptions&&YAHOO.lang.isFunction(aw.sortOptions.sortFunction))?aw.sortOptions.sortFunction:null;if(au||av){av=av||this.rendererHelper.get("sortFunction");var at=(aw.sortOptions&&aw.sortOptions.field)?aw.sortOptions.field:aw.field;this._oRecordSet.sortRecords(av,((au==YAHOO.widget.DataTable.CLASS_DESC)?true:false),at)}}},this.widgets.dataTable,true);this.widgets.dataTable.subscribe("renderEvent",function(){Alfresco.logger.debug("DataTable renderEvent");if(this.widgets.itemSelect==null){this.widgets.itemSelect=Alfresco.util.createYUIButton(this,ap.timeStampId+"itemSelect-button",this.onItemSelect,{type:"menu",menu:ap.timeStampId+"itemSelect-menu",disabled:false});S.removeClass(ap.id+"-"+ap.timeStampId+"itemSelect-div","hidden")}if(YAHOO.env.ua.ie<7){var at=this.widgets.dataTable.getTableEl().parentNode;at.className=at.className}for(var av=0,au=this.extraAfterDataGridUpdate.length;av<au;av++){this.extraAfterDataGridUpdate[av].call(this)}for(var av=0,au=this.afterDataGridUpdate.length;av<au;av++){this.afterDataGridUpdate[av].call(this)}this.afterDataGridUpdate=[]},this,true);this.widgets.dataTable.subscribe("rowMouseoverEvent",this.onEventHighlightRow,this,true);this.widgets.dataTable.subscribe("rowMouseoutEvent",this.onEventUnhighlightRow,this,true);if(this.options.saveFieldUrl!=null){var ab=function(au){var aw=au.target;var at=ap.widgets.dataTable.getTdEl(aw);if(at){var av=ap.widgets.dataTable.getTdEl(at);if(S.hasClass(av,YAHOO.widget.DataTable.CLASS_SELECTED)){ap.widgets.dataTable.onEventShowCellEditor(au)}}};this.widgets.dataTable.subscribe("cellClickEvent",function(au){var at=ap.widgets.dataTable.getColumn(au.target);if(at.editor!=null){ap.widgets.dataTable.focus();ab(au);ap.widgets.dataTable.onEventSelectCell(au)}});this.widgets.dataTable.subscribe("tbodyKeyEvent",function(au){var at=Q.getCharCode(au.event);if((at>47&&at<90)||(at>95&&at<106)){ab({target:this.getLastSelectedCell()})}});this.widgets.dataTable.subscribe("cellSelectEvent",this.widgets.dataTable.clearTextSelection)}if(this.options.sortable){var am="group-"+ap.id;ap.widgets.dataTable.dtdTargets={};var ae=function(az){if(ap.widgets.dataTable.getRecord(Q.getTarget(az))!=null){var au=ap.widgets.dataTable.getRecord(Q.getTarget(az)).getData("permissions").userAccess;if(au.sort){var ay=ap.widgets.dataTable.getTrEl(Q.getTarget(az)),ax=null,aA=new YAHOO.util.DDProxy(ay.id,am),at=null,aw=null,av=null;aA.handleMouseDown(az.event);aA.startDrag=function(){at=this.getDragEl();aw=this.getEl();srcIndex=aw.sectionRowIndex;S.setStyle(aw,"visibility","hidden");at.innerHTML="<table><tbody>"+aw.innerHTML+"</tbody></table>"};aA.endDrag=function(aC,aF){S.setStyle(at,"visibility","hidden");S.setStyle(aw,"visibility","");if(ap.options.sortUrl){var aB=ap.widgets.dataTable.getRecord(ax);if(aB!=null){dstData=aB.getData();srcData=ap.widgets.dataTable.getRecord(aw).getData();if(dstData&&srcData){var aD=ap.options.sortUrl+"/"+dstData.nodeRef.replace(":/","")+"?selectedNodeRefs="+srcData.nodeRef;Alfresco.util.Ajax.jsonPost({url:aD,successCallback:{fn:function aE(aG){ap._updateDataGrid.call(ap,{page:ap.currentPage})},scope:this},failureCallback:{fn:function aE(aG){Alfresco.util.PopupManager.displayMessage({text:ap.msg("message.details.failure")})},scope:this}})}}}};aA.onDragOver=function(aB,aC){av=S.get(aC);if(av!=null&&av.nodeName.toLowerCase()==="tr"){ax=av.sectionRowIndex;S.addClass(aC,"elementDragOverHighlight")}};aA.onDragOut=function(aC,aD){var aB=S.get(aD);if(aB!=null&&aB.nodeName.toLowerCase()==="tr"){S.removeClass(aD,"elementDragOverHighlight")}}}}};this.widgets.dataTable.subscribe("cellMousedownEvent",ae);this.widgets.dataTable.subscribe("rowAddEvent",function(at){if(at.record){var au=at.record.getId();ap.widgets.dataTable.dtdTargets[au]=new YAHOO.util.DDTarget(au,am)}});this.widgets.dataTable.subscribe("rowDeleteEvent",function(at){if(at.record){var au=at.record.getId();ap.widgets.dataTable.dtdTargets[au].unreg();delete ap.widgets.dataTable.dtdTargets[au]}})}},onItemSelect:function h(af,ae,ad){var ab=ae[0],ac=ae[1];this.selectItems(Alfresco.util.findEventClass(ac));Q.preventDefault(ab)},onEventHighlightRow:function d(au){this.widgets.dataTable.onEventHighlightRow.call(this.widgets.dataTable,au);var ac=S.get(this.id+"-actions-"+au.target.id);if(ac&&ac.firstChild===null){var ad=this.widgets.dataTable.getRecord(au.target.id),av=S.get(this.id+"-actionSet").cloneNode(true);av.innerHTML=YAHOO.lang.substitute(window.unescape(av.innerHTML),this.getActionUrls(ad));av.id=ac.id+"_a";S.addClass(av,"simple");var aw=ad.getData("permissions").userAccess,ai=ad.getData("actionLabels")||{};aw["filter-"+this.currentFilter.filterId]=true;var aj=YAHOO.util.Selector.query("div",av),am,an,ar,ab,ag,ap,ak,ao,at;for(ap=0,ak=aj.length;ap<ak;ap++){am=aj[ap];an=am.firstChild;ar=an.firstChild;if(ar&&ai[am.className]){ar.innerHTML=M(ai[am.className])}if(an.rel!==""){ab=an.rel.split(",");for(ao=0,at=ab.length;ao<at;ao++){ag=ab[ao];if((ag.charAt(0)=="~")?!!aw[ag.substring(1)]:!aw[ag]){av.removeChild(am);break}}}}var ah=this.options.splitActionsAt;aj=YAHOO.util.Selector.query("div",av);if(aj.length>ah){var ae=S.get(this.id+"-moreActions").cloneNode(true);var aq=YAHOO.util.Selector.query("div",ae);S.insertBefore(aq[0],aj[ah]);S.insertBefore(aq[1],aj[ah]);var al=aj.slice(ah);for(var af in al){if(al.hasOwnProperty(af)){aq[1].appendChild(al[af])}}}ac.appendChild(av)}if(this.showingMoreActions){this.deferredActionsMenu=ac}else{if(!S.hasClass(document.body,"masked")){this.currentActionsMenu=ac;S.removeClass(ac,"hidden");this.deferredActionsMenu=null}}},onEventUnhighlightRow:function e(ac){this.widgets.dataTable.onEventUnhighlightRow.call(this.widgets.dataTable,ac);var ab=S.get(this.id+"-actions-"+(ac.target.id));if(!this.showingMoreActions||S.hasClass(document.body,"masked")){S.addClass(ab,"hidden");this.deferredActionsMenu=null}},getActionUrls:function G(ac){var ab=YAHOO.lang.isFunction(ac.getData)?ac.getData():ac,ad=ab.nodeRef;return({editMetadataUrl:"edit-dataitem?nodeRef="+ad})},getSelectedItems:function q(){var ac=[],af=this.widgets.dataTable.getRecordSet(),ad=0,ag=af.getLength(),ab;for(var ae=ad;ae<=ag;ae++){ab=af.getRecord(ae);if(ab!=null&&this.selectedItems[ab.getData("nodeRef")]){ac.push(ab.getData())}}return ac},selectItems:function w(ai){var ah=this.widgets.dataTable.getRecordSet(),af=E.query('input[type="checkbox"]',this.widgets.dataTable.getTbodyEl()),ae=0,ac=af.length,ad,ag,ab;switch(ai){case"selectAll":ab=function(aj,ak){return true};break;case"selectNone":ab=function(aj,ak){return false};break;case"selectInvert":ab=function(aj,ak){return !ak};break;default:ab=function(aj,ak){return ak}}for(ag=0;ag<ac;ag++){ad=ah.getRecord(ag+ae);this.selectedItems[ad.getData("nodeRef")]=af[ag].checked=ab(ad.getData("type"),af[ag].checked)}u.fire(this.scopeId+"selectedItemsChanged")},onSelectedItemsChanged:function T(ag,ai){var aj=this.getSelectedItems(),am,an={},ak,ac=this.widgets.selectedItems.getMenu().getItems(),ab,ad,ae,af,al;for(af=0,al=aj.length;af<al;af++){am=aj[af];ak=am.permissions.userAccess;for(var ah in ak){if(ak.hasOwnProperty(ah)){an[ah]=(an[ah]===undefined?ak[ah]:an[ah]&&ak[ah])}}}for(var ah in ac){if(ac.hasOwnProperty(ah)){ab=ac[ah];ae=false;if(ab.element.firstChild){if(ab.element.firstChild.rel&&ab.element.firstChild.rel!==""){ad=ab.element.firstChild.rel.split(",");for(af=0,al=ad.length;af<al;af++){if(!an[ad[af]]){ae=true;break}}}ab.cfg.setProperty("disabled",ae)}}}this.widgets.selectedItems.set("disabled",(aj.length===0))},onActionDeselectAll:function B(){this.selectItems("selectNone")},onUserAccess:function A(ah,aj){var ad=aj[1];if(ad&&ad.userAccess){var ae,am,al,af;for(var ai in this.widgets){if(this.widgets.hasOwnProperty(ai)){ae=this.widgets[ai];if(ae.get&&ae.get("srcelement")!=null&&ae.get("srcelement").className!="no-access-check"){ae.set("disabled",false);if(typeof ae.get("value")=="string"){am=ae.get("value").split(",");for(var ac=0,ak=am.length;ac<ak;ac++){if(am[ac].indexOf("|")!==-1){af=false;al=am[ac].split("|");for(var ab=0,ag=al.length;ab<ag;ab++){if(ad.userAccess[al[ab]]){af=true;ae.set("activePermission",al[ab],true);break}}if(!af){ae.set("disabled",true);break}}else{if(!ad.userAccess[am[ac]]){ae.set("disabled",true);break}}}}}}}}},onSelectedItems:function F(ag,af,ae){var ac=af[0],ad=af[1];var ab=Alfresco.util.findEventClass(ad);if(ab&&(typeof this[ab]=="function")){this[ab].call(this,this.getSelectedItems())}Q.preventDefault(ac)},onActionShowMore:function Y(ac,af){var ah=this;S.addClass(af.firstChild,"highlighted");var ak=S.getNextSibling(af);S.removeClass(ak,"hidden");ah.showingMoreActions=true;var aj=function ai(){Q.removeListener(ak,"mouseover");Q.removeListener(ak,"mouseout");S.removeClass(af.firstChild,"highlighted");S.addClass(ak,"hidden");ah.showingMoreActions=false;if(ah.deferredActionsMenu!==null){S.addClass(ah.currentActionsMenu,"hidden");ah.currentActionsMenu=ah.deferredActionsMenu;ah.deferredActionsMenu=null;S.removeClass(ah.currentActionsMenu,"hidden")}};if(ak.hideTimerId){window.clearTimeout(ak.hideTimerId)}ak.hideTimerId=window.setTimeout(aj,ah.options.actionsPopupTimeout*4);var ad=function ab(am,al){if(al.hideTimerId){window.clearTimeout(al.hideTimerId);al.hideTimerId=null}};var ag=function ae(an,am){var ao=Q.getTarget(an);var al=ao.relatedTarget;if((al!==am)&&(!S.isAncestor(am,al))){if(am.hideTimerId){window.clearTimeout(am.hideTimerId)}am.hideTimerId=window.setTimeout(aj,ah.options.actionsPopupTimeout)}};Q.on(ak,"mouseover",ad,ak);Q.on(ak,"mouseout",ag,ak)},onActiveDataListChanged:function l(ac,ab){var ad=ab[1];if((ad!==null)&&(ad.dataList!==null)){this.datalistMeta=ad.dataList;this.entity=ad.entity;if(ad.list!=null&&(this.options.list==null||this.options.list.length<1)){this.options.list=ad.list}if(!this.deferredListPopulation.fulfil("onActiveDataListChanged")){this.populateDataGrid()}}},onDataListDetailsUpdated:function P(ac,ab){var ad=ab[1];if((ad!==null)&&(ad.dataList!==null)){this.dataListMeta=ad.dataList;this.renderDataListMeta()}},onDataGridRefresh:function C(ac,ab){this._updateDataGrid.call(this,{page:this.currentPage,updateOnly:ab[1]!=null&&ab[1].updateOnly?ab[1].updateOnly:false,callback:ab[1]!=null&&ab[1].updateOnly?ab[1].callback:null,})},onChangeFilter:function D(ae,ad){var ah=ad[1];if((ah!==null)&&(ah.filterId!==null)){var ag=Alfresco.util.cleanBubblingObject(ah),af=YAHOO.lang.substitute("{filterId}|{filterData}",ag,function(aj,ak,ai){return typeof ak=="undefined"?"":window.escape(ak)}),ac=af.split("|");if(ac[1].length===0){af=ac[0]}Alfresco.logger.debug("EntityDataGrid_onChangeFilter: ",ag);if(ah.datagridFirstTimeNav||!this.options.useHistoryManager){this._updateDataGrid.call(this,{filter:ag,page:this.currentPage})}else{var ab={};if(this.options.usePagination){this.currentPage=1}ab[this.scopeId+"filter"]=af;Alfresco.logger.debug("EntityDataGrid_onChangeFilter: objNav = ",ab);YAHOO.util.History.multiNavigate(ab)}}},onDataItemCreated:function O(ae,ad){var ah=ad[1];if(ah&&(ah.nodeRef!==null)){var af=new Alfresco.util.NodeRef(ah.nodeRef),ac=this.options.itemUrl+af.uri+((this.options.entityNodeRef!=null&&this.options.entityNodeRef.length>0)?"?entityNodeRef="+this.options.entityNodeRef+"&":"?")+"itemType="+encodeURIComponent(this.options.itemType!=null?this.options.itemType:this.datalistMeta.itemType)+"&dataListName="+encodeURIComponent(this.datalistMeta.name!=null?this.datalistMeta.name:this.options.list)+"&site="+this.options.siteId;Alfresco.util.Ajax.jsonPost({url:ac,dataObj:this._buildDataGridParams(),successCallback:{fn:function ab(al){if(al.json&&(al.json.item!==null)){var an=al.json.item;var ak=function am(){var ap=this._findRecordByParameter(af,"nodeRef");if(ap!==null){var ao=this.widgets.dataTable.getTrEl(ap);Alfresco.util.Anim.pulse(ao)}if(ah.callback){ah.callback.call(al.json.item)}};this.afterDataGridUpdate.push(ak);if(al.json.lastSiblingNodeRef!=null){var aj=this._findRecordByParameter(al.json.lastSiblingNodeRef,"nodeRef");if(aj!==null){var ai=this.widgets.dataTable.getRecordIndex(aj);this.widgets.dataTable.addRow(an,ai+1)}}else{this.widgets.dataTable.addRow(an)}u.fire("dirtyDataTable")}},scope:this},failureCallback:{fn:function ag(ai){Alfresco.util.PopupManager.displayMessage({text:this.msg("message.create.refresh.failure")})},scope:this}})}},onDataItemUpdated:function b(ad,ac){var ag=ac[1];if(ag&&(ag.nodeRef!==null)){var ae=new Alfresco.util.NodeRef(ag.nodeRef);var ab=function af(){var ai=this._findRecordByParameter(ae,"nodeRef");if(ai!==null){var ah=this.widgets.dataTable.getTrEl(ai);Alfresco.util.Anim.pulse(ah)}if(ag.callback){ag.callback.call(ai)}};this.afterDataGridUpdate.push(ab);this._updateDataGrid.call(this,{page:this.currentPage})}},onDataItemsDeleted:function J(ad,ab){var ah=ab[1];if(ah&&(ah.items!==null)){var ag,af;for(var ac=0,ae=ah.items.length;ac<ae;ac++){ag=this._findRecordByParameter(ah.items[ac].nodeRef,"nodeRef");if(ag!==null){af=this.widgets.dataTable.getTrEl(ag);Alfresco.util.Anim.fadeOut(af)}}this._updateDataGrid.call(this,{page:this.currentPage})}},onColumnRenamed:function n(ac,ab){var ae=ab[1];if(ae&&(ae.columnId!==null)){var ad=this.widgets.dataTable.getColumn(ae.columnId);if(ad){if(ad.hidden){this.widgets.dataTable.showColumn(ad)}ad.label=ae.label;this.widgets.dataTable.formatTheadCell(ad._elThLabel,ad,this.widgets.dataTable.get("sortedBy"))}}},_findNextItemByParameter:function H(af,ae){var ad=this.widgets.dataTable.getRecordSet();for(var ac=0,ab=ad.getLength();ac<ab;ac++){if(ad.getRecord(ac).getData(ae)==af){if((ac+1)!=ab){return ad.getRecord(ac+1).getData()}}}return null},_findPrevItemByParameter:function H(af,ae){var ad=this.widgets.dataTable.getRecordSet();for(var ac=0,ab=ad.getLength();ac<ab;ac++){if(ad.getRecord(ac).getData(ae)==af){if((ac-1)>=0){return ad.getRecord(ac-1).getData()}}}return null},_setDefaultDataTableErrors:function x(ab){var ac=Alfresco.util.message;ab.set("MSG_EMPTY",ac("message.empty","beCPG.module.EntityDataGrid"));ab.set("MSG_ERROR",ac("message.error","beCPG.module.EntityDataGrid"))},_updateDataGrid:function p(am){am=am||{};var ap=YAHOO.lang.merge({},am.filter!==undefined?am.filter:this.currentFilter),aj=null,af=null,ak=this,ae={filter:ap,page:am.page};var ag=function ao(){if(af){aj=Alfresco.util.PopupManager.displayMessage({displayTime:0,text:'<span class="wait">'+M(this.msg("message.loading"))+"</span>",noEscape:true});if(YAHOO.env.ua.ie>0){this.loadingMessageShowing=true}else{aj.showEvent.subscribe(function(){this.loadingMessageShowing=true},this,true)}}};this._setDefaultDataTableErrors(this.widgets.dataTable);this.showingMoreActions=false;this.loadingMessageShowing=false;af=YAHOO.lang.later(this.options.loadingMessageDelay,this,ag);var an=null;an=function ac(){if(af){af.cancel();af=null}if(aj){if(this.loadingMessageShowing){aj.destroy();aj=null}else{if(an!=null){YAHOO.lang.later(100,ak,an)}}}};var ai=function ad(ar,au,av){an();if(am.updateOnly&&this.scopeId==""){this.widgets.dataTable.onDataReturnUpdateRows.call(this.widgets.dataTable,ar,au,av);if(am.callback){am.callback.call(this)}}else{var aq=function at(){u.fire(this.scopeId+"selectedFilesChanged")};this.afterDataGridUpdate.push(aq);this.afterDataGridUpdate.push(this._addSortDnD);this.currentFilter=ap;this.currentPage=am.page||1;u.fire(this.scopeId+"filterChanged",ap);this.widgets.dataTable.onDataReturnReplaceRows.call(this.widgets.dataTable,ar,au,av)}};var ab=function ah(ar,at){an();this.afterDataGridUpdate=[];if(at.status==401){window.location.reload(true)}else{try{var aq=YAHOO.lang.JSON.parse(at.responseText);this.widgets.dataTable.set("MSG_ERROR",aq.message);this.widgets.dataTable.showTableMessage(aq.message,YAHOO.widget.DataTable.CLASS_ERROR);if(at.status==404){u.fire("deactivateAllControls")}}catch(au){this._setDefaultDataTableErrors(this.widgets.dataTable)}}};var al=this._buildDataGridParams(ae);if(ak.options.postMethod){this.widgets.dataSource.connMgr.setDefaultPostHeader(Alfresco.util.Ajax.JSON);al=YAHOO.lang.JSON.stringify(al);if(Alfresco.util.CSRFPolicy.isFilterEnabled()){this.widgets.dataSource.connMgr.initHeader(Alfresco.util.CSRFPolicy.getHeader(),Alfresco.util.CSRFPolicy.getToken(),false)}}else{al="&metadata="+encodeURIComponent(YAHOO.lang.JSON.stringify(al))}this.widgets.dataSource.sendRequest(al,{success:ai,failure:ab,scope:this})},_buildDataGridParams:function m(ac){var ab={fields:this.dataRequestFields,page:ac&&ac.page?ac.page:this.currentPage,queryExecutionId:this.queryExecutionId,extraParams:this.options.extraParams};if(ac&&ac.filter){ab.filter={filterOwner:ac.filter.filterOwner,filterId:ac.filter.filterId,filterData:ac.filter.filterData,filterParams:this._createFilterURLParameters(ac.filter,this.options.filterParameters)}}return ab},_buildSortParam:function R(){var ab="";if(this.options.groupBy!=null&&this.options.groupBy.length>0){ab+="&sort="+this.options.groupBy.replace("prop_","").replace("_",":")}if(this.options.sortId!=null){ab+="&sortId="+this.options.sortId}return ab},_findRecordByParameter:function W(af,ae){var ad=this.widgets.dataTable.getRecordSet();for(var ac=0,ab=ad.getLength();ac<ab;ac++){if(ad.getRecord(ac).getData(ae)==af){return ad.getRecord(ac)}}return null},_createFilterURLParameters:function z(ab,af){if(YAHOO.lang.isString(ab.filterData)){var ae;for(var ad=0,ac=af.length;ad<ac;ad++){ae=af[ad];if((ab.filterId==ae.id||ae.id=="*")&&(ab.filterData==ae.data||ae.data=="*")){return this._substituteParameters(ae.parameters,{id:ab.filterId,data:ab.filterData})}}}return null},_substituteParameters:function(aj,ae){var ag=aj.match(/{[^}]+}/g);if(ag){var ab={},ac,ai,ad;for(var af=0,ah=ag.length;af<ah;af++){ac=ag[af].substring(1,ag[af].length-1);ai=ac;ad=new Date();if(/^[\-\+]?\d+(d|dt)$/.test(ai)){if(/^[\-\+]?\d+(d)$/.test(ai)){ad.setHours(11);ad.setMinutes(59);ad.setSeconds(59);ad.setMilliseconds(999)}ad.setDate(ad.getDate()+parseInt(ai));ai=ad}else{ai=ae[ac]}ab[ac]=Alfresco.util.isDate(ai)?Alfresco.util.toISO8601(ai):ai}return YAHOO.lang.substitute(aj,ab)}return aj}},true)})();