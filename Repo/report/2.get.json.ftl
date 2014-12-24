<#escape x as jsonUtils.encodeJSONString(x)>
{	
	"AllItems":[
		<#list dataItems.items as item>
		{
			"f1": "${item.f1}",
			"f2": "${item.f2}",
			"f3": "${item.f3}",
			"f4": "${item.f4}",
			"f5": "${item.f5}",
			"f6": "${item.f6}",
			"f7": "${item.f7}",
			"mat2": "${item.mat2}",
			"mat3": "${item.mat3}",
			"mat4": "${item.mat4}",
			"fo1": "${item.fo1}",
			"fo2": ${item.fo2},
			"fo3": "${item.fo3}",
			"nodeRef": "${item.nodeRef}",
			"type": "${item.type}",
			"name": "${item.name!''}",
			"displayName": "${item.displayName!''}",
			<#if item.title??>
			"title": "${item.title}",
			</#if>
			"description": "${item.description!''}",
			"modifiedOn": "${xmldate(item.modifiedOn)}",
			"modifiedByUser": "${item.modifiedByUser}",
			"modifiedBy": "${item.modifiedBy}",
			"size": ${item.size?c},
			"mimetype": "${item.mimetype!''}",
			<#if item.site??>
			"site":
			{
				"shortName": "${item.site.shortName}",
				"title": "${item.site.title}"
			},
			"container": "${item.container}",
			</#if>
			<#if item.path??>
			"path": "${item.path}",
			</#if>
			"tags": [<#list item.tags as tag>"${tag}"<#if tag_has_next>,</#if></#list>]
		}<#if item_has_next>,</#if>
		</#list>
	],
	"items":
	[
		<#list data.items as item>
		{
			"f1": "${item.f1}",
			"f2": "${item.f2}",
			"f3": "${item.f3}",
			"f4": "${item.f4}",
			"f5": "${item.f5}",
			"f6": "${item.f6}",
			"f7": "${item.f7}",
			"mat2": "${item.mat2}",
			"mat3": "${item.mat3}",
			"mat4": "${item.mat4}",
			"fo1": "${item.fo1}",
			"fo2": ${item.fo2},
			"fo3": "${item.fo3}",
			"nodeRef": "${item.nodeRef}",
			"type": "${item.type}",
			"name": "${item.name!''}",
			"displayName": "${item.displayName!''}",
			<#if item.title??>
			"title": "${item.title}",
			</#if>
			"description": "${item.description!''}",
			"modifiedOn": "${xmldate(item.modifiedOn)}",
			"modifiedByUser": "${item.modifiedByUser}",
			"modifiedBy": "${item.modifiedBy}",
			"size": ${item.size?c},
			"mimetype": "${item.mimetype!''}",
			<#if item.site??>
			"site":
			{
				"shortName": "${item.site.shortName}",
				"title": "${item.site.title}"
			},
			"container": "${item.container}",
			</#if>
			<#if item.path??>
			"path": "${item.path}",
			</#if>
			"tags": [<#list item.tags as tag>"${tag}"<#if tag_has_next>,</#if></#list>]
		}<#if item_has_next>,</#if>
		</#list>
	]
}
</#escape>