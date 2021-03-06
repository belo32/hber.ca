/**
* JQuery script for loading images from the facebook page album providing the album id as follows:
* <div class="fb-album" data-id="{ALBUM_ID}"></div>
* images will be added in the following format <div class="fb-image"><img src="{image_source}"/>
* Author: Bilal Al-Hajjar
*/
/**
* This is customized for the view of hber.ca
*/
var facebookUrl = "http://graph.facebook.com/";
var photosExt = "/photos?fields=source";
if (!(window.console && console.log)) { (function() { var noop = function() {}; var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn']; var length = methods.length; var console = window.console = {}; while (length--) { console[methods[length]] = noop; } }()); }

jQuery.support.cors = true;
$(document).ready(function(){
	var id =$('.fb-album').attr('data-id');
	var albumUrl = facebookUrl + id + photosExt 
	getAjaxJSON(albumUrl);

        

});

function getAjaxJSON(albumUrl){
$.ajax({
    url: albumUrl,
    dataType: 'json',
    cache: false,
    type: "GET",
    crossDomain: true,
    
    success: function(data) {
        
        var dataArray = data.data;
        $.each(dataArray, function(i,item){
        	/*console.log(item.source);*/
        	

            var ref =$("<a></a>").attr({
                
                
                href: item.source,
                sytle: "background-image:url("+item.source+")"
                });
            ref.addClass("fb-image grid_4");
        	$("<img/>").attr("src",item.source).appendTo(ref);
				ref.appendTo(".fb-album");
        });

        $(".fb-album a").touchTouch(); 

        /*console.log(dataArray);*/
        
    },
    error: function (xhr, textStatus, errorThrown) {
        /*console.log("error "+ textStatus +" " + errorThrown);*/
        
    },
    complete: function(data){
    	/*console.log("complete");*/
    }
	});

}


