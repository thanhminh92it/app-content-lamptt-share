(function(){var a=Alfresco.util.hasEventInterest;beCPG.custom.RuleConfigActionCustom=function(b){beCPG.custom.RuleConfigActionCustom.superclass.constructor.call(this,b);this.name="beCPG.custom.RuleConfigActionCustom";Alfresco.util.ComponentManager.reregister(this);this.customisations=YAHOO.lang.merge(this.customisations,beCPG.custom.RuleConfigActionCustom.superclass.customisations);this.renderers=YAHOO.lang.merge(this.renderers,beCPG.custom.RuleConfigActionCustom.superclass.renderers);return this};YAHOO.extend(beCPG.custom.RuleConfigActionCustom,Alfresco.RuleConfigAction,{customisations:{VersionCleaner:{text:function(d,c,b){c.parameterValues=c.parameterValues||{};c.parameterValues.versionType=this.msg("label.version-cleaner."+c.parameterValues.versionType);if(c.parameterValues.numberOfVersion!=null){c.parameterValues.numberOfVersion=this.msg("label.version-cleaner.message.numberOfVersion",c.parameterValues.numberOfVersion)}if(c.parameterValues.numberOfDay!=null){c.parameterValues.numberOfDay=this.msg("label.version-cleaner.message.numberOfDay",c.parameterValues.numberOfDay)}if(c.parameterValues.numberByDay!=null){c.parameterValues.numberByDay=this.msg("label.version-cleaner.message.numberByDay",c.parameterValues.numberByDay)}return d},edit:function(d,c,b){this._hideParameters(d.parameterDefinitions);d.parameterDefinitions.push({type:"arca:versioncleaner-dialog-button",_buttonLabel:this.msg("button.options")});return d}}},renderers:{"arca:versioncleaner-dialog-button":{manual:{edit:true},currentCtx:{},edit:function(g,f,c,d,e){this._createButton(g,f,c,d,function b(h,i){this.renderers["arca:versioncleaner-dialog-button"].currentCtx={configDef:i.configDef,ruleConfig:i.ruleConfig};if(!this.widgets.versionCleanerForm){this.widgets.versionCleanerForm=new Alfresco.module.RulesVersionCleanerAction(this.id+"-versionCleanerForm");YAHOO.Bubbling.on("vcleanerConfigCompleted",function(n,m){if(a(this.widgets.versionCleanerForm,m)){var l=m[1].options;if(l!==null){var k=this.renderers["arca:versioncleaner-dialog-button"].currentCtx;this._setHiddenParameter(k.configDef,k.ruleConfig,"versionType",l.versionType);this._setHiddenParameter(k.configDef,k.ruleConfig,"numberOfVersion",l.numberOfVersion);this._setHiddenParameter(k.configDef,k.ruleConfig,"numberOfDay",l.numberOfDay);this._setHiddenParameter(k.configDef,k.ruleConfig,"numberByDay",l.numberByDay);this._updateSubmitElements(k.configDef)}}},this)}var j=this._getParameters(i.configDef);this.widgets.versionCleanerForm.showDialog({versionType:j.versionType,numberOfVersion:j.numberOfVersion,numberOfDay:j.numberOfDay,numberByDay:j.numberByDay})})}}}})})();