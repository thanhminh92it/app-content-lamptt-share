(function(){var b=YAHOO.util.Dom,h=YAHOO.util.Event;var a=Alfresco.util.encodeHTML,g=Alfresco.util.userProfileLink,i=Alfresco.Share.userAvatar;beCPG.custom.DocumentVersions=function e(j){beCPG.custom.DocumentVersions.superclass.constructor.call(this,j);return this};YAHOO.extend(beCPG.custom.DocumentVersions,Alfresco.DocumentVersions,{options:{nodeRef:null,siteId:"",containerId:null,workingCopyVersion:null,allowNewVersionUpload:false,isEntity:false},onReady:function d(){var j=b.get(this.id+"-olderVersions");if(!j){return}this.widgets.alfrescoDataTable=new Alfresco.util.DataTable({dataSource:{url:this.options.isEntity?Alfresco.constants.PROXY_URI+"becpg/api/entity-version?nodeRef="+this.options.nodeRef:Alfresco.constants.PROXY_URI+"api/version?nodeRef="+this.options.nodeRef,doBeforeParseData:this.bind(function(l,k){this.latestVersion=k.splice(0,1)[0];b.get(this.id+"-latestVersion").innerHTML=this.getDocumentVersionMarkup(this.latestVersion);this.versionCache=k;return({data:k})})},dataTable:{container:this.id+"-olderVersions",columnDefinitions:[{key:"version",sortable:false,formatter:this.bind(this.renderCellVersion)}],config:{MSG_EMPTY:this.msg("message.noVersions")}}});h.addListener(window,"resize",function(){var m=(b.getViewportWidth()*0.25)+"px",k=YAHOO.util.Selector.query("h3.thin",this.id+"-body");for(var l=0;l<k.length;l++){k[l].style.width=m}},this,true)},onActionEntityDownload:function f(l){var j=Alfresco.getArchiveAndDownloadInstance(),k={nodesToArchive:[{nodeRef:l}],archiveName:encodeURIComponent(this.latestVersion.name)};j.show(k)},getDocumentVersionMarkup:function c(l){var m=Alfresco.constants.PROXY_URI+"api/node/content/"+l.nodeRef.replace(":/","")+"/"+encodeURIComponent(l.name)+"?a=true",k=Alfresco.constants.PROXY_URI+"becpg/entity/compare/"+this.options.nodeRef.replace(":/","")+"/"+encodeURIComponent(l.label)+"/"+encodeURIComponent(l.name)+".pdf",j="";j+='<div class="version-panel-left">';j+='   <span class="document-version">'+a(l.label)+"</span>";j+="</div>";j+='<div class="version-panel-right">';j+='   <h3 class="thin dark" style="width:'+(b.getViewportWidth()*0.25)+'px;">'+a(l.name)+"</h3>";j+='   <span class="actions">';if(this.options.allowNewVersionUpload){j+='   <a href="#" name=".onRevertVersionClick" rel="'+l.label+'" class="'+this.id+' revert" title="'+this.msg("label.revert")+'">&nbsp;</a>'}if(this.options.isEntity==true){j+='   <a href="#" name=".onActionEntityDownload" rel="'+l.nodeRef+'" class="'+this.id+' download" title="'+this.msg("label.download")+'">&nbsp;</a>'}else{j+='      <a href="'+m+'" class="download" title="'+this.msg("label.download")+'">&nbsp;</a>'}j+='		<a href="#" name=".onViewHistoricPropertiesClick" rel="'+l.nodeRef+'" class="'+this.id+' historicProperties" title="'+this.msg("label.historicProperties")+'">&nbsp;</a>';if(this.options.isEntity==true){j+='      <a href="'+k+'" class="compare" title="'+this.msg("label.compare")+'">&nbsp;</a>'}j+="   </span>";j+='   <div class="clear"></div>';j+='   <div class="version-details">';j+='      <div class="version-details-left">';j+=i(l.creator.userName,32);j+="      </div>";j+='      <div class="version-details-right">';j+=g(l.creator.userName,l.creator.firstName+" "+l.creator.lastName,'class="theme-color-1"')+" ";j+=Alfresco.util.relativeTime(Alfresco.util.fromISO8601(l.createdDateISO))+"<br />";j+=((l.description||"").length>0)?a(l.description,true):'<span class="faded">('+this.msg("label.noComment")+")</span>";j+="      </div>";j+="   </div>";j+="</div>";j+='<div class="clear"></div>';return j}})})();