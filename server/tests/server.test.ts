import request from "supertest";
import app from "../src/app"; // Adjust the path to your app file
import mongoose from "mongoose";

// Set up a mock database
beforeAll(async () => {
  const mongoURI =
    process.env.MONGO_URI || "mongodb://mongo:27017/articlesDB-dev";
  mongoose
    .connect(mongoURI)
    .then(() => console.log("MongoDB connected: ", mongoURI))
    .catch((err) => console.log(err));
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  console.log("Database dropped.");
  await mongoose.connection.close();
});

describe("Users API", () => {
  it("should create a new user", async () => {
    const user = { name: "Gal Trodel", email: "gt@example.com" };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(201);
    expect(response.body).toContain("User created successfully with id:");
  });

  it("should retrieve all users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("invalid body should not create a new user", async () => {
    const user = { name: "Gal Trodel" };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
  });
  it("unique email should not create a new user", async () => {
    const user = { name: "Gal Trodel", email: "gt@examplecom" };
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid email format");
  });
  it("should retrieve a user by ID", async () => {
    const user = { name: "Gal Trodel2", email: "gt2@example.com" };
    const createdUser = await request(app).post("/users").send(user);
    const id: string = createdUser.body.substring(
      createdUser.body.indexOf(":") + 1
    );
    const response = await request(app).get(`/users/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(user.name);
  });
});

describe("Articles API", () => {
  it("should create a new article", async () => {
    const article = {
      title: "Test Article",
      content: "This is a test article.",
      author: "Author Name",
    };
    const response = await request(app).post("/articles").send(article);
    expect(response.status).toBe(201);
    expect(response.body).toContain("Article created successfully with id:");
  });

  it("should retrieve all articles", async () => {
    const response = await request(app).get("/articles");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
  });

  it("should retrieve an article by ID", async () => {
    const article = {
      title: "Another Article",
      content: "Content of the article.",
      author: "Author",
    };
    const createdArticle = await request(app).post("/articles").send(article);
    const id: string = createdArticle.body.substring(
      createdArticle.body.indexOf(":") + 1
    );
    const response = await request(app).get(`/articles/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(article.title);
  });

  it("should find a string in article content", async () => {
    const article = {
      title: "Search Test",
      content: "Find this string in the article.",
      author: "Author",
    };
    const createdArticle = await request(app).post("/articles").send(article);
    const id: string = createdArticle.body.substring(
      createdArticle.body.indexOf(":") + 1
    );
    const response = await request(app).get(`/articles/find/string`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          article_id: id,
          offsets: expect.arrayContaining([10]),
        }),
      ])
    );
  });

  it("should find a string in some article content", async () => {
    const response = await request(app).get(`/articles/find/i`);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
  });
});

describe("Comments API", () => {
  it("should create a new comment", async () => {
    const articles = await request(app).get("/articles");
    const comment = {
      content: "This is a test comment.",
      article_id: articles.body[0]._id,
    };
    const response = await request(app).post("/comments").send(comment);
    expect(response.status).toBe(201);
    expect(response.body).toContain("Comment created successfully with id:");
    const comment2 = {
      content: "This is a test comment2.",
      article_id: articles.body[1]._id,
    };
    const response2 = await request(app).post("/comments").send(comment2);
    expect(response2.status).toBe(201);
    expect(response2.body).toContain("Comment created successfully with id:");
  });

  it("should retrieve all comments", async () => {
    const response = await request(app).get("/comments");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("should retrieve a comment by ID", async () => {
    const articles = await request(app).get("/articles");
    const comment = {
      content: "Specific comment.",
      article_id: articles.body[0]._id,
    };
    const createdComment = await request(app).post("/comments").send(comment);
    const id: string = createdComment.body.substring(
      createdComment.body.indexOf(":") + 1
    );
    const response = await request(app).get(`/comments/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.content).toBe(comment.content);
  });

  it("invalid article_id should not create a new comment", async () => {
    const comment = {
      content: "Specific comment.",
      article_id: "article_id",
    };
    const createdComment = await request(app).post("/comments").send(comment);
    expect(createdComment.status).toBe(404);
    expect(createdComment.body.error).toBe(
      "Comment must be related to an existing article"
    );
  });
});
