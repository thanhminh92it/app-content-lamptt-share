(function(){beCPG.component.WUsedForm=function(e){beCPG.component.WUsedForm.superclass.constructor.call(this,"beCPG.component.WUsedForm",e,["button","container"]);return this};YAHOO.extend(beCPG.component.WUsedForm,Alfresco.component.Base);YAHOO.lang.augmentObject(beCPG.component.WUsedForm.prototype,{options:{type:null,itemType:null,assocType:null,nodeRefs:null,searchQuery:null,searchTerm:null},onReady:function a(){var j=this;this.widgets.wusedTypeSelect=Alfresco.util.createYUIButton(this,"wusedTypeSelect-button",this.onWusedTypeSelect,{type:"menu",menu:"wusedTypeSelect-menu",lazyloadmenu:false});if(this.widgets.wusedTypeSelect==null){this.widgets.operators=Alfresco.util.createYUIButton(this,"operators",function(n,i){var o=i[1];if(o){this.widgets.operators.set("label",o.cfg.getProperty("text"));this.widgets.operators.value=o.value}},{type:"menu",menu:"operators-menu",lazyloadmenu:false});this.widgets.operators.value=j.options.searchQuery?"OR":"AND";this.widgets.operators.set("label",this.msg("operator."+this.widgets.operators.value.toLowerCase()));this.widgets.typeSelect=Alfresco.util.createYUIButton(this,"itemTypeSelect-button",this.onTypeSelect,{type:"menu",menu:"itemTypeSelect-menu",lazyloadmenu:false});this.widgets.typeSelect.getMenu().subscribe("click",function(n,i){var o=i[1];if(o){j.widgets.typeSelect.set("label",o.cfg.getProperty("text"))}});var h=Alfresco.util.ComponentManager.find({name:"beCPG.module.EntityDataGrid"})[0],l=h.onDatalistColumns;var m=function(){if(!j.options.searchQuery){h.options.entityNodeRef=j._getNodeRefs();if(h.options.entityNodeRef==null||h.options.entityNodeRef.length<1){return}h.options.extraParams=YAHOO.lang.JSON.stringify({operator:j.widgets.operators.value})}else{h.options.extraParams=YAHOO.lang.JSON.stringify({operator:j.widgets.operators.value,searchQuery:YAHOO.lang.JSON.parse(j.options.searchQuery),searchTerm:j.options.searchTerm})}h.onDatalistColumns=function(n){var i=true,o="assoc_"+j.options.assocType.replace(":","_");if(n.json.columns.length<1){n.json.columns.push({type:"association",name:j.options.assocType,formsName:o,label:j.msg("column.wused"),dataType:j.options.itemType});i=false}l.call(this,n);if(i){YAHOO.Bubbling.fire("columnRenamed",{columnId:o,label:j.msg("column.wused")})}};YAHOO.Bubbling.fire("registerDataGridRenderer",{propertyName:[j.options.itemType+"_"+j.options.assocType],renderer:function(p,q,n,o){var i=beCPG.util.entityCharactURL(q.siteId,q.value);return'<span class="'+q.metadata+'" ><a href="'+i+'">'+Alfresco.util.encodeHTML(q.displayValue)+"</a></span>"}});YAHOO.Bubbling.fire("activeDataListChanged",{dataList:{name:"WUsed-"+j.options.assocType.replace(":","_"),itemType:j.options.itemType}})};this.widgets.showButton=Alfresco.util.createYUIButton(this,"show-button",m,{disabled:true});if(!j.options.searchQuery){this.widgets.entitiesPicker=new beCPG.component.AutoCompletePicker(this.id+"-entities",this.id+"-entities-field",true).setOptions({mode:"edit",currentValue:this.options.nodeRefs,multipleSelectMode:true,dsStr:"/becpg/autocomplete/targetassoc/associations/"+this.options.type})}var e=this.widgets.typeSelect.getMenu().getItems();if(e&&e.length>0){j.widgets.showButton.set("disabled",false)}for(var f in e){var k=e[f];if(k){j.widgets.typeSelect.set("label",k.cfg.getProperty("text"));var g=k._oAnchor.children[0].attributes[0].nodeValue;this._extractValues(g);if(g.indexOf("selected")>-1){m();break}}}}},onTypeSelect:function b(i,h,g){var f=h[1];var e=Alfresco.util.findEventClass(f);this._extractValues(e)},onWusedTypeSelect:function b(i,h,g){var f=h[1];var e=Alfresco.util.findEventClass(f);window.location.href=Alfresco.constants.URL_PAGECONTEXT+"wused?type="+e},_extractValues:function d(e){this.options.itemType=e.split("#")[0];this.options.assocType=e.split("#")[1]},_getNodeRefs:function c(){return this.widgets.entitiesPicker.getValues()}},true)})();