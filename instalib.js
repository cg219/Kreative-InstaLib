/*

	Author: Clemente Gomez
	Website: http://imkreative.com
	Library Name: Kreative InstaLib
	Version: 0.3a
	
	Dependencies: jQuery
	Description: jQuery HTML5 Instagram Client Library. Allows for Instagram Authorization as well as  retreiving, and posting data to a users
		Instagram.
		
*/

function Instagram( clientID, responseURL ){
	this.clientID = clientID;
	this.responseURL = responseURL;
	this.accessToken = "";
	this.options = {
		url: "",
		data: { access_token : this.accessToken },
		type: "GET",
		dataType: "jsonp",
		success: function( response ){
			return response;
		}
	};
	this.apiURLS = {
		popular : "https://api.instagram.com/v1/media/popular",
		userFeed : "https://api.instagram.com/v1/users/self/feed",
		userLikes : "https://api.instagram.com/v1/users/self/media/liked",
		media : "https://api.instagram.com/v1/media/{{id}}",
		mediaLikes : "https://api.instagram.com/v1/media/{{id}}/likes"
	}
}


/*

				HELPERS
				
*/

Instagram.prototype.createRequest = function( options ) {
	if( typeof options === "string" ){
		var request = $.extend( {}, this.options );
		request.url = options;
		return request;
	}
	else{
		console.log("Options", this.options );
		return $.extend( {}, this.options, options );
	}
}

Instagram.prototype.getToken = function(){
	var urlPath = window.location.href;
	var tokenName = "#access_token=";
	var tokenCheck = urlPath.search(tokenName);
	var tokenPos = -1;
	
	if( tokenCheck >= 0 ){
		tokenPos = tokenCheck + tokenName.length;
		this.accessToken = urlPath.substring(tokenPos);
		localStorage["kreative_instagram_accessToken"] = this.accessToken;
		this.options.data.access_token = this.accessToken;
		return this.accessToken;
	}
	
	return false;
}


/*

				AUTHENTICATION
				
*/

Instagram.prototype.authorize = function( scopes ){
	var scopeString = ( scopes ) ? "&scopes=" + scopes.join("+") : "";
	window.location = "https://instagram.com/oauth/authorize/?client_id=" + this.clientID + "&redirect_uri=" + this.responseURL + "&response_type=token" + scopeString;
}

Instagram.prototype.getCachedToken = function(){
	if( localStorage["kreative_instagram_accessToken"] ){
		this.accessToken = localStorage["kreative_instagram_accessToken"];
		this.options.data.access_token = this.accessToken;
		return this.accessToken;
	}
	else{
		this.accessToken = "";
		return false;
	}
}


/*

				GENERAL
				
*/

Instagram.prototype.getPopularFeed = function( callback ) {
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.popular,
			success: callback
		})
	);
}


/*

				USER
				
*/

Instagram.prototype.getUserFeed = function( callback, count, min_id, max_id ) {
	var data = {};
	
	data["count"] = count !== undefined ? count : undefined;
	data["min_id"] = min_id !== undefined ? min_id : undefined;
	data["max_id"] = max_id !== undefined ? max_id : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.userFeed,
			data: data,
			success: callback
		})
	);
}

Instagram.prototype.getUserLikes = function( callback, count, max_like_id ) {
	var data = {};
	
	data["count"] = count !== undefined ? count : undefined;
	data["max_like_id"] = max_like_id !== undefined ? max_like_id : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.userLikes,
			data: data,
			success: callback
		})
	);
}


/*

				MEDIA RELATED
				
*/

Instagram.prototype.getMedia = function( callback, id ) {
	var customURL = this.apiURLS.media.replace(/{{id}}/ig, id);
	console.log( "Media URL", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: callback
		})
	);
}

Instagram.prototype.getMediaLikes = function( callback, id ) {
	var customURL = this.apiURLS.mediaLikes.replace(/{{id}}/ig, id);
	console.log( "Media Likes URL", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: callback
		})
	);
}