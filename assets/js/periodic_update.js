var speed = 500;

//新規のツイートを取得。時間帯によって取得する件数を変える。適当に決めた。
var periodic_update = function(){
	var num = 0;
	var time = new Date();
	if((time >= 0) && (time < 6)) num = 20;
	else if((time >=6) && (time < 8)) num = 25;
	else if((time >= 8) && (time < 12)) num = 20;
	else if((time >= 12) && (time < 13)) num = 30;
	else if((time >=13) && (time < 17)) num = 20;
	else if((time >= 17) && (time < 23)) num = 35;
	else num = 20;
	$.getJSON('http://search.twitter.com/search.json?callback=?',
	{
		q: keyword,
		show_user: true,
		rpp: num
	},getNewTweet);
}

//新規のツイートが取得されると呼び出される
function getNewTweet(data,status){
	if(status=="success"){
		var NewData = data.results.filter(isBOTorRTorOLD);	//BOTやRTや既に取得したツイートを削除
		var NumberOfNewTweets = NewData.length;		
		if(NumberOfNewTweets !=0) {
			var ullength = $("#slide > ul > li").size();
			//既に取得したツイートのidを新しく取得した数だけ上に繰り上げる
			for(var j=ullength-1;j>=0;j--){
				$("#liid"+j).attr('id',"liid"+(j+NumberOfNewTweets));
			}
			//新規に取得したツイートを表示していく。dataには新しい順にツイートが入っているので古いツイートから表示させる。
			for(var i=NumberOfNewTweets-1;i>=0;i--){
				//表示形式を作る
				var postId = NewData[i].id_str;
				var profileImageUrl = NewData[i].profile_image_url;
				var text = NewData[i].text;
				var user = NewData[i].from_user;
				var created = NewData[i].created_at;
				var source = NewData[i].source;
				var userProfile = "http://twitter.com/#!/"+user;
				var permaLink = "http://twitter.com/#!/"+user+"/status/"+postId;
				var tweet = "<p class='icon'><a href='"+userProfile+" ' target='_blank'><img src='"+profileImageUrl+"' / alt='"+user+"' /></a></p><div class='wrapper'><p class='user'><a href='"+userProfile+"' target='_blank'>"+user+"</a></p><p class='text'>"+text+"<br>postid: "+postId+"</p><p class='created'><a href='"+permaLink+"' target='_blank'>"+created+"</a></p></div>";
				$("#slide > ul").prepend("<li id='liid"+i+"'></li>");	//新しくli要素を追加する。一番上に表示させたいのでprependを使う
				$("#liid"+i).append(tweet);
			
				/*
					スライドさせる。
					原理的にはslide関数と同じ。
					今回はスライドがツイート一個だけなのでloopはなし。
					マウスが乗っても止まらない。
					slide関数を使いたかったけど無理だった。
				*/

				var selector = $("#liid"+i);
				$("#slide > ul").css('margin-top', ((selector.get(0).offsetHeight+1) * -1)+'px');
				var mBottom = parseInt(selector.css('margin-bottom'));
				$("#slide > ul").animate({
					marginTop :  parseInt($("#slide > ul").css('margin-top'))+(selector.get(0).offsetHeight+mBottom+1)+'px'
				},speed);

				//新しいツイートを記録
				postIdArray.unshift(postId);
			
				//一番古いツイートを削除。配列からも削除
				$("#liid"+postIdArray.length-1).remove();
				postIdArray.pop();
			}

		}
		else return;
	}
}


