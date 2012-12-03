$(function(){
	var global_data;
	var global_status="test";
	var keyword = "うんこなう"+" lang:ja"; //入力キーワード( +lang:ja)
	$.getJSON('http://search.twitter.com/search.json?callback=?',
		{
			q: keyword, //検索クエリ
			show_user: true, //ユーザー名表示
			rpp:100 //100件まで取得
		},function(data,status){
			$("#slide").append(global_status);
			$("#slide").append("<ul></ul>")
			for(var i=0;i<3;i++){
				$("#slide > ul").append("<li id='liid"+i+"'></li>");
				$("#liid"+i).append(
					"このスライドは最後の子要素まで進むと止まります。<br />",
					"たぶん止まります。<br />",
					"止まってください。"
				);
			}
			$("#slide > ul").append("<div id='fade'></div>");
			slide();
		});
});