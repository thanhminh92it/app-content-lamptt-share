<#escape x as jsonUtils.encodeJSONString(x)>
{	
	"UserCurrent":"<#if person.properties.firstName??>${person.properties.firstName}</#if><#if person.properties.lastName??>${person.properties.lastName}</#if>", 
	"SoTrangA4":"<#if VanBanA4??>${VanBanA4}</#if>",
	"SoVanBanNhapLieu":"<#if VanBanNhapLieu??>${VanBanNhapLieu}</#if>"
}
</#escape>