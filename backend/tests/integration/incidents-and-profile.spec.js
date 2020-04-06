const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Incidents', () => {
	const ong_id = generateUniqueId();

	beforeAll(async () => {
		await connection.migrate.rollback();// reseting / cleaningtest DB
		await connection.migrate.latest();// migrating again
	});

	afterAll(async () => {
		await connection.destroy();
	});

	it('should create a new Incident for the current ONG session, and then test its profile', async () => {
		
		// Testing new incident creation
		const response = await request(app).post('/incidents')
			.set({ authorization: ong_id })
			.send({
				title: "Test Incident",
				description: "Full description of test incident to register",
				value: 100
			});

		expect(response.body).toHaveProperty('id');

		const isBodyIDInteger = Number.isInteger(Number(response.body.id));

		expect(isBodyIDInteger).toBeTruthy();

		// Testing get profile
		const profileResponse =  await request(app).get('/profile')
			.set({ authorization: ong_id });
		
		const [ profile ] = profileResponse.body; // destructuring array

		const isProfileIDInteger = Number.isInteger(Number(profile.id)); // boolean to check if incident in profile is an integer
		
		// checking types
		expect(profile).toMatchObject({
			id: expect.any(Number),
			title: expect.any(String),
			description: expect.any(String),
			value: expect.any(Number),
			ong_id: expect.any(String),
		});

		//then IDs requirements
		expect(isProfileIDInteger).toBeTruthy();
		expect(profile.ong_id).toHaveLength(8);
	});

	it('should delete an existing Incident for the current ONG session', async () => {

		const response = await request(app).delete('/incidents/1')
			.set({ authorization: ong_id }).send();

		expect(response.status).toBe(204);
	});
});
