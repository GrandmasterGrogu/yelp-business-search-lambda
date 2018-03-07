/*
An Amazon lambda function to proxy to Yelp search via latitude and longitude.
By Alex X. G.
*/

const yelp = require('yelp-fusion');
// https://www.yelp.com/developers/documentation/v3/business_search

exports.handler = (event, context, callback) => {
    
    if(!event.latitude) {
    	callback(Error('No latitude was passed.'));
    }
    if(!event.longitude) {
    	callback(Error('No longitude was passed.'));
    }
    var search = '';
    var latitude = event.latitude;
    var longitude = event.longitude;
    var radius = 100; // in meters
    var limit = 10;
    var offset = 0;
    var sort_by = 'distance';
    if(event.search) {
    	search = event.search;
    }
    if(event.radius) {
    	radius = event.radius;
    }
    if(event.limit) {
    	limit = event.limit;
    }
    if(event.offset) {
    	offset = event.offset;
    }
    if(event.sort_by) {
    	sort_by = event.sort_by;
    }
    
    const searchRequest = {
	  term: search,
	  latitude: latitude,
	  longitude: longitude,
	  radius: radius,
	  limit: limit,
	  offset: offset,
	  sort_by, sort_by 
	};


	const client = yelp.client(process.env.yelp_api_key);

	client.search(searchRequest).then(response => {
	 
		callback(null, response.jsonBody);
	}).catch(e => {
		callback(e);
	});
    
};