import { createHash } from 'crypto';

// Create sha256 hash
// If e-mail use hashEmail
// If phone number, use this hash directly
// Make sure the phone number follows E164 standard Ex: +5512345678901
export const hash = (string) => {
	const normalizedString = string.trim().toLowerCase();
	return createHash('sha256').update(normalizedString).digest('hex');
};

// Hash and format e-mail address
// Remove all periods (.) that precede the domain name in 'gmail.com' and 'googlemail.com' e-mail addresses.
export const hashEmail = (email) => {
	let normalizedEmail = email.toLowerCase();
	const emailParts = normalizedEmail.split('@');
	if (
		emailParts.length > 1 &&
		(emailParts[1] === 'gmail.com' || emailParts[1] === 'googlemail.com')
	) {
		emailParts[0] = emailParts[0].replace('.', '');
		normalizedEmail = `${emailParts[0]}@${emailParts[1]}`;
	}
	return hash(normalizedEmail);
};
