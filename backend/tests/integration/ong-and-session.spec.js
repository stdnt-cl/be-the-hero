const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
//use this as example to test all routes!


describe('ONG', () => {
   beforeAll(async () => {
      await connection.migrate.rollback();// reseting test DB
      await connection.migrate.latest();
   });

   afterAll(async () => {
      await connection.destroy();
   });

   it("should create a new ONG,login in a Session after it got created an then finally test its profile", async () => {
      const response = await request(app).post('/ongs').send({
         name: "APAD",
         email:"apad@podepa.org",
         whatsapp: "91231233210",
         city: "São Paulo",
         uf: "SP"
      });

      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toHaveLength(8);

      
      const sessionResponse = await request(app).post('/sessions').send({
         id: response.body.id
      });

      expect(sessionResponse.body).toHaveProperty('name');
      expect(sessionResponse.body.name).toBe('APAD');
   });
});
