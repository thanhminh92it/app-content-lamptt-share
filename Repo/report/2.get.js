<import resource="classpath:/alfresco/extension/templates/webscripts/zalu/vn/report/lib/lamptt.search.lib.js">
function main()
{
	var phong = "Ph\u00f4ng";
	model.dataItems = getFolderbyName(phong);
	model.data = getFolderbyName(args.name);
}

main();