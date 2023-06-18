const { PrismaClient } = require('@prisma/client');
const request = require('supertest');


const { execSync } = require("child_process")
const testPrisma = require("../prisma/prisma_test_client")

// Import app, so it starts
const app = require('../app');

require("dotenv").config()

describe('Tree API test', () => {
	beforeAll(async () => {
		// Run migrations against the test database
		execSync(`DATABASE_URL=${process.env.TEST_DATABASE_URL} prisma migrate deploy`);

		await testPrisma.$connect();
	})

	// This hook runs before each test case
	beforeEach(async () => {
		// Clear the user table before each test
		await testPrisma.Node.deleteMany();
	});

	afterAll(async () => {
		// Close the Prisma client connection after all __tests__
		await testPrisma.$disconnect();
	});

	describe('POST /api/tree', () => {
		it('It should create a root node', async () => {
			const treeNode = {
				label: 'root'
			};

			// Send a POST request to the API endpoint
			const response = await request("http://localhost:3001")
				.post('/api/tree')
				.send(treeNode)
				.expect(200);

			// Check the response body
			expect(response.body).toHaveProperty('id');
			expect(response.body.label).toBe(treeNode.label);

			// Check if the node is saved in the database
			const createdNodes = await testPrisma.Node.findMany({
				where: { label: treeNode.label },
			});

			// checking if the expected node exist or not
			const nodeWithLabel = createdNodes.find(obj => obj.label === treeNode.label)

			expect(nodeWithLabel).toBeTruthy()
			expect(nodeWithLabel).toBeDefined();
		});

		it('It should return 400 if required fields are missing', async () => {
			const invalidData = {
				parentId:2
			};

			// Send a POST request to the API endpoint
			const response = await request("http://localhost:3001")
				.post('/api/tree')
				.send(invalidData)
				.expect(400);

			// Check the response body
			expect(response.body).toHaveProperty('error');
			expect(response.body.error).toBe('Missing required fields');
		});

		it('It should create a node with given parentId', async () => {
			// creating a parent root node for test
			await testPrisma.Node.create({
				data: {
					id:1,
					label: "root",
					parentId: null,
				},
			})

			const nodeWithParent = {
				label:"ant",
				parentId:1
			};

			// Send a POST request to the API endpoint
			const response = await request("http://localhost:3001")
				.post('/api/tree')
				.send(nodeWithParent)
				.expect(200);

			// Check the response body
			expect(response.body).toHaveProperty('id');
			expect(response.body.label).toBe(nodeWithParent.label);
			expect(response.body.parentId).toBe(nodeWithParent.parentId);

			// Check if the node is saved in the database
			const createdNodes = await testPrisma.Node.findMany({
				where: { label: nodeWithParent.label },
			});

			// checking if the expected node exist or not
			const nodeWithLabelAndParent = createdNodes.find(obj => obj.label === nodeWithParent.label
				&& obj.parentId === nodeWithParent.parentId)

			expect(nodeWithLabelAndParent).toBeTruthy()
			expect(nodeWithParent).toBeDefined();
		});
	});
});
