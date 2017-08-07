window.onload = function(){
    // 获取元素
    var box = document.getElementById("box");
    var screen = document.getElementById("screen");
    var imgWidth = screen.offsetWidth;
    var ul = screen.children[0];
    var ulLis = ul.children;
    var ol = document.getElementById("lis");
    var olLis = ol.children;
    var arr = document.getElementById("arr");
    var arrLeft = document.getElementById("arrLeft");
    var arrRight = document.getElementById("arrRight");
    //olLis单击事件
    for(var i=0;i<olLis.length;i++){
        olLis[i].setAttribute("index",i);
        olLis[i].onclick = function(){
            // 变色
            for(var j=0;j<olLis.length;j++){
                olLis[j].removeAttribute("class");
            }
            this.setAttribute("class","current");
            // 变图
            var target = -this.getAttribute("index")*imgWidth;
            animate(ul,target);
            picIndex = this.getAttribute("index");
            olIndex =this.getAttribute("index");
        }
    }
    // 鼠标移入移出
    box.onmouseover = function(){
        arr.style.display = "block";
    }
    box.onmouseout = function(){
        arr.style.display = "none";
    }
    // 焦点单击
    // picIndex记录图片滚动个数
    // olIndex记录ol下标
    var picIndex = 0;
    var olIndex = 0;
    // 增加图片，实现无缝轮播
    ul.appendChild(ulLis[0].cloneNode(true));

    arrRight.onclick = function(){
        // 换图
        if(picIndex == ulLis.length-1){
            picIndex = 0;
            ul.style.left = 0;
        }
        picIndex++;
        var target = -picIndex*imgWidth;
        animate(ul,target);
        // ol变化
        for(var i=0;i<olLis.length;i++){
            olLis[i].removeAttribute("class");
        }
        if(olIndex<olLis.length-1){
            olIndex++;
        }else{
            olIndex=0;
        }
        olLis[olIndex].setAttribute("class","current");
      }
    arrLeft.onclick = function(){
        // 换图
        if(picIndex == 0){
            picIndex = ulLis.length-1;
            ul.style.left = -picIndex*imgWidth+"px";
        }
        picIndex--;
        var target = -picIndex*imgWidth;
        animate(ul,target);
        // ol变化
        for(var i=0;i<olLis.length;i++){
            olLis[i].removeAttribute("class");
        }
        if(olIndex>0){
            olIndex--;
        }else{
            olIndex=olLis.length-1;
        }
        olLis[olIndex].setAttribute("class","current");
      }
    // animate函数
    function animate(obj,target){
        // 清除所有计时器
        clearInterval(obj.timer);
        // 建立计时器
        obj.timer = setInterval(function(){
            var current = obj.offsetLeft;
            var step = target>current?10:-10;
            current += step;
            if(Math.abs(target-current)<Math.abs(step)){
                clearInterval(obj.timer);
                obj.style.left = target+"px";
            }else{
                obj.style.left = current+"px";
            }    
        },10)
    }
}