
class localData {
    constructor(name) { //构造函数
          this.localData = window.localStorage ? window.localStorage : window.sessionStorage;
    }

    setItem(attr,value) {
      	var value;

		switch(typeof value)
		{
		case 'array':
		   value = value.toString();
		  break;
		case 'object':
		   value = JSON.stringify(value);
		  break;
		default:
		  value = value;
		}

		this.localData.setItem(attr,value);
    }
    getItem(attr){

		return this.localData.getItem(attr) ? this.localData.getItem(attr) : '';
    }

    removeItem(attr){
    	return this.localData.removeItem(attr)
    }

    clearItem(){
    	this.localData.clear() ;
    }
}
window.local = new localData();

