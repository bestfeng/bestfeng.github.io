/*轮播图的JS*/
var timer      = null;
var autoTime   = null;
var ms         = 100;
var autoMs     = 2000;
var iTarget    = 0;
var speed      = 0;
var nextTarget = 0;

window.onload  = function()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    var oUl    = obj.getElementsByTagName("ul")[0];
    var oUlLis = oUl.getElementsByTagName("li");
    var oPrev  = obj.getElementsByTagName("p")[0];
    var oNext  = obj.getElementsByTagName("p")[1];

    oUl.style.width = oUlLis.length * oUlLis[0].offsetWidth + "px";

    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].onmouseover = getIndx;
    }

    obj.onmouseover = function()
    {
        clearInterval(currentTime);
    }
    obj.onmouseout = function()
    {
        if(currentTime)
        {
            clearInterval(currentTime);
        }
        currentTime = setInterval("autoPlay()",autoMs);
    }

    oPrev.onmousedown = fnPrev;
    oNext.onmousedown = fnNext;

    currentTime = setInterval("autoPlay()",autoMs);
    
 
 

    
    //城市的切换
    var oCity=document.getElementById('city');
    var aCityA=oCity.getElementsByTagName('a');

    for (var i = 0; i < aCityA.length; i++) {
        aCityA[i].onclick=function()
        {
            for (var i = 0; i < aCityA.length; i++) {
                aCityA[i].className='';
            }
            this.className='active';

        }
    }

    //hot shop的切换
    var hopAttr=[1,2]
    var oNavUl=document.getElementById('NavLi');
    var aNavLi=oNavUl.getElementsByTagName('li');
    var oHotList=document.getElementById('hot_list');
    var trueImg=oHotList.getElementsByTagName('img');
    for (var i = 0; i < aNavLi.length; i++) {
        aNavLi[i].index=i;
        aNavLi[i].onclick=function()
        {
            for (var i = 0; i < aNavLi.length; i++) {
                aNavLi[i].style.background='#f8f8f8';
            }
            this.style.background='#fff';
            trueImg[0].src='images/content/hot_list_pic'+hopAttr[this.index]+'.gif';
            trueImg[1].src='images/content/hot_list_pic'+hopAttr[this.index]+'.gif';
            trueImg[2].src='images/content/hot_list_pic'+hopAttr[this.index]+'.gif';
            //oBtn.src='images/content/hot_list_pic'+attr[this.index]+'.gif';
        }
    };

    //subway地铁交通的切换
    var oSUBWAYul=document.getElementById('SUBWAYul');
    var aSUBWAYli=oSUBWAYul.getElementsByTagName('li');
    var oSubwayCon=document.getElementById('SUBWAYcon');
    var aSubImg=oSubwayCon.getElementsByTagName('img');

    for (var i = 0; i < aSUBWAYli.length; i++) {
        aSUBWAYli[i].index=i;
        aSUBWAYli[i].onclick=function()
        {
            for (var i = 0; i <aSUBWAYli.length; i++) {
                aSUBWAYli[i].style.background='#f8f8f8';
                aSubImg[0].style.display='none';
                aSubImg[1].style.display='none';
            }
            this.style.background='#fff';
            aSubImg[this.index].style.display='block';
        }
    };

    //BBS论坛的切换
    var oBBSol=document.getElementById('BBSol');
    var aBBSli=oBBSol.getElementsByTagName('li');

    for (var i = 0; i < aBBSli.length; i++) {
        aBBSli[i].onmouseover=function()
        {
            for (var i = 0; i < aBBSli.length; i++) {
                aBBSli[i].className='';
            }
            this.className='active';
        }
    };

    //知道分子的切换
    var oKnowTab=document.getElementById('knowtab');
    var aknowLi=oKnowTab.getElementsByTagName('li');
    var oknowDiv=document.getElementById('knowlist');
    var aknowUl=oknowDiv.getElementsByTagName('ul');

    for (var i = 0; i <aknowLi.length; i++) {
        aknowLi[i].index=i;
        aknowLi[i].onmouseover=function()
        {
            for (var i = 0; i < aknowLi.length; i++) {
                aknowLi[i].className='gradient';
                aknowUl[i].style.display='none';
            };
            this.className='active';
            aknowUl[this.index].style.display='block';
        }
    }

    //抢卷儿的切换
    var oMoneyTabUl=document.getElementById('moneyTab');
    var aMoneyTabLi=oMoneyTabUl.getElementsByTagName('li');
    var oWrapDiv=document.getElementById('wrapSection');
    var aWrapSectionUl=oWrapDiv.getElementsByTagName('ul');

    for (var i = 0; i <aMoneyTabLi.length; i++) {
        aMoneyTabLi[i].index=i;
        aMoneyTabLi[i].onmouseover=function()
        {
            for (var i = 0; i <aMoneyTabLi.length; i++) {
                aMoneyTabLi[i].className='gradient';
                aWrapSectionUl[i].style.display='none';
            }
            this.className='active';
            aWrapSectionUl[this.index].style.display='block';
        }
    }

}
/*轮播图的自动播放*/
// 前一张
function fnPrev()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    nextTarget-=1;
    if(nextTarget < 0){ nextTarget = aLis.length-1; }
    goTime(nextTarget);
}

// 后一张
function fnNext()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");
    nextTarget+=1;
    if(nextTarget === aLis.length){ nextTarget = 0; }
    goTime(nextTarget);
}

// 自动播放
function autoPlay()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");

    nextTarget+=1;
    if( nextTarget >= aLis.length ) { nextTarget = 0; }
    goTime(nextTarget)
}

// 获取当前的索引值
function getIndx()
{
    var obj    = document.getElementById("play");
    var oOl    = obj.getElementsByTagName("ol")[0];
    var aLis   = oOl.getElementsByTagName("li");

    for( var i = 0; i < aLis.length; i+=1 )
    {
        if(aLis[i] === this)
        {
            goTime(i);
        }
    }
}

// 开始启动
function goTime(index)
{
    var obj      = document.getElementById("play");
    var oUl      = obj.getElementsByTagName("ul")[0];
    var oOl      = obj.getElementsByTagName("ol")[0];
    var aLis     = oOl.getElementsByTagName("li");
    var iLiWidth = oUl.getElementsByTagName("li")[0].offsetWidth;

    for( var i = 0; i < aLis.length; i+=1 )
    {
        aLis[i].className = "";
    }
    aLis[index].className = "active";

    iTarget = -index * iLiWidth;

    if(timer){ clearInterval(timer); }
   timer = setInterval("doMove("+ iTarget +")",ms)
   doMove(iTarget);
}

// 图片滑动
function doMove(target)
{
   var obj = document.getElementById("play");
    var oUl = obj.getElementsByTagName("ul")[0];

    oUl.style.left = speed + "px";
    speed+=(target - oUl.offsetLeft)/3;

    if( Math.abs(target-oUl.offsetLeft) === 0 )
    {
        oUl.style.left = target + "px";
        clearInterval(timer); timer = null;
    }
}