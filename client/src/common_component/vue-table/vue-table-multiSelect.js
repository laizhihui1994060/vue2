export default {
    // 多条件 
    deleteNowBtns(item, index){
        console.log(item, index);
        this.filterBtns_2.push( item  );

        this.nowBtns.splice(index, 1);
        this.nowBtns.forEach( (obj, index) => { 
            obj.updataKey = Math.random();
        })
    },
    addNowBtns(item, index){
        console.log(item, index);
        this.nowBtns.push(item );
        this.filterBtns_2.splice(index, 1);
    }
}