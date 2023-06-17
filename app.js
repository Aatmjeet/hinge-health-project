const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require("cors")
const bodyParser = require("body-parser")
const retrieveNestedTree = require("./methods/get_tree");
const insertNode = require("./methods/insert_node");


const app = express();

app.use(cors())

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


// Read and retrieve the nested tree endpoint
app.get('/api/tree', async (req, res) => {
	try {
		const nestedTree = await retrieveNestedTree();
		res.json(nestedTree);
	} catch (error) {
		console.error('Error retrieving nested tree:', error);
		res.status(500).json({ error: 'Error retrieving nested tree' });
	}
});

// Endpoint to add a child to a given parent node
app.post('/api/tree', async (req, res) => {
	const { label, parentId } = req.body;

	await insertNode(label, parentId, res)
});


// Start the server
app.listen(3001, () => {
	console.log('Server started on port 3001');
});

