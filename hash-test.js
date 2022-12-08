import { createHash } from 'crypto';

function hash(string) {
	return createHash('sha256').update(string).digest('hex');
}

console.log(hash('julio.faria@rocky.ag'));
