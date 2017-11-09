/**
 * 控制表格变动
 */

var tableResize = {};
tableResize.init = function (id, listOptions) {
    let self,
        table = document.getElementById(id),
        header = table.rows[0],
        length = header.cells.length;

    let tableWidth = table.querySelector('thead').offsetWidth;
    console.log(header.cells, length);
    for (let i = 0; i < length; i++) {
        if(i < length - 1){
            if(header.cells[i].nextSibling.nodeName == 'TH'){
                header.cells[i].onmousedown = function () {
                    self = this;
                    tableWidth = table.offsetWidth;
                    console.log(tableWidth);
                    console.log(self.width)
    
                    if (event.offsetX > self.offsetWidth - 10) {
                        global.isResizeTable = true;
                        header.nowTh = self;
                        self.mouseDown = true;
                        self.oldX = event.x;
                        self.oldWidth = self.width && self.width.indexOf('%') != -1 ? self.width : self.offsetWidth;
                        self.nextSibling.oldWidth = self.nextSibling.width && self.nextSibling.width.indexOf('%') != -1 ? self.nextSibling.width : self.nextSibling.offsetWidth;
                        setMouse(self, listOptions, tableWidth);
                    }
                    event.preventDefault();
                };
                // 样式
                header.cells[i].onmousemove = function(){
                    if (event.offsetX > this.offsetWidth - 10) {
                        this.style.cursor = 'col-resize';
                    } else {
                        this.style.cursor = 'default';
                    }
                }
            }
            
        }

        
    }
};

export default tableResize;


function setMouse(self, listOptions, tableWidth){

    const values = listOptions ? listOptions.value.values : '';


    document.onmousemove = function (event) {

        if (self.mouseDown != null && self.mouseDown == true) {
            self.style.cursor = 'default';

            let width = (self.oldWidth.toString().indexOf('%') != -1 ? tableWidth / 100 * parseFloat(self.oldWidth) : self.oldWidth ) + (event.x - self.oldX);
            if ( width > 0) {
                const parentOldWidth = self.parentElement.nowTh.nextSibling.oldWidth;
                if(!parentOldWidth) return;
                const parentWidth = ( parentOldWidth.toString().indexOf('%') != -1 ? tableWidth / 100 * parseFloat(parentOldWidth) : parentOldWidth  ) - (event.x - self.oldX);
                if(!( width < 40 || parentWidth  < 40)){
                    self.width = width / tableWidth * 100 + '%';
                    self.parentElement.nowTh.nextSibling.width = parentWidth / tableWidth * 100 + '%';
                }
                
            }
        }
        event.preventDefault();
    };
    document.onmouseup = function(e){
        document.onmousemove = document.onmouseup = null;
        // const routerName = window.location.hash.split('/');
        let currentIndex = '',
            nextSiblingIndex = '';
        if(values){
            values.some((item,index)=>{
                if(item.desc.indexOf(self.innerHTML) != -1){
                    currentIndex = index;
                    return true;
                }
            });
            values.some((item,index)=>{
                if(item.desc.indexOf(self.parentElement.nowTh.nextSibling.innerHTML) != -1 ){
                    nextSiblingIndex = index;
                    return true;
                }
            });
            console.log(nextSiblingIndex);

            values[currentIndex]['thWidth'] = self.offsetWidth / tableWidth *100 + '%';
            values[nextSiblingIndex]['thWidth'] =  self.parentElement.nowTh.nextSibling.offsetWidth / tableWidth *100 + '%';
    
    
            console.log( listOptions );
    
            send({
                url: 'client:/sys/param/user',
                type: 'put',
                param: listOptions
            }, function(err, res){
                console.log(err,    res);
            });
        }
        
        
        self.mouseDown = false;
        setTimeout( () => {
            global.isResizeTable = false;
        },300);
        return;
    }

};