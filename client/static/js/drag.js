//usual
import message_usual_right from "../../src/assets/message_usual_right.png";
import message_usual_left from "../../src/assets/message_usual_left.png";
import messga_box_usual_right from "../../src/assets/messga_box_usual_right.png";
import messga_box_usual_left from "../../src/assets/messga_box_usual_left.png";

import message_bg_left from "../../src/assets/message_bg_left.png";
import message_bg_right from "../../src/assets/message_bg_right.png";


function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
};



//不限制范围的拖拽
function Drag(element) {
    console.log( element )
    var _this = this;
    this.move = 'mousemove' ;
    this.oDiv = element;
    this.disX = 0;
    this.disY = 0;
    this.fome = null;
    this.oDiv.addEventListener('mousedown',function(ev){
        _this.fnDown(ev)
        ev.preventDefault();
    },false);

};
Drag.prototype.fnDown = function (ev) {
    if(ev.target != $('.jingl')[0] )return;

    var _this = this;
    var ev = ev || event;
    this.fome = function (ev){
        _this.fnMove(ev);
        return false
    };
    this.disX = ev.clientX  - this.oDiv.offsetLeft;
    this.disY = ev.clientY - this.oDiv.offsetTop;
    this.check = true;
    this.checkMove = [];
    
    if( getStyle(this.oDiv,'transition') != 'all 0s ease 0s') this.oDiv.style.transition = 'all 0s ease 0s';

    document.addEventListener(this.move,_this.fome,false); 
    document.addEventListener('mouseup',function(){
        _this.fnUp();
    },false); 
};
Drag.prototype.fnUp = function () {
    document.removeEventListener('mouseup',this.fnUp,false);
    document.removeEventListener(this.move,this.fome,false);

};
Drag.prototype.fnMove = function (ev) {
    var ev = ev || event
    this.oDiv.style.left = ev.clientX  - this.disX + "px";
    this.oDiv.style.top = ev.clientY - this.disY + "px";
};





//限制范围的拖拽
function Drag2(id) {

    Drag.call(this, document.querySelector(`#${id}`));
};
for (var i in Drag.prototype) {
    Drag2.prototype[i] = Drag.prototype[i];
};
Drag2.prototype.fnMove = function (ev) {
    this.checkMove.push(ev.clientX);

    this.hasMove =true;

    var ev = ev || event;
    var X = ev.clientX - this.disX;
    var Y = ev.clientY - this.disY;
    this.X = X;
    if (X < 15) X = 0;
    if ((X + 15) > this.oDiv.parentNode.offsetWidth - this.oDiv.offsetWidth) X = this.oDiv.parentNode.offsetWidth - this.oDiv.offsetWidth;
    if (Y < 0) Y = 0;
    if (Y > document.documentElement.clientHeight - this.oDiv.offsetHeight) Y = document.documentElement.clientHeight - this.oDiv.offsetHeight;
    this.oDiv.style.left = X + "px";
    this.oDiv.style.top = Y + "px";

    $(this.oDiv).find('.notification').hide();
    // $(this.oDiv).find('.Details_wrap').css({
    //     display:'none'
    // });

    if(this.X > document.documentElement.clientWidth/2){
        $(this.oDiv).find('jingl').attr('src',message_usual_right);
       
        $(this.oDiv).find('.notification').css({
            background:'url('+ messga_box_usual_right +')',
            left:'-187px',
        });

        $('.Details_wrap > ul').css({
            background:'url('+ message_bg_right +') -11px 0 /  142px 209px',
            float:'right',
            padding:' 13px 7px 0 0'

        });

        $('.Details').css({
            boxShadow:'-5px 5px 7px rgba(0,0,0,.23)'
        });

        $('.Details_wrap').css({
            left:'-303px',
        });

        $('#message .delect').css({
            left:'15px'
        });
  


    }else{
        $(this.oDiv).find('jingl').attr('src',message_usual_left);
        

        $(this.oDiv).find('.notification').css({
            background:"url(" + messga_box_usual_left + ")",
            left:'-5px'
        });


        $('.Details_wrap > ul').css({
            background:'url('+ message_bg_left +') 6px 0px / 143px 209px',
            float:'left',
            padding:'13px 0 0 7px'
        });
        $('.Details_wrap').css({
            left:'-12px'
        })
        $('.Details').css({
            boxShadow:'5px 5px 7px rgba(0,0,0,.23)'
        });


        $('#message .delect').css({
            right:'22px'
        });
    };


};

Drag2.prototype.fnUp = function () {
    if( !this.check) return;
    if(this.checkMove.length&&this.checkMove.length !=1 ){
      
        this.oDiv.style.transition = 'all .1s';

        $(this.oDiv).find('.notification').hide();

        if( this.X > document.documentElement.clientWidth/2 ){
            this.oDiv.style.left = this.oDiv.parentNode.offsetWidth - this.oDiv.offsetWidth - 15 + 'px';
        }else{
            this.oDiv.style.left = '15px';;
        }

    }else{
        
        $('.Details_wrap').toggle();
    }

    document.removeEventListener('mouseup',this.fnUp,false);
    document.removeEventListener(this.move,this.fome,false);

    this.hasMove=false;
    this.check = false;

};

export {Drag2};
