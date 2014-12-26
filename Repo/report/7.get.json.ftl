{	
	"Phong":
	{
		"fo2":${phong.properties["sla:fo2"]!'-1'},
		"fo3":${phong.properties["sla:fo1"]!'-1'}
	},
	"TaiLieu":
	[
		<#list data.items as child>
		{	
			"SoKyHieuVanBan":"<#if child.SoKyHieuVanBan??>${child.SoKyHieuVanBan}</#if>",
			"NgayThang":"<#if child.NgayThang??>${child.NgayThang?string["dd/MM/yyyy"]}</#if>",
			"TacGia":"<#if child.TacGia??>${child.TacGia}</#if>",
			"TrichYeuNoiDung":"<#if child.TrichYeuNoiDung??>${child.TrichYeuNoiDung}</#if>",
			"ToSo":"<#if child.ToSo??>${child.ToSo}</#if>",
			"GhiChu":"<#if child.GhiChu??>${child.GhiChu}</#if>",
			"DoMat":"<#if child.DoMat??>${child.DoMat}</#if>"
		}<#if child_has_next>,</#if>
		</#list>
	]
	
}