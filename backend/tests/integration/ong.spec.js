const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
//use this as example to test all routes!


describe('ONG', () => {
   beforeEach(async () => {
      await connection.migrate.rollback();// reseting test DB
      await connection.migrate.latest();
   });

   afterAll(async () => {
      await connection.destroy();
   })

   it('should create a new ONG', async () => {
      const response = await request(app).post('/ongs').send({
            name: "APAD",
            email:"apad@podepa.org",
            whatsapp: "91231233210",
            city: "São Paulo",
            uf: "SP"
      })
   
   expect(response.body).toHaveProperty('id');
   expect(response.body.id).toHaveLength(8);
   });
});
