(function(){YAHOO.widget.Chart.SWFURL=Alfresco.constants.URL_CONTEXT+"res/yui/charts/assets/charts.swf";var h="fr.becpg.olap.chart.dashlet",c="query",m="chartType";beCPG.dashlet.OlapChart=function(n){this.id=n;beCPG.dashlet.OlapChart.superclass.constructor.call(this,"beCPG.dashlet.OlapChart",n,["button","container","menu","datasource"]);this.preferencesService=new Alfresco.service.Preferences()};YAHOO.extend(beCPG.dashlet.OlapChart,Alfresco.component.Base,{dataSource:null,saikuUrl:null,saikuUser:null,options:{siteId:"",regionId:""},onChartSelected:function g(o){var n=this;if(o){n.chartPicker.value=encodeURIComponent(o.value);n.preferencesService.set(n.getPreference(c),n.chartPicker.value,{successCallback:{fn:n.onChartClicked(n),scope:this}})}},onChartClicked:function(n){this.loadChartData()},onChartTypeSelected:function g(o){var n=this;if(o){n.chartTypePicker.value=o.value;n.preferencesService.set(n.getPreference(m),n.chartTypePicker.value,{successCallback:{fn:n.render(),scope:this}})}},getPreference:function a(o){var n=this.options;return h+"."+n.regionId+(n.siteId?("."+n.siteId):"")+(o?"."+o:"")},onChartTypeClicked:function d(n){this.render()},onReady:function b(){var n=this;this.chartPicker=new YAHOO.widget.Button(n.id+"-charPicker-button",{type:"split",menu:n.id+"-charPicker-select",lazyloadmenu:true});this.chartTypePicker=new YAHOO.widget.Button(n.id+"-chartTypePicker-button",{type:"split",menu:n.id+"-chartTypePicker-select",lazyloadmenu:false});this.chartPicker.on("click",n.onChartClicked,n,true);this.chartTypePicker.on("click",n.onChartTypeClicked,n,true);this.chartPicker.getMenu().subscribe("click",function(p,o){var q=o[1];if(q){n.chartPicker.set("label",q.cfg.getProperty("text"));n.onChartSelected.call(n,q)}});this.chartTypePicker.getMenu().subscribe("click",function(p,o){var q=o[1];if(q){n.chartTypePicker.set("label",q.cfg.getProperty("text"));n.onChartTypeSelected.call(n,q)}});Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"becpg/olap/chart",successCallback:{fn:n.fillQueries,scope:this},failureCallback:{fn:function(){},scope:this}})},fillQueries:function k(o){var r=this,q=o.json,n=[],s="";if(q!==null){for(var p in q.queries){if(p===0){s=q.queries[p].queryId}n.push({text:q.queries[p].queryName,value:q.queries[p].queryId})}r.chartPicker.getMenu().addItems(n);r.chartPicker.getMenu().render(document.body);r.selectMenuValue(r.chartPicker,encodeURIComponent(s));r.saikuUrl=q.metadata.olapServerUrl;r.saikuUser=q.metadata.currentUserName}r.selectMenuValue(r.chartTypePicker,"barChart");this.preferencesService.request(r.getPreference(),{successCallback:{fn:function(v){var t=Alfresco.util.findValueByDotNotation(v.json,r.getPreference(c),null);if(t!==null){r.selectMenuValue(r.chartPicker,t)}var u=Alfresco.util.findValueByDotNotation(v.json,r.getPreference(m),null);if(u!==null){r.selectMenuValue(r.chartTypePicker,u)}r.loadChartData()},scope:this},failureCallback:{fn:function(){r.loadChartData()},scope:this}})},selectMenuValue:function e(o,q){o.value=q;var p=o.getMenu().getItems();for(var n in p){if(p.hasOwnProperty(n)){if(p[n].value===q){o.set("label",p[n].cfg.getProperty("text"));break}}}},loadChartData:function f(){if(this.chartPicker.value!==null&&this.chartPicker.value.length>0){Alfresco.util.Ajax.request({url:Alfresco.constants.PROXY_URI+"becpg/olap/chart?olapQueryId="+this.chartPicker.value,successCallback:{fn:this.processData,scope:this},failureCallback:{fn:function(){},scope:this}})}},processData:function i(n){this.data=n.json;var p=[];this.columnDefs=[];this.seriesDef=[];this.barChartSeriesDef=[];for(var o in this.data.metadatas){p.push("col"+o);this.columnDefs.push({key:"col"+o,label:this.data.metadatas[o].colName});if(o>0){this.seriesDef.push({displayName:this.data.metadatas[o].colName,yField:"col"+o});this.barChartSeriesDef.push({displayName:this.data.metadatas[o].colName,xField:"col"+o})}}this.dataSource=new YAHOO.util.DataSource(this.data.resultsets);this.dataSource.responseType=YAHOO.util.DataSource.TYPE_JSARRAY;this.dataSource.responseSchema={fields:p};this.render()},render:function j(){if(this.dataSource!==null){if(this.chartTypePicker.value=="lineChart"){new YAHOO.widget.LineChart(this.id+"-chart",this.dataSource,{series:this.seriesDef,xField:"col0",wmode:"opaque",style:{legend:{display:"bottom"}}})}else{if(this.chartTypePicker.value=="barChart"){new YAHOO.widget.BarChart(this.id+"-chart",this.dataSource,{series:this.barChartSeriesDef,yField:"col0",wmode:"opaque",style:{legend:{display:"bottom"}}})}else{if(this.chartTypePicker.value=="columnChart"){new YAHOO.widget.ColumnChart(this.id+"-chart",this.dataSource,{series:this.seriesDef,xField:"col0",wmode:"opaque",style:{legend:{display:"bottom"}}})}else{if(this.chartTypePicker.value=="pieChart"){new YAHOO.widget.PieChart(this.id+"-chart",this.dataSource,{dataField:"col1",categoryField:"col0",wmode:"opaque",style:{legend:{display:"right"}}})}else{if(this.chartTypePicker.value=="chartData"){new YAHOO.widget.DataTable(this.id+"-chart",this.columnDefs,this.dataSource)}}}}}}},openSaikuClick:function l(){if(this.saikuUrl!==null){window.open(this.saikuUrl+"?username="+this.saikuUser)}}})})();