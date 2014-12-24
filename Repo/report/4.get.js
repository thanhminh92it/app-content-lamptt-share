function main()
{
	var Nodec1s = companyhome.childAssocs["sla:c1s"];
	var gens = search.luceneSearch("TYPE:\"{http://www.alfresco.org/model/content/1.0}person\"");
	model.gens = gens;
	model.person = person;
	if(Nodec1s == null)
	{
		status.code = 404;
	    status.message = "Khong co du lieu";
	    status.redirect = true;
	}
	else
	{	
		if(args.datefrom != null && args.dateto != null)
		{
			var strdate = args.datefrom.split('/');
			var datefrom = new Date(strdate[2],(parseInt(strdate[1]) - 1), strdate[0]);
			var longdatefrom = datefrom.getTime();
			strdate = args.dateto.split('/');
			var dateto= new Date(strdate[2],(parseInt(strdate[1]) - 1), strdate[0]);
			var longdateto = dateto.getTime();
			var VanBanA4 = 0;
			var VanBanDuocNhapLieu = 0;
			for(var i = 0; i < Nodec1s.length; i++)
			{	
				if(Nodec1s[i].properties["sla:c10"] == args.user)
				{
					var Nodec2s = Nodec1s[i].childAssocs["sla:c2s"];
					for(var j = 0; j < Nodec2s.length ; j++)
					{
						if(longdatefrom <= Nodec2s[j].properties["sla:c20"] && longdateto >= Nodec2s[j].properties["sla:c20"])
						{
							VanBanA4++;
							VanBanDuocNhapLieu++;
						}
					}
				}
			}
			model.VanBanA4 = VanBanA4;
			model.VanBanNhapLieu = VanBanDuocNhapLieu;
		}
	}
}

main();