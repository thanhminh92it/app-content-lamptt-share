
{	
	"items":
	[
		<#list data as item>
		{	
			"f1": "${item.properties["sla:f1"]!'0'}",
			"f2": "${item.properties["sla:f2"]!'0'}",
			"f3": "${item.properties["sla:f3"]!'0'}",
			"f4": "${item.properties["sla:f4"]!'0'}",
			"f5": "${item.properties["sla:f5"]!'0'}",
			"f6": "${item.properties["sla:f6"]!'0'}",
			"f7": "${item.properties["sla:f7"]!'0'}",
			"mat2": "${item.properties["sla:mat2"]!'0'}",
			"mat3": "${item.properties["sla:mat3"]!'0'}",
			"mat4": "${item.properties["sla:mat4"]!'0'}",
			"fo1": "${item.properties["sla:fo3"]!'0'}",
			"fo2": ${item.properties["sla:fo2"]!'0'},
			"fo3": "${item.properties["sla:fo1"]!'0'}",
			"name": "${item.properties.name!'0'}",
			"description": "${item.properties.description!''}"
		}<#if item_has_next>,</#if>
		</#list>
	]
}
