(function(){var f=YAHOO.util.Dom;var c=Alfresco.util.encodeHTML,d=Alfresco.util.combinePaths,e=Alfresco.util.siteURL,a=Alfresco.util.isValueSet;beCPG.custom.DocumentList=function b(m){beCPG.custom.DocumentList.superclass.constructor.call(this,m);YAHOO.Bubbling.on("doclistMetadata",this.onDoclistMetadata,this);return this};YAHOO.extend(beCPG.custom.DocumentList,Alfresco.DocumentList,{onDoclistMetadata:function(q,o){var p=o[1].metadata,r=this;if(p!==null&&beCPG.util.isEntity(p.parent)){var t=f.get(r.id+"-becpg-entityFolder-message"),n=p.parent.type.split(":")[1],m;var s="product";if(n=="rawMaterial"||n=="finishedProduct"||n=="semiFinishedProduct"||n=="localSemiFinishedProduct"||n=="packagingKit"||n=="packagingMaterial"||n=="resourceProduct"){s="product"}else{if(n=="projet"||n=="systemEntity"||n=="aclGroup"||n=="entityTplFolder"){s=n}else{s="entity"}}m="<img  src='"+Alfresco.constants.PROXY_URI+"/api/node/"+p.parent.nodeRef.replace(":/","")+"/content/thumbnails/doclib?c=queue&ph=true' class='node-thumbnail' width='48'>";m+="<span >"+Alfresco.util.message("page.documentlibrary.instructions."+s)+"</span>";t.innerHTML=m;this.widgets.viewEntityDetails=Alfresco.util.createYUIButton(r,"viewEntityDetails-button",function(w,v,u){window.location.href=beCPG.util.entityDetailsURL(r.options.siteId,r.doclistMetadata.parent.nodeRef,r.doclistMetadata.parent.type)});this.widgets.viewEntityLists=Alfresco.util.createYUIButton(r,"viewEntityLists-button",function(w,v,u){window.location.href=beCPG.util.entityCharactURL(r.options.siteId,r.doclistMetadata.parent.nodeRef,r.doclistMetadata.parent.type)});f.removeClass(r.id+"-becpg-entityFolder-buttons","hidden");f.removeClass(r.id+"-becpg-entityFolder-instructions","hidden")}else{f.addClass(r.id+"-becpg-entityFolder-instructions","hidden")}},onLikes:function l(s){var p=s;if(typeof this.viewRenderers[this.options.viewRendererName]==="object"){p=this.viewRenderers[this.options.viewRendererName].getDataTableRecordIdFromRowElement(this,s)}var t=this.widgets.dataTable.getRecord(p),q=t.getData(),r=q.jsNode.nodeRef,n=q.likes;n.isLiked=!n.isLiked;n.totalLikes+=(n.isLiked?1:-1);var u={successCallback:{fn:function m(B,y){var C=B.json.data;if(C){var A=this._findRecordByParameter(y,"nodeRef"),v=A.getData(),z=v.node,w=v.likes;w.totalLikes=C.ratingsCount;this.widgets.dataTable.updateRow(A,v);if(w.isLiked){var x={fileName:v.fileName,nodeRef:z.nodeRef};if(beCPG.util.isEntity(v)){this.modules.actions.postActivity(this.options.siteId,"entity-liked","entity-details",x)}else{if(z.isContainer){this.modules.actions.postActivity(this.options.siteId,"folder-liked","folder-details",x)}else{this.modules.actions.postActivity(this.options.siteId,"file-liked","document-details",x)}}}}},scope:this,obj:r.toString()},failureCallback:{fn:function o(z,x){var y=this._findRecordByParameter(x,"nodeRef"),v=y.getData(),w=v.likes;w.isLiked=!w.isLiked;w.totalLikes+=(w.isLiked?1:-1);this.widgets.dataTable.updateRow(y,v);Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.save.failure",v.displayName)})},scope:this,obj:r.toString()}};if(n.isLiked){this.services.likes.set(r,1,u)}else{this.services.likes.remove(r,u)}this.widgets.dataTable.updateRow(t,q)}});Alfresco.DocumentList.generateFileFolderLinkMarkup=function i(o,m){var q=m.jsNode,n;if(q.isLink&&a(o.options.siteId)&&m.location.site&&m.location.site.name!==o.options.siteId){if(q.isContainer){n=e("documentlibrary?path="+encodeURIComponent(m.location.path),{site:m.location.site.name})}else{n=o.getActionUrls(m,m.location.site.name).documentDetailsUrl}}else{if(q.isContainer){if(beCPG.util.isEntity(m)){n=o.getActionUrls(m).documentDetailsUrl.replace("document-details","entity-details")}else{if(m.parent.isContainer){n='#" class="filter-change" rel="'+Alfresco.DocumentList.generatePathMarkup(m.location)}else{if(m.location.path==="/"){n='#" class="filter-change" rel="'+Alfresco.DocumentList.generateFilterMarkup({filterId:"path",filterData:d(m.location.path,"")})}else{n="#"}}}}else{var p=o.getActionUrls(m);if(q.isLink&&q.linkedNode.isContainer){n=p.folderDetailsUrl}else{n=p.documentDetailsUrl}}}return'<a href="'+n+'">'};Alfresco.DocumentListSimpleViewRenderer.prototype.renderCellThumbnail=function h(x,w,z,u,q){var t=z.getData(),r=t.jsNode,n=t.displayName,p=r.isContainer,s=r.isLink,v=n.substring(n.lastIndexOf(".")),y=beCPG.util.isEntity(t),m=r.nodeRef.nodeRef;if(y){v=r.type.substring(r.type.lastIndexOf(":"))}u.width=40;f.setStyle(w,"width",u.width+"px");f.setStyle(w.parentNode,"width",u.width+"px");if(p&&!y){w.innerHTML='<span class="folder-small">'+(s?'<span class="link"></span>':"")+(x.dragAndDropEnabled?'<span class="droppable"></span>':"")+Alfresco.DocumentList.generateFileFolderLinkMarkup(x,t)+'<img id="'+m+'" src="'+Alfresco.constants.URL_RESCONTEXT+'components/documentlibrary/images/folder-32.png" /></a>';new YAHOO.util.DDTarget(m)}else{var o=x.id+"-preview-"+z.getId();w.innerHTML='<span id="'+o+'" class="icon32">'+(s?'<span class="link"></span>':"")+Alfresco.DocumentList.generateFileFolderLinkMarkup(x,t)+'<img id="'+m+'" src="'+Alfresco.constants.URL_RESCONTEXT+"components/images/filetypes/"+Alfresco.util.getFileIcon(n,r.type)+'" alt="'+v+'" title="'+c(n)+'" /></a></span>';x.previewTooltips.push(o)}new Alfresco.DnD(m,x)};Alfresco.DocumentListViewRenderer.prototype.renderCellThumbnail=function j(w,v,y,t,p){var s=y.getData(),q=s.jsNode,n=s.displayName,o=q.isContainer,r=q.isLink,u=n.substring(n.lastIndexOf(".")),x=beCPG.util.isEntity(s),m=q.nodeRef.nodeRef;t.width=this.thumbnailColumnWidth;f.setStyle(v,"width",t.width+"px");f.setStyle(v.parentNode,"width",t.width+"px");if((o||(r&&q.linkedNode.isContainer))&&!x){v.innerHTML='<span class="folder">'+(r?'<span class="link"></span>':"")+(w.dragAndDropEnabled?'<span class="droppable"></span>':"")+Alfresco.DocumentList.generateFileFolderLinkMarkup(w,s)+'<img id="'+m+'" src="'+Alfresco.constants.URL_RESCONTEXT+'components/documentlibrary/images/folder-64.png" /></a>';new YAHOO.util.DDTarget(m)}else{v.innerHTML='<span class="thumbnail">'+(r?'<span class="link"></span>':"")+Alfresco.DocumentList.generateFileFolderLinkMarkup(w,s)+'<img id="'+m+'" src="'+Alfresco.DocumentList.generateThumbnailUrl(s)+'" alt="'+u+'" title="'+c(n)+'" /></a></span>'}new Alfresco.DnD(m,w)};Alfresco.DocumentList.generateLikes=function k(p,m){var q=m.node,n=m.likes,r="like."+(q.isContainer&&!beCPG.util.isEntity(m)?"folder.":"document."),o="";if(n.isLiked){o='<a class="like-action enabled" title="'+p.msg(r+"remove.tip")+'" tabindex="0"></a>'}else{o='<a class="like-action" title="'+p.msg(r+"add.tip")+'" tabindex="0">'+p.msg(r+"add.label")+"</a>"}o+='<span class="likes-count">'+c(n.totalLikes)+"</span>";return o};Alfresco.DocumentList.generateComments=function g(p,m){var s=m.node,r=p.getActionUrls(m),n=r[s.isContainer?"folderDetailsUrl":"documentDetailsUrl"]+"#comment",t="comment."+(s.isContainer&&!beCPG.util.isEntity(m)?"folder.":"document.");if(beCPG.util.isEntity(m)){n=n.replace("folder-details","entity-details")}var q=(s.properties["fm:commentCount"]!==undefined);var o='<a href="'+n+'" class="comment'+(q?" hasComments":"")+'" title="'+p.msg(t+"tip")+'" tabindex="0">'+p.msg(t+"label")+"</a>";if(q){o+='<span class="comment-count">'+c(s.properties["fm:commentCount"])+"</span>"}return o}})();