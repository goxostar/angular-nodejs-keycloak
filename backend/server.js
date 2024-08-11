const express = require("express");
const Keycloak = require("keycloak-connect");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors

const app = express();

// Session store setup
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Keycloak setup
const keycloak = new Keycloak(
  {},
  {
    realm: "goxoTestRealm", // Replace with your Keycloak realm
    "auth-server-url": "http://localhost:8080/",
    "ssl-required": "external",
    resource: "goxo-test-client1", // Replace with your Keycloak client ID
    "bearer-only": true, // Set bearer-only mode
    "confidential-port": 0,
  }
);

app.use(keycloak.middleware());
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:4200", // Allow only this origin
    credentials: true, // Allow cookies to be sent with the requests if needed
  })
);

// Protected route
app.get("/api/protected", keycloak.protect(), (req, res) => {
  const { preferred_username, given_name, family_name } =
    req.kauth.grant.access_token.content;

  res.json({
    username: preferred_username,
    name: given_name,
    surname: family_name,
  });
});

// Error handler for unauthorized access
app.use((err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).json({ error: "Not Authorized" });
  } else {
    next(err);
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
