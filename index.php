<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Instagram Library</title>
	<link href='http://fonts.googleapis.com/css?family=Life+Savers' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/reset.css" />
	<link rel="stylesheet" href="css/style.css" />
</head>

<body>

	<div class="wrap">
		<h1>Kreative Instagram Library Examples</h1>
		<section id="authorize">
			<h1>Authorize</h1>
			<p>Authorize Kreative InstaLib to access a Users Instagram</p>
			<button class="authorize_button">Authorize Instagram</button>
		</section>
		
		<section id="popular">
			<h1>Popular Feed</h1>
			<p>Get the populars feed from Instagram</p>
			<ul class="feed">
				
			</ul>
		</section>
		
		<section id="user">
			<h1>User Feed Feed</h1>
			<p>Get the Users Feed</p>
			<ul class="feed">
				
			</ul>
		</section>
		
		<section id="media">
			<h1>Active Image</h1>
			<p>Images I've clicked from my feed or demonstration purposes</p>
			<ul class="feed">
			
			</ul>
		</section>
	</div>

	<script src="jquery-1.8.1.js"></script>
	<script src="js/instalib.js"></script>
	<script id="feedTemplate" type="instagram/template">
		<li>
			<h2 data-userID="{{userID}}">{{username}}</h2>
			<img src="{{imgsrc}}" alt="{{imgalt}}" data-id="{{id}}" />
		</li>
	</script>
	<script>
		
		var instagram = new Instagram("45a0c872bc884a848ea73e12c9bd33b7", "http://localhost/instalib", "php/instalib.php");
		
		function populate( response ){
			var template = $.trim( $("#feedTemplate").html() );
			var list =""
			var data = response.data
			if( data.length )
			{
				$.each( data, function( i, object ){
					list += template.replace( /{{username}}/ig, object.user.username || "No User" ).
						replace( /{{imgsrc}}/ig, object.images.thumbnail.url ).
							replace( /{{imgalt}}/ig, object.filter).
								replace( /{{id}}/ig, object.id).
									replace( /{{userID}}/ig, object.user.id);
				});
			}
			else{
				list += template.replace( /{{username}}/ig, data.user.username || "No User" ).
						replace( /{{imgsrc}}/ig, data.images.thumbnail.url ).
							replace( /{{imgalt}}/ig, data.filter).
								replace( /{{id}}/ig, data.id).
									replace( /{{userID}}/ig, data.user.id);
			}
			
			return list;
		}
		
		console.log(instagram);
		if( instagram.getCachedToken() === false ){
			instagram.getToken();
			console.log("New Token: " + instagram.accessToken);
		}
		console.log("Cached Token if not New: " + instagram.accessToken);
		
		$("button.authorize_button").on( "click", function(){
			console.log("CLICKED");
			instagram.authorize(["likes","comments","relationships"]);
		});
		
		//$("#user").hide();
		
		$("#user ul.feed").on( "click", "img", function( event ){
			var dataID = $(this).data("id");
			
			instagram.getMedia( function(response){
				console.log("ACTIVE MEDIA OBJECT: ", response );
				populate( response );
				
				$("#media ul.feed").empty().append( populate( response ) );
			}, dataID );
			
			/*instagram.getLikes( function(response){
				console.log("ACTIVE MEDIA LIKES: ", response );
			}, dataID );
			
			instagram.getComments( function(response){
				console.log("ACTIVE MEDIA COMMENTS: ", response );
			}, dataID );*/
			
			/*instagram.setComment( function(response){
				console.log("ACTIVE MEDIA COMMENTS Text: ", response );
			}, dataID, "Just testing out   some things!!" + new Date().getTime() );*/
			
			/*instagram.deleteLike( function(response){
				console.log("ACTIVE MEDIA COMMENTS Text: ", response );
			}, dataID);*/
			
			/*instagram.mediaSearch( function(response){
				console.log("ACTIVE MEDIA Search: ", response );
			}, 40.763901, -73.96154 );*/
			
			/*instagram.getRecentTagged( function(response){
				console.log("TAG SEARCH: ", response);
				populate( response );
				
				$("#media ul.feed").empty().append( populate( response ) );
			}, "###Dog");*/
			
			/*instagram.getRecentLocations( function(response){
				console.log("LOCATION MEDIA Search: ", response );
			}, 123 );*/
			
			/*instagram.userSearch( function(response){
				console.log("User Search: ", response );
			}, "kreative mente", 12 );*/
			
			instagram.getUser( function(response){
				console.log("User Search: ", response );
			}, 6292562 );
		
			
		});
		
		$("ul.feed").on( "click", "h2", function( event ){
			var userID = $(this).data("userid");
			
			instagram.getFollowers( function(response){
				console.log("USERS FOLLOWERS: ", response);
			}, userID);
			
			instagram.getFollows( function(response){
				console.log("USERS FOLLOWS: ", response);
			}, userID);
			
			instagram.getRelationship( function(response){
				console.log("USERS Relationship: ", response);
			}, userID);
			
			/*instagram.setRelationship( function(response){
				console.log("USERS Relationship: ", response);
			}, userID, "unfollow");*/
		});
		
		instagram.getPopularFeed( function(response){
			console.log(response);
			
			$("#popular ul.feed").append( populate( response ) );
		});
		
		/*instagram.getUserFeed( function(response){
			console.log(response);
			
			$("#user ul.feed").append( populate( response ) );
		}, 8);*/
		
		/*instagram.getUserLikes( function(response){
			console.log("USER LIKES: ", response);
			
			$("#user ul.feed").empty().append( populate( response ) );
		}, 8);*/
			
		instagram.getUserRecent( function(response){
			console.log("User Recent: ", response);
			populate( response );
			
			$("#user ul.feed").empty().append( populate( response ) );
		}, 6292562, 8 );
	</script>
</body>
</html>