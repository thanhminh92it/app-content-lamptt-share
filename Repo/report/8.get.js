function main()
{
	var Phong = search.luceneSearch("TYPE:\"la:fo3\" + @cm\\:name:\""+args.name+"\"");
	if(Phong == null || Phong.length == 0)
	{
		status.code = 404;
	    status.message = "Khong co du lieu";
	    status.redirect = true;
	}
	else
	{	
		var Hopsos = Phong[0].children;
		var ArrayInfo = new Array()
		var dem=0;
		for(var i= 0; i < Hopsos.length; i++)
		{	
			var str = Hopsos[i].typeShort;
			if(str == "la:fo2")
			{	
				var Hosos = Hopsos[i].children;
				for(var j= 0; j < Hosos.length; j++)
				{	
					var str1 = Hosos[j].typeShort
					if(str1 == "la:fo1")
					{		
						var array = new ArrayEntry(Hopsos[i], Hosos[j]);
						ArrayInfo[dem] = array;
						dem++;
					}
				}	
			}
		}
		model.data = ArrayInfo;
	}
}
function ArrayEntry(HopSo, HoSo)
{
	this.HopSo = HopSo;
	this.HoSo = HoSo;
}
main();