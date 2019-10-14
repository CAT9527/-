//根据id获取元素
function my$(id){
    return document.getElementById(id);
}
//设置任意元素的中间的文本内容
function setInnnerText(element,text) {
    if(typeof element.textContent=="undefined"){
        element.innerText=text;
    }else{
        element.textContent=text;
    }
}
//获取任意元素的中间的文本内容
function getInnerText(element) {
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }else{
        return element.textContent;
    }
}