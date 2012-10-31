/*

	Author: Clemente Gomez
	Website: http://imkreative.com
	Library Name: Kreative InstaLib
	Version: 0.7a
	
	Dependencies: jQuery
	Description: jQuery HTML5 Instagram Client Library. Allows for Instagram Authorization as well as  retreiving, and posting data to a users
		Instagram.
		
*/

function Instagram( clientID, responseURL, proxy, accessToken ){
	this.clientID = clientID;
	this.responseURL = responseURL;
	this.accessToken = accessToken;
	this.proxy = proxy;
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
		authorize : "https://instagram.com/oauth/authorize/?client_id={{clientid}}&redirect_uri={{response}}&response_type=token",
		popular : "https://api.instagram.com/v1/media/popular",
		user : "https://api.instagram.com/v1/users/{{id}}",
		userFeed : "https://api.instagram.com/v1/users/self/feed",
		userLikes : "https://api.instagram.com/v1/users/self/media/liked",
		userRecentMedia : "https://api.instagram.com/v1/users/{{id}}/media/recent",
		media : "https://api.instagram.com/v1/media/{{id}}",
		likes : "https://api.instagram.com/v1/media/{{id}}/likes",
		comments : "https://api.instagram.com/v1/media/{{id}}/comments",
		requests : "https://api.instagram.com/v1/users/self/requested-by",
		follows : "https://api.instagram.com/v1/users/{{id}}/follows",
		followers : "https://api.instagram.com/v1/users/{{id}}/followed-by",
		relationship : "https://api.instagram.com/v1/users/{{id}}/relationship",
		searchMedia : "https://api.instagram.com/v1/media/search",
		searchTag : "https://api.instagram.com/v1/tags/search",
		tags : "https://api.instagram.com/v1/tags/{{tag}}",
		recentTags : "https://api.instagram.com/v1/tags/{{tag}}/media/recent",
		searchLocation : "https://api.instagram.com/v1/locations/search",
		locations : "https://api.instagram.com/v1/locations/{{id}}",
		recentLocations : "https://api.instagram.com/v1/locations/{{id}}/media/recent",
		searchUser : "https://api.instagram.com/v1/users/search"
	}
}


/*

				METHODS
				
*/

Instagram.prototype.like = function( options ){
	if( typeof options === "string" ){
		this.setLike( undefined, options, undefined );
	}
	else{
		if( options.delete === true ){
			this.deleteLike( options.success, options.id, options.error );
		}
		else{
			this.setLike( options.success, options.id, options.error );
		}
	}
}

Instagram.prototype.comment = function( options ){
	this.setComment( options.success, options.id, options.data, options.error );
}

Instagram.prototype.search = function( options ){
	if( typeof options === "string" ){
		
	}
	else{
		switch(options.type){
			case "user":
				this.userSearch( options.success, options.data, options.amount, options.error );
				break;
			
			case "tag":
				this.tagSearch( options.success, options.data, options.error );
				break;
			
			case "location":
				this.locationSearch( options.success, options.latitude, options.longitude, options.distance, options.foursquare, options.error );
				break;
			
			case "media":
				this.mediaSearch( options.success, options.latitude, options.longitude, options.distance, options.min_time, options.max_time, options.error );
				break;
			
			default:
				this.tagSearch( options.success, options.data, options.error );
				break;
		}
	}
}

Instagram.prototype.user = function( options ){
	if( typeof options === "string" ){
		this.getUser( function(response){ return response; }, options, undefined );
	}
	else{
		switch(options.type){
			case "user":
				this.getUser( options.success, options.id, options.error );
				break;
			
			case "followers":
				this.getFollowers( options.success, options.id, options.error );
				break;
			
			case "following":
				this.getFollows( options.success, options.id, options.error );
				break;
			
			case "requests":
				this.getUserRequests( options.success, options.error );
				break;
			
			case "relationship":
				if(options.action){
					this.setRelationship( options.success, options.id, options.action, options.error );
				}
				else{
					this.getRelationship( options.success, options.id, options.error );
				}
				break;
				
			default:
				this.getUser( options.success, options.id, options.error );
				break;
		}
	}
}

Instagram.prototype.feed = function( options ){
	if( typeof options === "string" ){
		
	}
	else{
		switch(options.type){
			case "user": 
				this.getUserFeed( options.success, options.amount, options.min_id, options.max_id, options.error );
				break;
			
			case "popular":
				this.getPopularFeed( options.success, options.error );
				break;
			
			case "recent":
				this.getUserRecent( options.success, options.amount, options.min_id, options.max_id, options.min_time, options.max_time, options.error );
				break;
			
			case "likes":
				this.getUserLikes( options.success, options.amount, options.max_id, options.error );
				break;
				
			case "tagged":
				this.getRecentTagged( options.success, options.data, options.min_id, options.max_id, options.error );
				break;
				
			case "location":
				this.getRecentLocations( options.success, options.id, options.min_id, options.max_id, options.min_time, options.max_time, options.error );
				break;
				
			default:
				this.getPopularFeed( options.success, options.error );
				break;
		}
	}
}

Instagram.prototype.media = function( options ){
	if( typeof options === "string" ){
		
	}
	else{
		switch(options.type){
			case "image":
				this.getMedia( options.success, options.id, options.error );
				break;
				
			case "likes":
				this.getLikes( options.success, options.id, options.error );
				break;
			
			case "comments":
				this.getComments( options.success, options.id, options.error );
				break;
				
			case "locations":
				this.getLocation( options.success, options.id, options.error );
				break;
			
			case "tags":
				this.getTag( options.success, options.id, options.error );
				break;
				
			default:
				this.getMedia( options.success, options.id, options.error );
				break;
		}
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
		console.log("Updated Options", $.extend( {}, this.options, options ) );
		var newOptions = $.extend( {}, this.options, options );
		
		if( newOptions.type !== "GET" )
		{
			newOptions.data = $.extend( {}, newOptions.data, { 
				postURL: newOptions.url,
				requestType: newOptions.type === "POST" ? "POST" : "DELETE"
			});
			newOptions.type = "POST";
			newOptions.url = this.proxy;
		}
		
		return newOptions;
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
	var scopeString = ( scopes ) ? "&scope=" + scopes.join("+") : "";
	var url = this.apiURLS.authorize.replace(/{{clientid}}/ig, this.clientID);
	
	url  = url.replace(/{{response}}/, this.responseURL);
	window.location = url + scopeString;
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

				USER
				
*/

Instagram.prototype.getUser = function( callback, id, error ) {
	var customURL = this.apiURLS.user.replace(/{{id}}/ig, id);
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getUserFeed = function( callback, count, min_id, max_id, error ) {
	var data = {};
	
	data["count"] = count !== undefined ? count : undefined;
	data["min_id"] = min_id !== undefined ? min_id : undefined;
	data["max_id"] = max_id !== undefined ? max_id : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.userFeed,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getUserRecent = function( callback, id , count, min_id, max_id, min_time, max_time, error ) {
	var customURL = this.apiURLS.userRecentMedia.replace(/{{id}}/ig, id);
	var data = {};
	
	data["count"] = count !== undefined ? count : undefined;
	data["min_id"] = min_id !== undefined ? min_id : undefined;
	data["max_id"] = max_id !== undefined ? max_id : undefined;
	data["min_time"] = min_time !== undefined ? min_time : undefined;
	data["max_time"] = max_time !== undefined ? max_time : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getUserLikes = function( callback, count, max_like_id, error ) {
	var data = {};
	
	data["count"] = count !== undefined ? count : undefined;
	data["max_like_id"] = max_like_id !== undefined ? max_like_id : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.userLikes,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getUserRequests = function( callback, error ) {
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.requests,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getFollowers = function( callback, id, error ) {
	var customURL = this.apiURLS.followers.replace(/{{id}}/ig, id);
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getFollows = function( callback, id, error ) {
	var customURL = this.apiURLS.follows.replace(/{{id}}/ig, id);
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getRelationship = function( callback, id, error ) {
	var customURL = this.apiURLS.relationship.replace(/{{id}}/ig, id);
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.setRelationship = function( callback, id, action, error ) {
	var customURL = this.apiURLS.relationship.replace(/{{id}}/ig, id);
	var data ={}
	
	data["action"] = action;
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			type: "POST",
			dataType: "json",
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}


/*

				MEDIA RELATED
				
*/

Instagram.prototype.getPopularFeed = function( callback, error ) {
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.popular,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getMedia = function( callback, id, error ) {
	var customURL = this.apiURLS.media.replace(/{{id}}/ig, id);
	console.log( "Media URL", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getLikes = function( callback, id, error ) {
	var customURL = this.apiURLS.likes.replace(/{{id}}/ig, id);
	console.log( "Media Likes URL", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.setLike = function( callback, id, error ) {
	var customURL = this.apiURLS.likes.replace(/{{id}}/ig, id);
	console.log( "Media Likes URL", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			type: "POST",
			dataType: "json",
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.deleteLike = function( callback, id, error ) {
	var customURL = this.apiURLS.likes.replace(/{{id}}/ig, id);
	console.log( "Media Likes URL", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			type: "DELETE",
			dataType: "json",
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getComments = function( callback, id, error ) {
	var customURL = this.apiURLS.comments.replace(/{{id}}/ig, id);
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.setComment = function( callback, id, text, error ) {
	var customURL = this.apiURLS.comments.replace(/{{id}}/ig, id);
	var data ={}
	
	data["text"] = text;
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			data: data,
			type: "POST",
			dataType: "json",
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

/*

				TAG RELATED
				
*/

Instagram.prototype.getTag = function( callback, tag, error ) {
	var customURL = this.apiURLS.tags.replace(/{{tag}}/ig, tag.replace(/\#/ig, "") );
	console.log( "TAG: ", tag, "URL: ", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getRecentTagged = function( callback, tag, min, max, error ) {
	var customURL = this.apiURLS.recentTags.replace(/{{tag}}/ig, tag.replace(/\#/ig, "") );
	var data = {};
	
	data["min_id"] = min ? min : undefined;
	data["max_id"] = max ? max : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	console.log( "TAG: ", tag, "URL: ", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}


/*

				LOCATION RELATED
				
*/

Instagram.prototype.getLocation = function( callback, id, error ) {
	var customURL = this.apiURLS.locations.replace(/{{id}}/ig, id);
	console.log( "ID: ", id, "URL: ", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.getRecentLocations = function( callback, id, min, max, min_time, max_time, error ) {
	var customURL = this.apiURLS.recentLocations.replace(/{{id}}/ig, id);
	var data = {};
	
	data["min_id"] = min ? min : undefined;
	data["max_id"] = max ? max : undefined;
	data["min_id"] = min_time ? min_time : undefined;
	data["max_id"] = max_time ? max_time : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	console.log( "ID: ", id, "URL: ", customURL );
	
	return $.ajax(
		this.createRequest({
			url: customURL,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}


/*

				SEARCH RELATED
				
*/

Instagram.prototype.mediaSearch = function( callback, lat, lng, distance, min_time, max_time, error ) {
	
	var data = {};
	
	data["lat"] = lat ? lat : undefined;
	data["lng"] = lng ? lng : undefined;
	data["min_timestamp"] = min_time ? min_time : undefined;
	data["max_timestamp"] = max_time ? max_time : undefined;
	data["distance"] = distance ? distance : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.searchMedia,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.locationSearch = function( callback, lat, lng, distance, foursq, error ) {
	
	var data = {};
	
	data["lat"] = lat ? lat : undefined;
	data["lng"] = lng ? lng : undefined;
	data["distance"] = distance ? distance : undefined;
	data["foursquare_v2_id"] = foursq ? foursq : undefined;
	
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.searchLocation,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.tagSearch = function( callback, query, error ) {
	
	var data = {};
	data["q"] = query.replace(/\#/ig, "");
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.searchTag,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}

Instagram.prototype.userSearch = function( callback, query, count, error ) {
	
	var data = {};
	data["q"] = query;
	data["count"] = count ? count : undefined;
	data = $.extend( {}, this.options.data, data );
	
	return $.ajax(
		this.createRequest({
			url: this.apiURLS.searchUser,
			data: data,
			success: function( response ){
				if( response.meta.code === 200 ){
					callback( response );
				}
				else{
					this.error( response );
				}
			},
			error: error || function( response ){
				console.log("ERROR: ", response );
			}
		})
	);
}