const request = require('supertest');
const expect = require('chai').expect;

const basicSetup = './basicSetup.js';
const app = require('../Api.js');
let user = require('../users.model.js');

const newUser = new user({
    username: "username123",
    password: "password123",
    email: "username@gmail.com",
    phone: "",
    preferences: {
        city: "",
        state: "",
        typePref: "",
        agePref: "",
        genderPref: ""
    }
});

let newUserEmail;

beforeAll(async() =>{
    await basicSetup.connect();

    await newCoach.save(function(err, newUser){
        newUserEmail = newUser.email;
    })
});

afterAll(async() =>{
    await basicSetup.clearDatabase();
    await basicSetup.closeDatabae();
    app.close();
});

//Test get users from db
describe('GET all users', ()=>{
    it('valid data', async()=>{
        await request(app).get('/users')
        .then(res=>{
                expect(res.statusCode).to.equal(200);
                expect(res.body[0].email).to.equal(newUser.email);
            });
    });
});

//Test get specific user by email
describe('GET specific user by email', ()=>{
    it('valid data', async()=>{
        await request(app).get('/users/' + newUserEmail)
            .then(res=>{
                expect(res.statusCode).to.equal(201);
            });
    });
});

//Test add user route
describe('POST: save new user', ()=>{
    it('inserted data', async()=>{
        let sendData = {
            username: "username321",
            password: "321drowssap",
            email: "joesmith@gmail.com",
            phone: "8172536260",
            preferences: {
                city: "Erie",
                state: "PA",
                typePref: "",
                agePref: "",
                genderPref: ""
            }
        };

        await request(app).post('/users')
            .send(sendData)
            .then(res=>{
                expect(res.statusCode).lessThanOrEqual(202);
                expect(res.body.email).to.include(sendData.email);
            });
    });
});

//Test update user route
describe('PATCH: update a user', ()=>{
    it('updated user info', async()=>{
        let sendData = {
            username: "username123",
            password: "password123",
            email: "username@gmail.com",
            phone: "",
            preferences: {
                city: "Cleveland",
                state: "OH",
                typePref: "",
                agePref: "",
                genderPref: ""
    }
        };

        await request(app).patch('/users/' + newUserEmail)
            .send(sendData)
            .then(res=>{
                expect(res,statusCode).to.equal(203);
                expect(res.body.city).to.equal("Cleveland");
            });
    });
});

//Test delete user route
describe('DELETE user', ()=>{
    it('deleted user\'s email', async()=>{
        await request(app).delete('/users/' + newUserEmail)
            .then(res=>{
                expect(res,statusCode).to.equal(204);
            });
    });
});