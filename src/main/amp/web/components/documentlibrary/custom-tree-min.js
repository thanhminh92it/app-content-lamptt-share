(function(){beCPG.custom.DocListTree=function b(c){beCPG.custom.DocListTree.superclass.constructor.call(this,c);return this};YAHOO.extend(beCPG.custom.DocListTree,Alfresco.DocListTree,{_buildTreeNode:function a(c,e,d){var f=new YAHOO.widget.TextNode({label:c.name,path:c.path,nodeRef:c.nodeRef,description:c.description},e,d);if(beCPG.util.isEntity(c)){f.labelStyle="entity "+c.type.replace(":","-")+" ygtvlabel"}return f}})})();