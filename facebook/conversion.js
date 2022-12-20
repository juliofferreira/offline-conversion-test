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

// In general, remove whitespaces and all lowercase characters, lib hashes automatically.
// Check https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
// for details
const userData = new UserData()
	.setEmails(['julio.faria@rocky.ag'])
	.setPhones(['+5511912345678'])
	.setFirstNames(['joao'])
	.setLastNames(['silva'])
	.setDatesOfBirth(['AAAAMMDD'])
	.setGenders(['m|f'])
	.setCities(['saopaulo'])
	.setStates(['sp'])
	.setZips(['12345'])
	.setCountries(['br']);

const content = new Content()
	.setId('course123')
	.setQuantity(1)
	.setCategory('course_area')
	.setTitle('course_name');

const customData = new CustomData()
	.setContents([content])
	.setCurrency('brl')
	.setValue(123.45)
	.setOrderId('abc123');

const serverEvent = new ServerEvent()
	.setEventName('Purchase')
	.setEventTime(current_timestamp)
	.setUserData(userData)
	.setCustomData(customData)
	// Must be 'email' | 'website' | 'app' | 'phone_call' | 'chat' | 'physical_store' | 'system_generated' | 'other'
	.setActionSource('system_generated');

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
