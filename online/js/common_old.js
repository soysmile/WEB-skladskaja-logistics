//timer
//timer setup
timer_selector = "#time";


var myDate = new Date();
//var cookie_name = "timer_"+page_id;
//if($.cookie(cookie_name)){
//	var timer_start = $.cookie(cookie_name);
//}
//else{
	var timer_start = returnEndDate(0,0,0);
	//$.cookie(cookie_name, timer_start, {expires: 30*24*60*60*1000});
//}
var oneDate = new Date("12/11/2017 19:00:00");
console.log("oneDate: ",oneDate);
var oneDateMiliseconds = oneDate.getTime();
console.log("oneDateMiliseconds: ",oneDateMiliseconds);
var currentMiliseconds = Date.now(); 
console.log("currentMiliseconds: ",currentMiliseconds);
var timeBeforeMilliseconds = (oneDateMiliseconds-currentMiliseconds);
console.log("timeBeforeMilliseconds: ",timeBeforeMilliseconds);
time = timeBeforeMilliseconds;

function returnEndDate(d,h,m){
		myDate.setDate(myDate.getDate()+d);
		myDate.setHours(myDate.getHours()+h);
		myDate.setMinutes(myDate.getMinutes()+m);
		return myDate;
}

$(function () {
	ls = new Date(timer_start) - new Date();
	ts = ls+time;
	if(ts < 0){
		//window.location.href = redirect;
	}	
	$(timer_selector).countdown({
		until: ts/1000,
		layout:'<span class="cd-time cd-days">{dnn}</span> : <span class="cd-time cd-hours">{hnn}</span> : <span class="cd-time cd-minutes">{mnn}</span> : <span class="cd-time cd-seconds">{snn}</span>',
		//expiryUrl: redirect
	});
});
//end of timer