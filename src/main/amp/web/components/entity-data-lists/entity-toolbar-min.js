(function(){var c=YAHOO.util.Dom,b=YAHOO.Bubbling;beCPG.component.EntityDataListToolbar=function(f){beCPG.component.EntityDataListToolbar.superclass.constructor.call(this,"beCPG.component.EntityDataListToolbar",f,["button","container"]);this.toolbarButtonActions={};this.widgets.actionButtons={};b.on("registerToolbarButtonAction",this.onRegisterToolbarButtonAction,this);b.on("activeDataListChanged",this.onActiveDataListChanged,this);this.deferredToolbarPopulation=new Alfresco.util.Deferred(["onReady","onActiveDataListChanged"],{fn:this.populateToolbar,scope:this});return this};YAHOO.extend(beCPG.component.EntityDataListToolbar,Alfresco.component.Base);YAHOO.lang.augmentObject(beCPG.component.EntityDataListToolbar.prototype,{entity:null,options:{siteId:"",entityNodeRef:""},onRegisterToolbarButtonAction:function a(g,f){var h=f[1];if(h&&h.actionName){this.toolbarButtonActions[h.actionName]=h}},onActiveDataListChanged:function a(g,f){var h=f[1];if((h!==null)&&(h.dataList!==null)){this.datalistMeta=h.dataList;this.entity=h.entity;if(h.list!==null&&(!this.options.list||this.options.list===null||this.options.list.length<1)){this.options.list=h.list}if(!this.deferredToolbarPopulation.fulfil("onActiveDataListChanged")){this.populateToolbar()}}},populateToolbar:function d(){if(!YAHOO.lang.isObject(this.datalistMeta)){return}var k=c.get(this.id+"-toolbar-buttons-right"),h=c.get(this.id+"-toolbar-buttons-left"),j=c.get(this.id+"-toolBar-template-button");for(var g in this.toolbarButtonActions){var l=this.toolbarButtonActions[g];if(this.widgets.actionButtons[g]==null&&(l.evaluate===null||l.evaluate(this.datalistMeta,this.entity))){if(l.createWidget){if(l.right!==null&&l.right===true){this.widgets.actionButtons[g]=l.createWidget(k,this)}else{this.widgets.actionButtons[g]=l.createWidget(h,this)}}else{var i=j.cloneNode(true);c.setAttribute(i,"id",this.id+"-"+g+"ContainerDiv");c.addClass(i,g);if(l.right!==null&&l.right===true){k.appendChild(i)}else{h.appendChild(i)}var f=c.getFirstChild(i);c.setAttribute(f,"id",this.id+"-"+g+"Button");this.widgets.actionButtons[g]=Alfresco.util.createYUIButton(this,g+"Button",l.fn);this.widgets.actionButtons[g].set("label",this.msg("button."+g));this.widgets.actionButtons[g].set("title",this.msg("button."+g+".description"));c.removeClass(i,"hidden")}}}},onReady:function e(){this.deferredToolbarPopulation.fulfil("onReady");c.setStyle(this.id+"-body","visibility","visible")}},true)})();