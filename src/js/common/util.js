/**
 * Created by Administrator on 2017/9/11.
 */
module.exports = function (key){
    var str = location.search;
    str = str.slice(1);
    var strArr = str.split("&");
    var strObj = {};
    for(var i=0;i<strArr.length;i++){
        var temp = strArr[i].split("=");
        strObj[temp[0]] = temp[1];
    }
    return key?strObj[key]:strObj;
};


