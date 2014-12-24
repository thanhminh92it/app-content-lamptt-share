<#escape x as jsonUtils.encodeJSONString(x)>
{	
	"User":
	{	
		"UserCurrent":"<#if person.properties.firstName??>${person.properties.firstName}</#if><#if person.properties.lastName??>${person.properties.lastName}</#if>", 
		"SoTrangA4":"<#if VanBanA4??>${VanBanA4}</#if>",
		"SoVanBanNhapLieu":"<#if VanBanNhapLieu??>${VanBanNhapLieu}</#if>"
	},
	"ListUser":[
		<#list gens as child>
		{
			"user": "${child.properties.userName}",
			"fullname": "${child.properties.firstName + " " + child.properties.lastName}"
		}<#if child_has_next>,</#if>
		</#list>
	]
}
</#escape>