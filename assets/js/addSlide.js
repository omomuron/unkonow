var addSlide = function(selector, count){
	var time = 2000;	//切り替えのタイミング
	var speed = 500;	//スライドスピード
	var slideLi = $(selector);
	var slideUl = $("#slide > ul");
	//selectorの高さ分を上にずらす
	alert("slideLi.get(0).offsetHeight = "+slideLi.get(0).offsetHeight);
	slideUl.css('margin-top', '-'+slideLi.get(0).offsetHeight+'px');
	//alert("parseInt(slideUl.css('margin-top')) = "+parseInt(slideUl.css('margin-top')));
	//Sleep(1000);
	//リストのmargin
	var mBottom = parseInt(slideLi.css('margin-bottom'));
	var timer = setInterval(loop, time);
	//ループ処理
	//var marginafter =  parseInt(slideUl.css('margin-top'))+(slideLi.get(0).offsetHeight+mBottom+1)+'px'
	function loop() {
	//最後のリストまで繰り返す
		if(0 <= count) {
			slideUl.animate({
				marginTop :  parseInt(slideUl.css('margin-top')) + (slideLi.eq(count).offsetHeight+mBottom+1)+'px'
			},speed);
		} else {
			//最後まできたらループ終了
			clearInterval(timer);
		}
		count--;
	}
	
	//マウスオーバーでストップ
	slideUl.hover(
		function(){
			if(0 <= count) clearInterval(timer);
		},
		function () {
			if(0 <= count) timer = setInterval(loop, time);
		}
	);	
}

function Sleep( T ){ 
   var d1 = new Date().getTime(); 
   var d2 = new Date().getTime(); 
   while( d2 < d1+T ){    //T秒待つ 
       d2=new Date().getTime(); 
   } 
   return; 
} 
Sleep( 1 );//1秒待つ 