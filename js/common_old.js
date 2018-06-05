//timer
//timer setup
timer_selector = "#time";


var myDate = new Date();
var timer_start = returnEndDate(0,0,0);
var oneDate = new Date("12/18/2017 20:00:00");
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
	
	$(".fancybox").fancybox({
		// Options will go here
		toolbar : false,
		infobar : false,
		modal : false,
		ajax : {
        // Object containing settings for ajax request
			settings : {
	
				// This helps to indicate that request comes from the modal
				// Feel free to change naming
				data : {
					fancybox : true
				}
			}

	    },
		animationEffect : "fade",
		animationDuration : 1500,
		zoomOpacity : "auto",
		transitionEffect : "slide",
	});

	$(".slick-prev").html("");
	$(".slick-next").html("");

	$(".fcontent .carousel").slick({
		slidesToShow:4,
		variableWidth:false,
		infinite: false,
		responsive: [
			{
					breakpoint: 1200,
					settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: false,
				}
			},
			{
					breakpoint: 1100,
					settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					infinite: false,
				}
			},
			{
					breakpoint: 900,
					settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: false,
				}
			},

		]
	});

	$(".slick-prev").html("");
	$(".slick-next").html("");
	
	
	//new Engine.Pages.Forms();	
});
//end of timer



if ( typeof Engine == "undefined") {
	window.Engine = {};
}

$.fn.namespace = function() {
	var arg = arguments, obj = null, names, i, n;
	for ( i = 0; i < arg.length; ++i) {
		names = arg[i].split(".");
		obj = window;
		for ( n = 0; n < names.length; ++n) {
			obj[names[n]] = obj[names[n]] || {};
			obj = obj[names[n]];
		}
	}
	return obj;
};


$.fn.namespace("Engine.Pages");

(function() {
  "use strict";
  Engine.Pages.Forms = function() {
    this._attachEvents();
  };

  Engine.Pages.Forms.prototype = {
    _events: null,

    destroy: function() {
      this._detachEvents();
    },

    _eventsAttached: function() {
      return this._events !== null;
    },

    _attachEvents: function() {

		var user_origin = {
			datetime: (new Date).toDateString() + ' ' + (new Date).toTimeString(),
			referer: document.referrer
		};
		console.log("user_origin", user_origin);
		
		var site_url = "";
		
		$("input.user_origin").val(JSON.stringify(user_origin));
	
		$(".vpform form").each(function(){
			$(this).find("button").click(function(event){
				event.preventDefault();
				var form_id = $(this).parents("form").attr("id");
				Engine.Pages.Forms.ajaxSend(form_id);
			});
		});

		//Engine.Pages.Forms.ajaxLoadContent($("#logo>a").attr("href")+"forms/templates/contact-form2.php", null, "div.contact-form2");
		
		$('#request1, #request2, #request3, #iwant, #join, #reg, .single_add_to_amocrm').each(function(){
			$(this).click(function(event){
				event.preventDefault();
				var service = $(this).attr('service');
				var price = $(this).attr('price');
				Engine.Pages.Forms.ajaxLoadContent($("#logo>a").attr("href")+"forms/templates/service-form1.php", 'service='+service+'&price='+price, "body");
			});
		});
		$('a#order_call').click(function(event){
			event.preventDefault();
			Engine.Pages.Forms.ajaxLoadContent($("#logo>a").attr("href")+"forms/templates/call-form1.php", null, "body");
		});
		/*
		$('a#speaker_info').click(function(event){
			console.log("start speaker_info, site_url:", site_url);
			event.preventDefault();
			Engine.Pages.Forms.ajaxLoadContent(site_url+"forms/templates/speaker_info.php", null, "body", '#speaker>.reveal-modal');
		});
		*/
		

	},
    _detachEvents: function() {
      if ($.isArray(this._events)) {
        $.each(this._events, function(i, ev) {
          ev.off();
        });

        this._events = null;
      };
    },
  };
  
  
	Engine.Pages.Forms.ajaxSend = function (form_id) {
		$.ajax({
			type: "POST", 
			data:$("form#"+form_id).serialize(),
			url: $("#logo>a").attr("href")+"forms/ajax/bitrix24form.php",  
			cache: false,
			dataType: "xml",
			success: function(xml){
				if($("form#"+form_id+" .emessage").length > 0){
					$("form#"+form_id+" .emessage").remove();
				}
				if($("form#"+form_id+" .ferror").length > 0){
					$("form#"+form_id+" .ferror").removeClass("ferror");
				}
				
				var errors = $(xml).find("errors");
				if(errors.length > 0){
					$(errors).find("error").each(function(){
						if($(this).attr('field')){
							$("form#"+form_id+" *[field="+$(this).attr('field')+"]").addClass("ferror");
							$("form#"+form_id+" *[field="+$(this).attr('field')+"]").append(
								"<span class='emessage'>"+$(this).html()+"</span>"
							);
						}
						else{
							if($("form#"+form_id+" .unknown_error").length == 0){
								$("form#"+form_id).append(
									"<span class='unknown_error'>Непредвиденная ошибка</span>"
								);
							}
						}
					});
				}
				else if($(xml).find("success_message").length > 0){
					
					alert($(xml).find("success_message").html());
					
					$("form#"+form_id).find('input:text, input:password, input:file, select, textarea').val('');
					$("form#"+form_id).find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
					
					if($("form#"+form_id).find(".close_btn").length > 0){
						$("form#"+form_id).parents(".modal_form").remove();
					}
				}
			},
			error: function(xhr, ajaxOptions, thrownError){
				console.log("error");
				console.log("status: "+xhr.status);
				console.log("thrownError: "+thrownError);
				console.log("responseText: "+xhr.responseText);
			}
		});
	};
	Engine.Pages.Forms.ajaxLoadContent = function (url, postData, selector, reveal_selector) {
		console.log("start ajaxLoadContent, url:", url);
		console.log("postData:", postData);
		console.log("selector:", selector);
		$.ajax({
			type: "POST", 
			data:postData,
			url: url,  
			cache: false,
			dataType: "html",
			success: function(html){
				$(selector).prepend(html);
			},
			complete: function(){
				$(".modal_form .close_btn").click(function(event){
					$(this).parents(".modal_form").remove();
				});

				$(".vpform button").click(function(event){
					event.preventDefault();
					var form_id = $(this).parents("form").attr("id");
					if(form_id){
						Engine.Pages.Forms.ajaxSend(form_id);
					}
				});
				
				if(reveal_selector){
					$(reveal_selector).reveal({
						animation: 'fadeAndPop',
						animationspeed: 200,
						closeonbackgroundclick: true,
						dismissmodalclass: 'close-reveal-modal'
					});
				}
				
			},
			error: function(xhr, ajaxOptions, thrownError){
				console.log("error");
				console.log("status: "+xhr.status);
				console.log("thrownError: "+thrownError);
				console.log("responseText: "+xhr.responseText);
			}
		});
	};
  
})();