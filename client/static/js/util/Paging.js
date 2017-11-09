

function Paging() {

	this.searchUrl = "";
	this.ajaxMethod = 'get';
	this.formDate = {
	    field:{
	        fieldName:'',
	        sort:''
	    }
	};
}

Paging.prototype.setSearchUrl = function(url, type, params,no) {
	this.searchUrl = url;
	if(type) this.ajaxMethod = type;
	if(params) this.formDate = params;
	if(no) this.no = no; 
};

Paging.prototype.search = function(type, callback) {
	var that = this;

	if(that.formDate[type].pageSize && that.formDate[type].pageSize == 10) that.formDate[type].pageSize = 15;
	if (!this.searchUrl) return callback("请设置查找的url");
	let _testParam = {
		url: that.searchUrl,
		type: that.ajaxMethod,
		param: that.ajaxMethod != 'get' ? that.formDate[type] : {},
		no:this.no
	}

	send(_testParam, function(err, res){
	console.log( _testParam );
		
		console.log(err,res)
		callback && callback(err, res);
	})
}

Paging.prototype.setDataForm = function(dataForm) {
	if(dataForm && dataForm instanceof Object){
		for(var i in dataForm){
			if(dataForm[i]){
				this.formDate[i] = dataForm[i];
			}else{
				throw "dataForm 的" + i + "属性不存在";
			}
		};
	}else{
		throw "dataForm 不存在 或者 dataForm 不是对象";
		console.log(this.formDate)
	}
	
	return this.formDate;
}

Paging.prototype.setSort = function(fieldName,event,bool){
	var ev = ev || event;
	bool ? this.formDate.condition_server.param.fieldName = fieldName : this.formDate.condition_server.fieldName = fieldName;
    bool ? this.formDate.condition_server.param.sort = this.formDate.condition_server.param.sort == 'desc' ? 'asc' : 'desc' : this.formDate.condition_server.sort = this.formDate.condition_server.sort == 'desc' ? 'asc' : 'desc';
   	$(ev.target.parentNode.children).each(function(index, el) {
   		if(el.className && el.className != 'checkbox checkboxHr')el.className = 'sort';
   	});
    bool ? ev.target.className = this.formDate.condition_server.param.sort == 'desc' ? 'asc' : 'desc' : ev.target.className = this.formDate.condition_server.sort == 'desc' ? 'asc' : 'desc';
};


Paging.prototype.resetFormDate = function(date){
	this.formDate[date] = {};
}

Paging.isEmptyObject = function(obj){
    for(var n in obj){return false} ;
    return true; 
}


module.exports = Paging;

