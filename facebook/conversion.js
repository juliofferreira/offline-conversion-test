import bizSdk from 'facebook-nodejs-business-sdk';
import { fbVariables } from './variables';

const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;

const access_token = fbVariables.access_token;
const pixel_id = fbVariables.pixel_id;
const api = bizSdk.FacebookAdsApi.init(access_token);

let current_timestamp = Math.floor(new Date() / 1000);

// in general, remove whitespaces and all lowercase characters, check https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
// for details
const userData = new UserData()
	.setEmails(['julio.faria@rocky.ag'])
	.setPhones(['+5511912345678'])
	.setFirstNames(['joao'])
	.setLastNames(['silva'])
	.setDatesOfBirth(['AAAAMMDD'])
	.setGenders(['m | f'])
	.setCities(['saopaulo'])
	.setStates(['sp'])
	.setZips(['12345'])
	.setCountries(['br'])
	// It is recommended to send Client IP and User Agent for Conversions API Events.
	.setClientIpAddress(request.connection.remoteAddress)
	.setClientUserAgent(request.headers['user-agent'])
	.setFbp('fb.1.1558571054389.1098115397')
	.setFbc('fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890');

const content = new Content()
	.setId('product123')
	.setQuantity(1)
	.setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);

const customData = new CustomData()
	.setContents([content])
	.setCurrency('usd')
	.setValue(123.45);

const serverEvent = new ServerEvent()
	.setEventName('Purchase')
	.setEventTime(current_timestamp)
	.setUserData(userData)
	.setCustomData(customData)
	.setEventSourceUrl('http://jaspers-market.com/product/123')
	.setActionSource('website');

const eventsData = [serverEvent];
const eventRequest = new EventRequest(access_token, pixel_id).setEvents(
	eventsData
);

eventRequest.execute().then(
	(response) => {
		console.log('Response: ', response);
	},
	(err) => {
		console.error('Error: ', err);
	}
);
