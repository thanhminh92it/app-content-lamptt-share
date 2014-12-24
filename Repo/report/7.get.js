<import resource="classpath:/alfresco/extension/templates/webscripts/zalu/vn/report/lib/search.lib.js">
function main()
{
	var Phong = search.luceneSearch("TYPE:\"cm:folder\" + @cm\\:name:\""+args.name+"\"");
	if(Phong == null || Phong.length == 0)
	{
		status.code = 404;
	    status.message = "Khong co du lieu";
	    status.redirect = true;
	}
	else
	{	
		var pathFolder = "workspace://SpacesStore/" + Phong[0].id;
		var data = getDocments(pathFolder, "1");
		model.data = data;
		model.phong = Phong[0]
	}
}
main();