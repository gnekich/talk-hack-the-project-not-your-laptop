import { useEffect, useMemo, useState } from "react";
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { FirebaseApp, getApps, initializeApp } from "firebase/app";

type DemoUser = {
  uid: string;
  email: string;
  emailVerified: boolean;
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.length > 0,
);

function makeDemoJwt(email: string, emailVerified: boolean) {
  const payload = {
    sub: `demo-${email.replace(/[^a-z0-9]/gi, "")}`,
    email,
    email_verified: emailVerified,
    aud: "demo-demo",
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  return `demo.${btoa(JSON.stringify(payload))}.jwt`;
}

function FirebaseAuthDemo() {
  const [email, setEmail] = useState("demo@company.test");
  const [password, setPassword] = useState("Password123!");
  const [status, setStatus] = useState(
    hasFirebaseConfig
      ? "Firebase initialized. Use the demo to show the verification flow."
      : "Demo mode active: Firebase config is missing, so the flow is simulated.",
  );
  const [authState, setAuthState] = useState<Auth | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const [jwtToken, setJwtToken] = useState<string>("");

  useEffect(() => {
    if (!hasFirebaseConfig) {
      return;
    }

    try {
      const app: FirebaseApp = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
      const auth = getAuth(app);
      setAuthState(auth);

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setFirebaseUser(user);

        if (user) {
          try {
            const tokenResult = await user.getIdTokenResult();
            setJwtToken(tokenResult.token);
            setStatus(
              user.emailVerified
                ? "User is verified and a valid token is present."
                : "User is not yet verified. The scanner path is simulated by opening the sign-in link.",
            );
          } catch {
            setJwtToken("");
          }
        } else {
          setJwtToken("");
        }
      });

      return () => unsubscribe();
    } catch (error) {
      setStatus(
        `Firebase initialization failed: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  }, []);

  const isLoggedIn = Boolean(firebaseUser || demoUser);
  const userDisplayName = useMemo(() => {
    if (firebaseUser?.email) {
      return firebaseUser.email;
    }

    return demoUser?.email ?? "Not signed in";
  }, [demoUser, firebaseUser]);

  const verificationStatus = useMemo(() => {
    if (firebaseUser) {
      return firebaseUser.emailVerified ? "VERIFIED" : "PENDING";
    }

    if (demoUser) {
      return demoUser.emailVerified ? "VERIFIED" : "PENDING";
    }

    return "NOT SIGNED IN";
  }, [demoUser, firebaseUser]);

  const handleRegister = async () => {
    if (!email || !password) {
      setStatus("Email and password are required.");
      return;
    }

    if (!hasFirebaseConfig || !authState) {
      const user = {
        uid: `demo-${Date.now()}`,
        email,
        emailVerified: false,
      };

      setDemoUser(user);
      setJwtToken(makeDemoJwt(email, false));
      setStatus("Demo account created. Verification email was prepared, but not yet confirmed.");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(authState, email, password);
      await sendEmailVerification(result.user);
      setStatus("User created and verification email has been sent.");
    } catch (error) {
      setStatus(
        `Registration failed: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setStatus("Email and password are required.");
      return;
    }

    if (!hasFirebaseConfig || !authState) {
      const user = {
        uid: `demo-${Date.now()}`,
        email,
        emailVerified: false,
      };

      setDemoUser(user);
      setJwtToken(makeDemoJwt(email, false));
      setStatus("Demo login successful. Verification is still pending until the scanner opens the link.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(authState, email, password);
      setStatus(
        result.user.emailVerified
          ? "Login successful and the user is already verified."
          : "Login successful. User waits for email verification.",
      );
    } catch (error) {
      setStatus(
        `Login failed: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  };

  const handleLogout = async () => {
    if (!hasFirebaseConfig || !authState) {
      setDemoUser(null);
      setJwtToken("");
      setStatus("Demo session ended.");
      return;
    }

    try {
      await signOut(authState);
      setStatus("Logout successful.");
    } catch (error) {
      setStatus(
        `Logout failed: ${error instanceof Error ? error.message : "unknown error"}`,
      );
    }
  };

  const simulateScannerAction = () => {
    if (!hasFirebaseConfig) {
      const user = demoUser ?? {
        uid: `demo-${Date.now()}`,
        email,
        emailVerified: false,
      };

      const verifiedUser = { ...user, emailVerified: true };
      setDemoUser(verifiedUser);
      setJwtToken(makeDemoJwt(email, true));
      setStatus("Security scanner opened the verification link and the account appears verified automatically.");
      return;
    }

    if (!firebaseUser) {
      setStatus("No active Firebase user to verify. Register or log in first.");
      return;
    }

    setStatus(
      "Demonstration path: email security scanner opens the verification link, which would mark the Firebase user as verified without a human click.",
    );
    setJwtToken(firebaseUser.uid ? `firebase.${firebaseUser.uid}.${Date.now()}` : jwtToken);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 0.8fr",
        gap: "18px",
        width: "100%",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          padding: "18px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(17, 17, 17, 0.45)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Firebase Auth PoC</h3>

        <div style={{ display: "grid", gap: "12px" }}>
          <label>
            <div style={{ marginBottom: "6px" }}>Email</div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ width: "90%", padding: "10px 12px", borderRadius: "8px" }}
            />
          </label>

          <label>
            <div style={{ marginBottom: "6px" }}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ width: "90%", padding: "10px 12px", borderRadius: "8px" }}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "16px",
          }}
        >
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLogout}>Logout</button>
          {/* <button onClick={simulateScannerAction}>Scanner opens link</button> */}
        </div>

        <p style={{ marginTop: "16px", fontSize: "0.9em", color: "#d0d7de" }}>
          {status}
        </p>
      </div>

      <aside
        style={{
          padding: "18px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(10, 20, 30, 0.7)",
          overflowWrap: "anywhere",
        }}
      >
        <h4 style={{ marginTop: 0 }}>User status</h4>
        <p>
          <strong>User:</strong> {userDisplayName}
        </p>
        <p>
          <strong>Verification:</strong> <a style={{ color: (verificationStatus === "VERIFIED" ? "green" : "red") }}>{verificationStatus}</a>
        </p>
        <p>
          <strong>Auth session:</strong> {isLoggedIn ? "ACTIVE" : "INACTIVE"}
        </p>

        <h4 style={{ marginBottom: "8px" }}>JWT token</h4>
        <pre
          style={{
            fontSize: "0.56em",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            background: "rgba(0,0,0,0.2)",
            padding: "10px",
            borderRadius: "8px",
            height: "120px",
            overflow: "auto"
          }}
        >
          {jwtToken || "No token yet"}
        </pre>
      </aside>
    </div>
  );
}

export default FirebaseAuthDemo;
