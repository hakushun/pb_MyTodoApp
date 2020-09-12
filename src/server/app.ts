import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join('./', 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use((_req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Referrer-Policy', 'same-origin');
	res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
	res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
	next();
});

app.get('/api/todos', (_req: Request, res: Response) => {
	fs.readFile('./src/data/todos.json', 'utf8', (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		res.type('json');
		res.json(data);
	});
});
app.get('/api/projects', (_req: Request, res: Response) => {
	fs.readFile('./src/data/projects.json', 'utf8', (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		res.type('json');
		res.json(data);
	});
});
app.post('/api/todos', (req: Request, res: Response) => {
	const json = JSON.stringify(req.body);
	fs.writeFile('./src/data/todos.json', json, 'utf8', (err) => {
		if (err) {
			console.log(err);
			return;
		}
		res.redirect('/');
	});
});
app.post('/api/projects', (req: Request, res: Response) => {
	const json = JSON.stringify(req.body);
	fs.writeFile('./src/data/projects.json', json, 'utf8', (err) => {
		if (err) {
			console.log(err);
			return;
		}
		res.redirect('/');
	});
});

app.listen(port, () => {
	// eslint-disable-next-line no-console
	console.log(`http://localhost:${port} で起動しています。`);
});
