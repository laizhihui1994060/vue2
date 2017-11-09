function ConfigPage(){
	this.page = [];
}
ConfigPage.prototype.dataSource = function (data) {
    local.setItem('PAGEROUTE',data);
    this.page = data;
}
ConfigPage.prototype.isExist = function (page) {
    if(this.page.length == 0){
        if( local.getItem('PAGEROUTE') ){
            this.page = JSON.parse(local.getItem('PAGEROUTE'))
        }else{
            return false;
        }
    }

    // if(page[0] == 'UnderSingle')return 'UnderSingle';
    // 
    for(var i = 0;i<this.page.length;i++){
        if(page.length == 1){
            if(this.page[i] == page[0]){
                return this.page[i];
            } 

            if(typeof this.page[i] == 'object'){
                for (var key in this.page[i]) {
                   if(key === 'UnderSingle' && 'UnderSingle' === page[0])return 'UnderSingle';
                   if(key == page[0]) return  key + '/' + this.page[i][key][0] ;
                }
            }
        }else if(page.length >= 2){

            if(typeof this.page[i] == 'object'){

                for (var key in this.page[i]) {

                    if(key == page[0]){
                        for(var j = 0;j<this.page[i][key].length;j++){
                            
                            if(this.page[i][key][j] == page[1])return key + '/' + this.page[i][key][j];

                        }
                    }
                   
                }
            } 
        };
    }
} 
ConfigPage.prototype.returnHome = function(){
    if(this.page.length == 0){

        if( local.getItem('PAGEROUTE') ){
            this.page = JSON.parse(local.getItem('PAGEROUTE'))
        }else{
            return false;
        }
    }
	if(typeof this.page[0] == 'object'){
        for (var key in this.page[0]) {
           if(key === 'UnderSingle') return 'UnderSingle';
           else{
                return  key + '/' + this.page[0][key][0] ;
           }
        }
    }else{
        return this.page[0];
    }
}

ConfigPage.prototype.isAuthority = function(name){
    const roles = JSON.parse(local.getItem('ROLES'));
    if(roles.length > 0){
        return roles.some( (obj, index) => {
            let bool = false;
            if(obj.optCode.length > 0){
                bool = obj.optCode.includes(name);
            }

            if(bool) return true;
        })
    }else{
        return false;
    }
}

ConfigPage.prototype.updatePage = function(page){

	if(local.getItem('PAGEROUTE' ))this.page = JSON.parse(local.getItem('PAGEROUTE' ));
}

ConfigPage.prototype.updateChart = function(bool){
    console.log( this.page )
    if(this.page.indexOf("chart") != -1){

        if( !bool ) this.page.pop();

    }else{
        if( bool ) this.page.push("chart");
    }
        console.log( this.page )
    local.setItem('PAGEROUTE', this.page);

};

global.ConfigPage = new ConfigPage();
