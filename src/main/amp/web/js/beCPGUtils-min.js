(function(){var a=Alfresco.util.siteURL;beCPG.util.entityCharactURL=function(f,e,d,b){var c=new Alfresco.util.NodeRef(e);var g="entity-data-lists?nodeRef="+c.toString();if(b&&b!=null){g="context/"+b+"/"+g}g=a(g,{site:f});if(d=="bcpg:finishedProduct"||d=="bcpg:semiFinishedProduct"){g+="&list=compoList"}else{if(d=="bcpg:packagingKit"){g+="&list=packagingList"}else{if(d=="pjt:project"){g+="&list=taskList"}}}return g};beCPG.util.entityDocumentsURL=function(f,e,d,b){var c=null;if(Alfresco.constants.PAGECONTEXT=="mine"){c="/myfiles"}else{if(Alfresco.constants.PAGECONTEXT=="shared"){c="/sharedfiles"}else{c=Alfresco.util.isValueSet(f)?"/documentlibrary":"/repository"}}if(b){c+="?path="+encodeURIComponent(e+"/"+d)}else{if(c.indexOf("repository")>0||c.indexOf("sharedfiles")>0){c+="?path="+encodeURIComponent("/"+e.split("/").slice(2).join("/")+"/"+d)}else{if(c.indexOf("myfiles")>0){c+="?path="+encodeURIComponent("/"+e.split("/").slice(4).join("/")+"/"+d)}else{c+="?path="+encodeURIComponent("/"+e+"/"+d)}}}if(c!==null){c=a(c,{site:f})}return c};beCPG.util.entityDetailsURL=function(f,e,d,b){var c=new Alfresco.util.NodeRef(e);var h="entity";if(d=="document"||d=="folder"){h=d}var g=h+"-details?nodeRef="+c.toString();if(b&&b!=null){g="context/"+b+"/"+g}return a(g,{site:f})};beCPG.util.isEntity=function(b){if(b&&b.jsNode&&beCPG.util.contains(b.jsNode.aspects,"bcpg:entityListsAspect")){return true}if(b&&b.aspects!==null&&beCPG.util.contains(b.aspects,"bcpg:entityListsAspect")){return true}return false};beCPG.util.postActivity=function(f,b,g,e,d,h){if(!YAHOO.lang.isString(f)||f.length===0||!YAHOO.lang.isString(b)||b.length===0||!YAHOO.lang.isString(g)||g.length===0||!YAHOO.lang.isObject(d)===null||!(YAHOO.lang.isString(d.nodeRef)||YAHOO.lang.isString(d.parentNodeRef))){return}var c={method:"POST",url:Alfresco.constants.PROXY_URI+"slingshot/activity/create",successCallback:{fn:h,scope:this},failureCallback:{fn:h,scope:this},dataObj:YAHOO.lang.merge({site:f,type:b,title:g,page:e},d)};Alfresco.util.Ajax.jsonRequest(c)};Alfresco.util.getFileIcon.types={"{http://www.alfresco.org/model/content/1.0}cmobject":"file","cm:cmobject":"file","{http://www.alfresco.org/model/content/1.0}content":"file","cm:content":"file","{http://www.alfresco.org/model/content/1.0}thumbnail":"file","cm:thumbnail":"file","{http://www.alfresco.org/model/content/1.0}folder":"folder","cm:folder":"folder","{http://www.alfresco.org/model/content/1.0}category":"category","cm:category":"category","{http://www.alfresco.org/model/content/1.0}person":"user","cm:person":"user","{http://www.alfresco.org/model/content/1.0}authorityContainer":"group","cm:authorityContainer":"group",tag:"tag","{http://www.alfresco.org/model/site/1.0}sites":"site","st:sites":"site","{http://www.alfresco.org/model/site/1.0}site":"site","st:site":"site","{http://www.alfresco.org/model/transfer/1.0}transferGroup":"server-group","trx:transferGroup":"server-group","{http://www.alfresco.org/model/transfer/1.0}transferTarget":"server","trx:transferTarget":"server","{http://www.bcpg.fr/model/security/1.0}aclGroup":"aclGroup","sec:aclGroup":"aclGroup","{http://www.bcpg.fr/model/becpg/1.0}cost":"cost","bcpg:cost":"cost","{http://www.bcpg.fr/model/becpg/1.0}microbio":"microbio","bcpg:microbio":"microbio","{http://www.bcpg.fr/model/becpg/1.0}physicoChem":"physicoChem","bcpg:physicoChem":"physicoChem","{http://www.bcpg.fr/model/becpg/1.0}allergen":"allergen","bcpg:allergen":"allergen","{http://www.bcpg.fr/model/becpg/1.0}organo":"organo","bcpg:organo":"organo","{http://www.bcpg.fr/model/becpg/1.0}ing":"ing","bcpg:ing":"ing","{http://www.bcpg.fr/model/becpg/1.0}nut":"nut","bcpg:nut":"nut","{http://www.bcpg.fr/model/becpg/1.0}geoOrigin":"geoOrigin","bcpg:geoOrigin":"geoOrigin","{http://www.bcpg.fr/model/becpg/1.0}bioOrigin":"bioOrigin","bcpg:bioOrigin":"bioOrigin","{http://www.bcpg.fr/model/becpg/1.0}client":"client","bcpg:client":"client","{http://www.bcpg.fr/model/becpg/1.0}supplier":"supplier","bcpg:supplier":"supplier","{http://www.bcpg.fr/model/becpg/1.0}product":"product","bcpg:product":"product","{http://www.bcpg.fr/model/quality/1.0}controlPlan":"controlPlan","qa:controlPlan":"controlPlan","{http://www.bcpg.fr/model/quality/1.0}nc":"nc","qa:nc":"nc","{http://www.bcpg.fr/model/quality/1.0}controlPoint":"controlPoint","qa:controlPoint":"controlPoint","{http://www.bcpg.fr/model/quality/1.0}qualityControl":"qualityControl","qa:qualityControl":"qualityControl","{http://www.bcpg.fr/model/quality/1.0}workItemAnalysis":"workItemAnalysis","qa:workItemAnalysis":"workItemAnalysis","{http://www.bcpg.fr/model/becpg/1.0}systemEntity":"systemEntity","bcpg:systemEntity":"systemEntity","{http://www.bcpg.fr/model/becpg/1.0}finishedProduct":"finishedProduct","bcpg:finishedProduct":"finishedProduct","{http://www.bcpg.fr/model/becpg/1.0}semiFinishedProduct":"semiFinishedProduct","bcpg:semiFinishedProduct":"semiFinishedProduct","{http://www.bcpg.fr/model/becpg/1.0}rawMaterial":"rawMaterial","bcpg:rawMaterial":"rawMaterial","{http://www.bcpg.fr/model/becpg/1.0}localSemiFinishedProduct":"localSemiFinishedProduct","bcpg:localSemiFinishedProduct":"localSemiFinishedProduct","{http://www.bcpg.fr/model/becpg/1.0}packagingKit":"packagingKit","bcpg:packagingKit":"packagingKit","{http://www.bcpg.fr/model/becpg/1.0}packagingMaterial":"packagingMaterial","bcpg:packagingMaterial":"packagingMaterial","{http://www.bcpg.fr/model/becpg/1.0}resourceProduct":"resourceProduct","bcpg:resourceProduct":"resourceProduct","{http://www.bcpg.fr/model/ecm/1.0}changeOrder":"changeOrder","ecm:changeOrder":"changeOrder","{http://www.bcpg.fr/model/publication/1.0}productCatalog":"productCatalog","bp:productCatalog":"productCatalog","{http://www.bcpg.fr/model/becpg/1.0}productSpecification":"productSpecification","bcpg:productSpecification":"productSpecification","{http://www.bcpg.fr/model/becpg/1.0}productMicrobioCriteria":"productMicrobioCriteria","bcpg:productMicrobioCriteria":"productMicrobioCriteria","{http://www.bcpg.fr/model/project/1.0}project":"project","pjt:project":"project","rep:reportTpl":"rptdesign","{http://www.bcpg.fr/model/report/1.0}reportTpl":"rptdesign"}})();