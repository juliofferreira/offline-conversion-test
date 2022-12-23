import { GoogleAdsApi, services } from 'google-ads-api';
import { hash, hashEmail } from './hash.js';
import { adsVariables } from './variables.js';

const client = new GoogleAdsApi({
	client_id: adsVariables.client_id,
	client_secret: adsVariables.client_secret,
	developer_token: adsVariables.developer_token,
});

const sendClickConversion = async () => {
	const customerId = adsVariables.customer_id;
	const conversionActionId = adsVariables.conversion_action_id;

	const customer = client.Customer({
		customer_id: customerId,
		login_customer_id: adsVariables.login_customer_id,
		refresh_token: adsVariables.refresh_token,
	});

	const clickConversion = {
		user_identifiers: [
			{
				email: hashEmail('julio.faria@rocky.ag'),
				phone_number: hash('+5512345678901'),
			},
		],
		conversion_action: `customers/${customerId}/conversionActions/${conversionActionId}`,
		// Format yyyy-mm-dd hh:mm:ss+|-timezone (timezone might be optional, check documentation)
		conversion_date_time: '2022-08-12 00:00:00-0300',
		conversion_value: 123,
		currency_code: 'BRL',
	};

	try {
		const request = new services.UploadClickConversionsRequest({
			customer_id: customerId,
			conversions: [clickConversion],
		});

		await customer.conversionUploads.uploadClickConversions(request);
	} catch (e) {
		console.log(e);
	}
};

sendClickConversion();
