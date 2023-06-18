const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const retrieveNestedTree = require("./controller/get_tree");
const insertNode = require("./controller/insert_node");


const app = express();

app.use(cors())

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


// Read and retrieve the nested tree endpoint
app.get('/api/tree', async (req, res) => {
	try {
		const nestedTree = await retrieveNestedTree();
		res.status(200).json(nestedTree);
	} catch (error) {
		res.status(500).json({ error: 'Error retrieving nested tree' });
	}
});

// Endpoint to add a child to a given parent node
app.post('/api/tree', async (req, res) => {
	const { label, parentId } = req.body;

	// label is required field
	if (!!!label){
		res.status(400).json({error: "Missing required fields"})
	}
	else{
		await insertNode(label, parentId, res)
	}
});


// Start the server
app.listen(3001, () => {
	console.log('Server started on port 3001');
});

