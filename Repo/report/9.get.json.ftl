{	
	"HoSo":
	[	
		<#list HoSos as child>
		{
			"Name":"${child.properties.name}"
		}<#if child_has_next>,</#if>
		</#list>
	],
	"Items":
	[	
		<#if data??>
		<#list data.items as child>
		{
			"SoKyHieuVanBan":"<#if child.SoKyHieuVanBan??>${child.SoKyHieuVanBan}</#if>",
			"NgayThangVanBan":"<#if child.NgayThang??>${child.NgayThang?string["dd/MM/yyyy"]}</#if>",
			"TacGia":"<#if child.TacGia??>${child.TacGia}</#if>",
			"TrichYeuNoiDung":"<#if child.TrichYeuNoiDung??>${child.TrichYeuNoiDung}</#if>",
			"SoTrang":"<#if child.ToSo??>${child.ToSo}</#if>",
			"GhiChu":"<#if child.GhiChu??>${child.GhiChu}</#if>"
		}<#if child_has_next>,</#if>
		</#list>
		</#if>
	]
}