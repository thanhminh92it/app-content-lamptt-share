// <import resource="classpath:/alfresco/extension/templates/webscripts/zalu/vn/report/lib/lamptt.search.lib.js">
function main()
{
	var Phong = search.luceneSearch("TYPE:\"la:fo3\"");
	model.dataItems = Phong;
	Phong = search.luceneSearch("TYPE:\"la:fo3\" + @cm\\:name:\""+args.name+"\"");
	model.data = Phong;
}

main();