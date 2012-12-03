/*配列クラスにcontains関数追加
  array.contains(element)
  arrayにelementがあればtrueそうでなければfalseを返す
*/
Array.prototype.contains = function( value ){
            for(var i in this){
                if( this.hasOwnProperty(i) && this[i] === value){
                    return true;
                }
            }
            return false;
        }

var postIdArray = new Array();

/*ツイートをjson形式で取得
　取得したツイートは配列dataとしてfirstTweets関数に渡される。
　dataのインデックスの若い番号から新しいツイートが入っている。
*/
$(function(){
	$("#slide").empty();
	$.getJSON('http://search.twitter.com/search.json?callback=?',
		{
			q: keyword,
			show_user: true,
			rpp:10
		},
		firstTweets);
	return false;
});

//ツイートを取得したらこいつが呼ばれる
function firstTweets(data,status){
	if(status=="success"){
		//#slide領域にul要素追加
		$("#slide").append("<ul></ul>");
		//BOTやRTや既に取得したツイートを削除(既に取得したツイートの削除はありえないけどめんどくさいから一本化)
		var NewData = data.results.filter(isBOTorRTorOLD);
		NumberOfFirstTweets = NewData.length;
		for(var i=0;i<NumberOfFirstTweets;i++){
			//取得したツイートを綺麗な形（？）にする
			var profileImageUrl = NewData[i].profile_image_url;
			var text = NewData[i].text;
			var user = NewData[i].from_user;
			var created = NewData[i].created_at;
			var source = NewData[i].source;
			var userProfile = "http://twitter.com/#!/"+user;
			var postId = NewData[i].id_str;
			var permaLink = "http://twitter.com/#!/"+user+"/status/"+postId;
			var tweet = "<p class='icon'><a href='"+userProfile+" ' target='_blank'><img src='"+profileImageUrl+"' / alt='"+user+"' /></a></p><div class='wrapper'><p class='user'><a href='"+userProfile+"' target='_blank'>"+user+"</a></p><p class='text'>"+text+"<br>"+"postId:"+postId+"</p><p class='created'><a href='"+permaLink+"' target='_blank'>"+created+"</a></p></div>";
			/*ul領域にli要素を追加する。li要素はそれぞれidを持ち
			  id = "liid+(そのツイートが何番目か)"
			  となっている
			 */
			$("#slide > ul").append("<li id='liid"+i+"'></li>");
			$("#liid"+i).append(tweet);
			//取得したツイートのid_strを記録
			postIdArray[i]=postId;
			
		}
		//隠すための領域をul領域に追加
		$("#slide > ul").append("<div id='fade'></div>");
		//スライドの実行
		slide();
	}else{
		alert("処理に失敗しました");
	}
}


//BOT, RT, 既に取得したツイートをはじく関数
function isBOTorRTorOLD(element){
	return !((element.text.indexOf("RT ")!=-1) || (element.from_user.indexOf("bot")!=-1) || (element.from_user.indexOf("unk") != -1) || postIdArray.contains(element.id_str))
}

