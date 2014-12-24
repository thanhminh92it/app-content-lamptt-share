<import resource="classpath:/alfresco/extension/templates/webscripts/zalu/vn/report/lib/search.lib.js">
function main()
{	
	var HoSos = search.luceneSearch("TYPE:\"la:fo1\"");
	model.HoSos = HoSos;
	if(HoSos == null || HoSos.length == 0)
	{
		
	}
	else
	{	
		var dem=0;
		var ArrayInfo = new Array()
		for(var i = 0; i < HoSos.length; i++)
		{	
			var str = HoSos[i].properties.name;
			if(str == args.name)
			{	
				var pathFolder = "workspace://SpacesStore/" + HoSos[i].id;
				var data = getDocments(pathFolder, "1");
				model.data = data;
				break;
			}
		}
		
	}
}
function ArrayEntry(Document)
{
	this.Document = Document;
}
main();