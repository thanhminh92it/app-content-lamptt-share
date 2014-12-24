{	
	"Phong":
	{
		"fo2":<#if phong.properties["sla:fo2"]??>${phong.properties["sla:fo2"]}<#else>-1</#if>,
		"fo3":<#if phong.properties["sla:fo3"]??>${phong.properties["sla:fo2"]}<#else>-1</#if>,
		"mat2":<#if phong.properties["sla:mat2"]??>${phong.properties["sla:mat2"]}<#else>-1</#if>,
		"mat3":<#if phong.properties["sla:mat3"]??>${phong.properties["sla:mat3"]}<#else>-1</#if>,
		"mat4":<#if phong.properties["sla:mat4"]??>${phong.properties["sla:mat4"]}<#else>-1</#if>
	},
	"TaiLieu":
	[
		<#list data.items as child>
		{	
			"SoKyHieuVanBan":"<#if child.SoKyHieuVanBan??>${child.SoKyHieuVanBan}</#if>",
			"NgayThang":"<#if child.NgayThang??>${child.NgayThang?string["dd/MM/yyyy"]}</#if>",
			"TacGia":"<#if child.TacGia??>${child.TacGia}</#if>",
			"TrichYeuNoiDung":"<#if child.TrichYeuNoiDung??>${child.TrichYeuNoiDung}</#if>",
			"SoTrang":"<#if child.ToSo??>${child.ToSo}</#if>",
			"GhiChu":"<#if child.GhiChu??>${child.GhiChu}</#if>",
			"DoMat":"<#if child.DoMat??>${child.DoMat}</#if>"
		}<#if child_has_next>,</#if>
		</#list>
	]
	
}