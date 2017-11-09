/**
 * Created by Administrator on 2015/7/29.
 */
/**
 * 随机生成对象
 * */
var _random = {
    randomColor: function () {
        var _arrColor = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        var _color = "";
        for (var i = 0; i < 6; i++) {
            var number = Math.ceil(Math.random() * 16) - 1;
            _color += _arrColor[number];
        }
        return _color;
    },
    randomId: function (length) {
        var _id = "";
        var arrChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        for (var i = 0; i < length; i++) {
            _id += arrChar[Math.ceil(Math.random() * 61)];
        }
        return _id;
    },
    randomCode:function(len){
        var code = "";
        var arrChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (var i = 0; i < len; i++) {
            code += arrChar[Math.floor(Math.random() * 10)];
        }
        return code;
    }
}
module.exports = _random;