# Kreative InstaLib - jQuery Instagram Library

## Instagram(clientID, responseURL, proxyURL, accesToken)
There are a few ways to initiate the library. You can either use InstaLib to authenticate the user or if you authenticate the user elsewhere, just pass the Acess Token.

The first parameter is the **Client ID**. Instagram provides this to you when you first register your app.

The second parameter is the **Response URL**. This is the url you return to once the user has authorized your app. This should match the Response URL you register your app with.

The third parameter is the **Proxy URL**. This is provided with the library. Its only required if you plan on POSTing data to Instagram. This includes requests such as Liking, Commenting, etc.

The final paramter is the **Access Token**. This is only required if the user authorizes your app outside of the Library. Just pass it and you're ready to start making calls.

* **clientID:** Client ID. Obtained by registering App
* **responseURL:** Response URL. Obtained by registering App
* **proxyURL:** URL of Proxy PHP *Required for POST requests*
* **accessToken:** User Access Token. *Required if authorizing outside of library*

<br />

*Initiate with Access Token*
	
	var instagram = new Instagram("", "", "php/instalib.php", "fb2e77d.47a0479900504cb3ab4a1f626d174d2d");

*Initialize with Client ID*

	var instagram = new Instagram("77e43cf848b1469bbf0edff2578950bf", "www.yoursite.com/callback", "php/instalib.php");


## Instagram.authorize(scopes)
Allowing users to authorize your app is easy with this single line of code. Calling this will automatically send the user to Instagram to authorize your app.

In addition you can pass additional scopes if necessary.

* **scopes:** Additional permission string separated by "+"

<br />
	
	instagram.authorize("likes+comments");

## Instagram.getCachedToken()
When a user authorizes your app with the library, it is automatically cached. You can always get the token in the future with this method without sending the user to Instagram again.
	
	var token = instagram.getCachedToken()
	//returns fb2e77d.47a0479900504cb3ab4a1f626d174d2d

## Instagram.getUser(callback, id, error)
Get a users information based on their user ID. You can pass *"self"* as the ID to get the authenticated user's information.

* **callback:** Callback function for successful request
* **id:** User ID
* **error:** Callback function for unsuccessful request

<br />


	instagram.getUser( function( response ){
		//Do Something with data the call is successful
	},
	"self",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getUserFeed(callback, count, min_id, max_id, error)
Get the authenticated users Instagram Feed.

* **callback:** Callback function for successful request
* **count:** Amount of images to return
* **min_id:** Return images later than this id
* **max_id:** Return images after than this id
* **error:** Callback function for unsuccessful request

<br />

	instagram.getUserFeed( function( response ){
		//Do Something with data the call is successful
	},
	20,
	"",
	"",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getUserRecent(callback, count, min_id, max_id, min_time, max_time, error)
Get the authenticated users most recent uploads.

* **callback:** Callback function for successful request
* **count:** Amount of images to return
* **min_id:** Return Media later than this id
* **max_id:** Return Media after than this id
* **min_time:** Return Media after this time
* **max_time:** Return Media before this time
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getUserRecent( function( response ){
		//Do Something with data the call is successful
	},
	20,
	"",
	"",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getUserLikes(callback, count, max_id, error)
Get the authenticated users most recent uploads.

* **callback:** Callback function for successful request
* **count:** Amount of likes to return
* **max_id:** Return images liked before than this id
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getUserLikes( function( response ){
		//Do Something with data the call is successful
	},
	20,
	"",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getUserRecent(callback, count, min_id, max_id, min_time, max_time, error)
Get the authenticated users most recent uploads.

* **callback:** Callback function for successful request
* **count:** Amount of images to return
* **min_id:** Return Media later than this id
* **max_id:** Return Media after than this id
* **min_time:** Return Media after this time
* **max_time:** Return Media before this time
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getUserRecent( function( response ){
		//Do Something with data the call is successful
	},
	20,
	"",
	"",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getFollowers(callback, id, error)
Get the a users list of followers.

* **callback:** Callback function for successful request
* **id:** User ID
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getFollowers( function( response ){
		//Do Something with data the call is successful
	},
	"self",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getFollows(callback, id, error)
Get the a users list of people they follow.

* **callback:** Callback function for successful request
* **id:** User ID
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getFollows( function( response ){
		//Do Something with data the call is successful
	},
	"self",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getRelationship(callback, id, error)
Get information about a users relationship to the authenticated user.

* **callback:** Callback function for successful request
* **id:** User ID
* **error:** Callback function for unsuccessful request

**Reuqires relationships Scope**
<br />
	
	instagram.getRelationship( function( response ){
		//Do Something with data the call is successful
	},
	"36586",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.setRelationships(callback, id, action, error)
Set the relationship for a user. Use this to follow, unfollow, block, unblock a user. Or to approve or deny a follow request.

* **callback:** Callback function for successful request
* **id:** User ID
* **action:** The action to set. *follow, unfollow, block, unblock, accept, deny*
* **error:** Callback function for unsuccessful request

**Reuqires relationships Scope**</br>
**Reuqires Proxy PHP**
<br />
	
	instagram.setRelationship( function( response ){
		//Do Something with data the call is successful
	},
	"36586",
	"unfollow",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getPopularFeed(callback, error)
Get the Popular Feed

* **callback:** Callback function for successful request
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getPopularFeed( function( response ){
		//Do Something with data the call is successful
	},
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getMedia(callback, id, error)
Get a single image and all of its metadata

* **callback:** Callback function for successful request
* **id:** Media ID
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getMedia( function( response ){
		//Do Something with data the call is successful
	},
	"12343",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getLikes(callback, id, error)
Get all the likes for a single image

* **callback:** Callback function for successful request
* **id:** Media ID
* **error:** Callback function for unsuccessful request

**Reuqires likes Scope**</br>
<br />
	
	instagram.getLikes( function( response ){
		//Do Something with data the call is successful
	},
	"12343",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.setLike(callback, id, error)
Like an image

* **callback:** Callback function for successful request
* **id:** Media ID
* **error:** Callback function for unsuccessful request

**Reuqires likes Scope**</br>
**Reuqires Proxy PHP**
<br />
	
	instagram.setLike( function( response ){
		//Do Something with data the call is successful
	},
	"12343",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.deleteLike(callback, id, error)
Delete a like from an image

* **callback:** Callback function for successful request
* **id:** Media ID
* **error:** Callback function for unsuccessful request

**Reuqires likes Scope**</br>
**Reuqires Proxy PHP**
<br />
	
	instagram.deleteLike( function( response ){
		//Do Something with data the call is successful
	},
	"12343",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getComments(callback, id, error)
Get all comments for an image

* **callback:** Callback function for successful request
* **id:** Media ID
* **error:** Callback function for unsuccessful request

**Reuqires comments Scope**</br>
**Reuqires Proxy PHP**
<br />
	
	instagram.getComments( function( response ){
		//Do Something with data the call is successful
	},
	"12343",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.setComment(callback, id, text, error)
Comment on an image

* **callback:** Callback function for successful request
* **id:** Media ID
* **text:** The comment
* **error:** Callback function for unsuccessful request

**Reuqires comments Scope**</br>
**Reuqires Proxy PHP**
<br />
	
	instagram.setComment( function( response ){
		//Do Something with data the call is successful
	},
	"12343",
	"this is a comment",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getTag(callback, tag, error)
Get information about a tag

* **callback:** Callback function for successful request
* **tag:** Tag name without leading '#'
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getTag( function( response ){
		//Do Something with data the call is successful
	},
	"Android",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getRecentTagged(callback, tag, min, max, error)
Get information about a tag

* **callback:** Callback function for successful request
* **tag:** Tag name without leading '#'
* **min:** Return Media later than this id
* **max:** Return Media after than this id
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.RecentTagged( function( response ){
		//Do Something with data the call is successful
	},
	"Android",
	"",
	"",
	function( response ){
		//Call Failed. Check Error
	});

## Instagram.getLocation(callback, id, error)
Get information about a location

* **callback:** Callback function for successful request
* **id:** TLocation ID
* **error:** Callback function for unsuccessful request

<br />
	
	instagram.getLocation( function( response ){
		//Do Something with data the call is successful
	},
	"1",
	function( response ){
		//Call Failed. Check Error
	});

