export {uncodeRemind,uncodeRepeat,changePosition,setValue}
function uncodeRemind (val){
    return val;
}
function uncodeRepeat (val){
    return val;
}
function changeSelectedStyle(target,mode,date){
    let $elem;
    $('.fc-current-selected-event').removeClass("fc-current-selected-event")
    $('.fc-current-selected-day').removeClass("fc-current-selected-day")
    if( mode === "event" ){
        $elem = $(target)
        $elem.addClass("fc-current-selected-event")
    } else {
        $elem = $('[data-date=' + date + ']:eq(0)')
        $elem.addClass("fc-current-selected-day")
    }
}
function changePosition(jsEvent,dayOrEvent,date) {
    var tar = jsEvent.target || jsEvent.srcElement;
    const newTaget = dayOrEvent==="event"?jsEvent.currentTarget:jsEvent.originalEvent.target;
    var scrollTop = window.scrollY;
    var top = jsEvent.clientY + scrollTop - 25;
    var left = jsEvent.clientX + 30;
    var tmp = $(".newEvent")[0];
    tmp.style.display = "block";
    var width = tmp.offsetWidth; //弹出框的宽度
    var height = tmp.offsetHeight; //弹出框的高度
    var bodyWidth = document.body.clientWidth || document.documentElement.clientWidth; //当前浏览器可视宽度
    var bodyHeight = document.body.clientHeight || document.documentElement.clientHeight; //当前浏览器可视高度
        
    // top = jsEvent.clientY + scrollTop - 25;
    // left = jsEvent.clientX + 30;

    var leftOrNot = (bodyWidth - left < width); //true在左边显示
    var topOrNot = (bodyHeight - (top - scrollTop) < height); //true在上边显示
    changeSelectedStyle(newTaget, dayOrEvent,date)
    // console.log(leftOrNot,topOrNot);

    // 偏左不偏上
    if (leftOrNot && !topOrNot) {
        console.log("太右了")
        left = left - width - bodyWidth*0.04;
        console.log(tar,tar.offsetWidth)
        $(".triangle")[0].style.top = 20 + "px";
        $(".triangle")[0].style.left = (250 - 8) + "px";
        $(".triangle").addClass("rotate");

    // 偏上不偏左
    } else if (topOrNot && !leftOrNot) {
        console.log("到底了")
        top = top - height + 60; //40头部数据的高度 
        $(".triangle")[0].style.top = (height - 40) + "px";
        $(".triangle")[0].style.left = - 6 + "px";
        $(".triangle").removeClass("rotate");
    // 偏左上
    } else if (leftOrNot && topOrNot) {
        console.log("右下角")
        left = left - width - bodyWidth*0.04;
        console.log(tar,tar.offsetWidth)
        top = top - height + 60; //60头部数据的高度  
        $(".triangle")[0].style.top = (height - 40) + "px";
        $(".triangle")[0].style.left = (250 - 8) + "px";
        $(".triangle").addClass("rotate");
    // 偏右下
    } else if (!leftOrNot && !topOrNot) {
        console.log("正常")
        $(".triangle")[0].style.top = 20 + "px";
        $(".triangle")[0].style.left = - 6 + "px";
        $(".triangle").removeClass("rotate");
    }
    if (left !== 0 && top !== 0) {
        tmp.style.left = left + "px";
        tmp.style.top = top + "px";
    }
}
function setValue(title,start,end,repeat,remind){
	$(".choose").find("textarea").val(title);
	$("[name='start']").val(start);
	$("[name='end']").val(end);
	$("[name='repeat']").html(repeat);
	$("[name='remind']").val(remind);
}
