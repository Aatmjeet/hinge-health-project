const get_prisma_client = require('../prisma/get_prisma_client')

const prisma = get_prisma_client()

// Retrieve and build the nested tree
async function retrieveNestedTree() {
	const rootNodes = await prisma.Node.findMany({ where: { parentId: null } });
	const nestedTree = [];

	for (const node of rootNodes) {
		nestedTree.push(await buildNestedTree(node));
	}

	return nestedTree;
}

// Helper function to build the nested tree recursively
async function buildNestedTree(node) {
	const children = await prisma.Node.findMany({ where: { parentId: node.id } });
	const nestedTreeNode = {
		[node.id]: {
			label: node.label,
			children: [],
		},
	};

	for (const child of children) {
		nestedTreeNode[node.id].children.push(await buildNestedTree(child));
	}

	return nestedTreeNode;
}

module.exports = retrieveNestedTree;
