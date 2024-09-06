import path from 'node:path';

export default function parserRouter(basedir, filePath) {

	let relativePath = path.relative(basedir, filePath).split('.js').join('');
	let route = relativePath.split('index').join('');

	if (!route) route = '/';
	
	return route;
}