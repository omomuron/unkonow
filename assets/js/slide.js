/*
	ここでは取得したツイートをスライドさせる。
	まずulのmagintopにネガティブな値を設定しツイートを隠す。
	次にliの高さ（つまり表示するツイートの縦の長さ）分だけ下にずらす。	
	それを繰り返す。
	またスライド上にマウスが重なると止まる。
*/

var slide = function(){
	var time = 3000;	//切り替えのタイミング
	var speed = 900;	//スライドスピード
	var slideUl = $('#slide > ul');
	var slideList = $(' li ' , slideUl);
	//ulの高さ分を上にずらす
	slideUl.css('margin-top', (-1*slideUl.get(0).offsetHeight)+'px');
	//リストのmargin
	var mBottom = parseInt(slideList.css('margin-bottom'));
	var count = slideList.length-1;
	var timer = setInterval(loop, time);
	//ループ処理
	function loop() {
	//最後のリストまで繰り返す。
		if(0 <= count) {
			slideUl.animate({
				marginTop :  parseInt(slideUl.css('margin-top'))+(slideList.eq(count).get(0).offsetHeight+mBottom+1)+'px'
			},speed);
		} else {
			//最後まできたらループ終了
			//ここから新しいツイートを定期的に取得していく。
			$("body").everyTime(22000,periodic_update);
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


/*--- ここにperiodic_updateを定義するとslide関数が読み込まれない ---*/

/*--- smartupdater.js はうまくいかない ---
var periodic_update = function(){
        $("#slide").smartupdater(
          {
            url:'assets/sample.json',
            minTimeout: 1000,
            //dataType:'json'
          }, function(data){
            alert(0);
            //$("#slide").append(0);
          }
        );
    }
      
*/
