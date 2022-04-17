import mongoose from "mongoose";
import Music from "../models/music";
import supertest from "supertest";
import app from "../server";

describe("Music feature", () => {
    beforeEach((done) => {
        mongoose.connect(process.env.DATABASE_URL, {}, () => done());
    });

    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            // console.log(`${mongoose.connection.db.databaseName} database dropped.`);
            mongoose.connection.close(() => done())
        });
    });

    it("Insert a new music", async () => {
        const music = {
            name: "Tsubasa",
            url: "https://open.spotify.com/track/6eaXmFdQKtNDzlR47oxIn1?si=07ebf913d47343a2",
            author: "Flameboi Matt",
            genre: "Vapor",
        };
        await supertest(app).post("/music").send(music)
            .expect(201)
            .then(async (response) => {
                let musics = await Music.find({});
                expect((response)._body._id).toBe(musics[0]._id.toString());
                expect((response)._body.name).toBe(musics[0].name);
                expect((response)._body.url).toBe(musics[0].url);
                expect((response)._body.genre).toBe(musics[0].genre);
            })
    });

    it("Get all musics", async () => {
        const music = await Music.create({
            name: "10K",
            url: "https://open.spotify.com/track/5vJcMOvHec5xRJrvo1MK2r?si=06ae79625d684d1e",
            author: "Raffa Moreira",
            genre: "Trap"
        });

        await supertest(app).get("/music")
            .expect(200)
            .then((response) => {
                expect(Array.isArray((response).body)).toBeTruthy();
                expect((response).body.length).toEqual(1);

                expect((response).body[0]._id).toBe(music.id);
                expect((response).body[0].name).toBe(music.name);
                expect((response).body[0].url).toBe(music.url);
                expect((response).body[0].author).toBe(music.author);
                expect((response).body[0].genre).toBe(music.genre);
            });
    });

    it("Get a music by ID", async () => {
        const music = await Music.create({
            name: "10K",
            url: "https://open.spotify.com/track/5vJcMOvHec5xRJrvo1MK2r?si=06ae79625d684d1e",
            author: "Raffa Moreira",
            genre: "Trap"
        });

        await supertest(app).get(`/music/${music._id}`)
            .expect(200)
            .then((response) => {
                expect(Array.isArray((response).body)).toBeFalsy();
                
                expect((response).body._id).toBe(music.id);
                expect((response).body.name).toBe(music.name);
                expect((response).body.url).toBe(music.url);
                expect((response).body.author).toBe(music.author);
                expect((response).body.genre).toBe(music.genre);
            });
    });

    it("Update music", async () => {
        const oldMusic = await Music.create({
            name: "10K",
            url: "https://open.spotify.com/track/5vJcMOvHec5xRJrvo1MK2r?si=06ae79625d684d1e",
            author: "Raffa Moreira",
            genre: "Trap"
        });

        const music = {
            name: "Morumbi",
            url: "https://open.spotify.com/track/7LZ8Wxwmw8rZ5VwAoiRxWW?si=cc090471ae264a27",
            author: "Lippi",
            genre: "Trap"
        }

        await supertest(app).put(`/music/${oldMusic._id}`).send(music)
            .expect(200)
            .then(async () => {
                const updatedMusic = await Music.findById(oldMusic._id);

                expect(updatedMusic.name).toBe(music.name);
                expect(updatedMusic.url).toBe(music.url);
                expect(updatedMusic.author).toBe(music.author);
                expect(updatedMusic.genre).toBe(music.genre);
            });
    });

    it("Delete music by ID", async () => {
        const music = await Music.create({
            name: "10K",
            url: "https://open.spotify.com/track/5vJcMOvHec5xRJrvo1MK2r?si=06ae79625d684d1e",
            author: "Raffa Moreira",
            genre: "Trap"
        });

        await supertest(app).delete(`/music/${music._id}`)
        .expect(200)
        .then(async () => {
            const musics = await Music.find({});
            expect(musics.length).toEqual(0);
        })
    });

})