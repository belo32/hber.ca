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

var nextPageUrl
jQuery.support.cors = true;
$(document).ready(function(){
	var id =$('.fb-album').attr('data-id');
	var albumUrl = facebookUrl + id + photosExt 
	var promise = getAjaxJSON(albumUrl);
	
	promise.success(function(data){
		handleData(data);
	});
	
	

});

function getAjaxJSON(albumUrl){
return $.ajax({
    url: albumUrl,
    dataType: 'json',
    cache: false,
    type: "GET",
    crossDomain: true,
    
   /* success: function(data) {
      //  handleData(data);
        
    },*/
    error: function (xhr, textStatus, errorThrown) {
        console.log("error "+ textStatus +" " + errorThrown);
        
    },
    complete: function(data){
    	console.log("complete");
    }
	});

}
function buildElement(item){
	
    var ref =$("<a></a>").attr({
        href: item.source,
        sytle: "background-image:url("+item.source+")"
        });
    ref.addClass("fb-image");

	$("<img/>").attr("src",item.source).appendTo(ref);
	
	return ref;
}


function callExternalFunctions(){
	var container = document.querySelector('.fb-album');
	 $(".fb-album a").touchTouch(); 
	imagesLoaded(container, function(){
	$(".fb-album").masonry({
		columnWidth:'.fb-image',
		itemSelector: '.fb-image'
			
	});
});
}

$(window).scroll(function() {
	if(nextPageUrl != null){
   		if($(window).scrollTop() + $(window).height() == $(document).height() ) {
       		var promise = getAjaxJSON(nextPageUrl);
			promise.success(function(data){
				handlePagedData(data);
			});
   		}
	}
});

function appendElements(items){
	// create new item elements'
	var container = document.querySelector('.fb-album');
	var msnry = Masonry.data(container);
	var elems = [];
	var fragment = document.createDocumentFragment();
	for (var i=0; i< items.length; i++) {
		var elem = buildElement(items[i]);
		fragment.appendChild( elem[0] );
		elems.push( elem[0] );
	};
	// append elements to container
	container.appendChild( fragment );
	// add and lay out newly appended elements
	msnry.appended( elems );
	imagesLoaded(container, function(){
		msnry.layout();
	});

	
}

function handleData(data){
		nextPageUrl = data.paging.next;
        var dataArray = data.data;
        $.each(dataArray, function(i,item){
        
        var ref= buildElement(item);
		ref.appendTo(".fb-album");
			
        });

       callExternalFunctions();
}

function handlePagedData(data){
	nextPageUrl = data.paging.next;
	var items = data.data;
	appendElements(items);
}

