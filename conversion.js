import { GoogleAdsApi, services } from 'google-ads-api';
import { createHash } from 'crypto';
import { variables } from './my-info.js';

const hash = (string) => {
	return createHash('sha256').update(string).digest('hex');
};

const client = new GoogleAdsApi({
	client_id: variables.client_id,
	client_secret: variables.client_secret,
	developer_token: variables.developer_token,
});

const main = async () => {
	const customerId = variables.customer_id;
	const conversionActionId = variables.conversion_action_id;

	const customer = client.Customer({
		customer_id: customerId,
		refresh_token: variables.refresh_token,
	});

	const clickConversion = {
		user_identifiers: [{ email: hash('julio.faria@rocky.ag') }],
		conversion_action: `customers/${customerId}/conversionActions/${conversionActionId}`,
		conversion_date_time: '2022-08-12 00:00:00-03:00',
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

main();
