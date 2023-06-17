const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function insertNode(label, parentId = null, res) {
	try {
		const newNode = await prisma.Node.create({
			data: {
				label,
				parentId,
			},
		})
		res.status(200).json(newNode)
	} catch (error) {
		res.status(500).json({ message: 'An error occurred while adding the child node: ' + error });
	}
}

module.exports = insertNode;
