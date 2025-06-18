var audio = new Audio("jihou.mp3");
var audio_flag = (new Date()).getHours();

var index_r = 90;//角度
var index_ctx;
var index_l;
var index_y = 0;//描画初期点y固定
var index_x = 0;//描画初期点x
var index_y1;
var index_y2;
var index_y3;

//要素のサイズ指定チェック
var index_size = true;
var index_canvas = document.getElementById("index");
if(index_canvas.width == 300 && index_canvas.height == 150){
	index_size = false; //canvas要素のサイズ指定無し
}

document.onmousedown = function (e){
	if(!e) e = window.event; // レガシー

	// 出力テスト
	audio.play();
};


var index_id = setInterval(index_drow, 43);


function index_drow(){
	if(audio_flag != (new Date()).getHours()){
		audio.play();
	}
	audio_flag = (new Date()).getHours();

	if(!index_size){
		index_canvas.width = window.innerWidth - 20;
		index_canvas.height = window.innerHeight - 20;//最大化
	}
	index_l = index_canvas.width;
	index_y = (index_canvas.height - index_l) / 2;
	if(index_canvas.width > index_canvas.height){//横長画面
		index_l = index_canvas.height;
		index_x = (index_canvas.width - index_l) / 2;//内接センタリング位置
		index_y = 0;
	}
	index_y1 = index_y;
	index_y2 = index_y + index_l / 2;
	index_y3 = index_y + index_l;

	index_r = (new Date).getMilliseconds() / 1000 * 90;
	var index_x1 = index_x + index_l / 2 + index_l / 2 * Math.cos((45 - index_r) * Math.PI / 180);
	var index_x2 = index_x + index_l / 2 + index_l / 2 * Math.cos((225 - index_r) * Math.PI / 180);
	var index_x3 = index_x + index_l / 2 + index_l / 2 * Math.cos((315 - index_r) * Math.PI / 180);

	index_ctx = index_canvas.getContext("2d");

	//描画初期化
	index_ctx.clearRect(index_x, index_y, index_l, index_l);//初期化透明化

	//三角1
	index_ctx.fillStyle = "#0080c0";
	index_ctx.beginPath();
	index_ctx.moveTo(index_x + index_l / 2, index_y1);
	index_ctx.lineTo(index_x1, index_y2);
	index_ctx.lineTo(index_x2, index_y2);
	index_ctx.fill();//三角1

	//三角2
	index_ctx.fillStyle = "#0088c8";
	index_ctx.beginPath();
	index_ctx.moveTo(index_x + index_l / 2, index_y1);
	index_ctx.lineTo(index_x3, index_y2);
	index_ctx.lineTo(index_x2, index_y2);
	index_ctx.fill();//三角2

	//三角3
	index_ctx.fillStyle = "#0078b8";
	index_ctx.beginPath();
	index_ctx.moveTo(index_x2, index_y2);
	index_ctx.lineTo(index_x1, index_y2);
	index_ctx.lineTo(index_x + index_l / 2, index_y3);
	index_ctx.fill();//三角3

	//三角4
	index_ctx.fillStyle = "#0080c0";
	index_ctx.beginPath();
	index_ctx.moveTo(index_x2, index_y2);
	index_ctx.lineTo(index_x3, index_y2);
	index_ctx.lineTo(index_x + index_l / 2, index_y3);
	index_ctx.fill();//三角4


	//時針
	var index_sr = ((new Date).getHours() + (new Date).getMinutes() / 60) / 12 * 360;
	var index_sx = index_x + index_l / 2 + 0.7 * index_l / 2 * Math.cos((index_sr - 90) * Math.PI / 180);
	var index_sy = index_y + index_l / 2 + 0.7 * index_l / 2 * Math.sin((index_sr - 90) * Math.PI / 180);
	index_ctx.lineWidth = 9;
	index_ctx.strokeStyle = "black";
	index_ctx.beginPath();
	index_ctx.moveTo(index_x + index_l / 2, index_y + index_l / 2);
	index_ctx.lineTo(index_sx, index_sy);
	index_ctx.stroke();
	index_ctx.lineWidth = 3;
	index_ctx.strokeStyle = "white";
	index_ctx.lineTo(index_x + index_l / 2, index_y + index_l / 2);
	index_ctx.stroke();

	//分針
	var index_sr = ((new Date).getSeconds() / 60 + (new Date).getMinutes()) / 60 * 360;
	var index_sx = index_x + index_l / 2 + 0.9 * index_l / 2 * Math.cos((index_sr - 90) * Math.PI / 180);
	var index_sy = index_y + index_l / 2 + 0.9 * index_l / 2 * Math.sin((index_sr - 90) * Math.PI / 180);
	index_ctx.lineWidth = 9;
	index_ctx.strokeStyle = "black";
	index_ctx.beginPath();
	index_ctx.moveTo(index_x + index_l / 2, index_y + index_l / 2);
	index_ctx.lineTo(index_sx, index_sy);
	index_ctx.stroke();
	index_ctx.lineWidth = 3;
	index_ctx.strokeStyle = "white";
	index_ctx.lineTo(index_x + index_l / 2, index_y + index_l / 2);
	index_ctx.stroke();

	//秒針
	var index_sr = ((new Date).getSeconds() + (new Date).getMilliseconds() / 1000) / 60 * 360;
	var index_sx = index_x + index_l / 2 + index_l / 2 * Math.cos((index_sr - 90) * Math.PI / 180);
	var index_sy = index_y + index_l / 2 + index_l / 2 * Math.sin((index_sr - 90) * Math.PI / 180);
	index_ctx.strokeStyle = "green";
	index_ctx.beginPath();
	index_ctx.moveTo(index_x + index_l / 2, index_y + index_l / 2);
	index_ctx.lineTo(index_sx, index_sy);
	index_ctx.stroke();
	index_ctx.lineWidth = 3;
	index_ctx.strokeStyle = 'red';
	index_ctx.lineTo(index_x + index_l / 2, index_y + index_l / 2);
	index_ctx.stroke();

	//時計文字列
	index_ctx.lineWidth = 3;
	index_ctx.font = index_l / 8 + "px serif";
	index_ctx.strokeText(msString(new Date()), index_x + index_l / 8, index_y + index_l / 8);
	index_ctx.lineWidth = 1;
}


function msString(ms_date){
	var ms_h = "0" + ms_date.getHours();
	var ms_m = "0" + ms_date.getMinutes();
	var ms_s = "0" + ms_date.getSeconds();
	var ms_ms = "00" + ms_date.getMilliseconds();
	ms_h = ms_h.slice(-2); // 2桁にする
	ms_m = ms_m.slice(-2); // 2桁にする
	ms_s = ms_s.slice(-2); // 2桁にする
	ms_ms = ms_ms.slice(-3); // ミリ秒3桁にする
	return(ms_h + ":" + ms_m + ":" + ms_s + "." + ms_ms);
}
