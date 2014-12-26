{	
	"HoSo":
	[	
		<#list data as child>
{
			"HopSo":"<#if child.HopSo.properties["cm:name"]??>${child.HopSo.properties["cm:name"]}</#if>",
			"HoSo":"<#if child.HoSo.properties["cm:name"]??>${child.HoSo.properties["cm:name"]}</#if>",
			"TieuDeHoSo":"<#if child.HoSo.properties.title??>${child.HoSo.properties.title}</#if>",
			"BatDauKetThuc":"<#if child.HoSo.properties["la:fo1p36"]??>${child.HoSo.properties["la:fo1p36"]?string["dd/MM/yyyy"]} - <#else>...</#if><#if child.HoSo.properties["la:fo1p37"]??>${child.HoSo.properties["la:fo1p37"]?string["dd/MM/yyyy"]}<#else> - ...</#if>",
			"SoTrang": "<#if child.HoSo.properties["la:fo1p6"]??>${child.HoSo.properties["la:fo1p6"]}</#if>",
			"GhiChu": "<#if child.HoSo.properties["la:fo1p7"]??>${child.HoSo.properties["la:fo1p7"]}</#if>"
		}<#if child_has_next>,</#if>
		</#list>
	]
}