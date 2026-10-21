import SpeakerNotes from "../components/SpeakerNotes";

function Slide() {
  return (
    <section>


      <section>
        <h2 style={{ textAlign: 'left' }}>
          <a>$</a> whoami
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              textAlign: "left",
            }}
          >
            <img
              src="assets/me.png"
              alt="Gordan Nekić"
              style={{
                width: "350px",
                borderRadius: "50%",
                marginBottom: "250px",
              }}
            />
          </div>
          <div style={{ textAlign: "left", maxWidth: "75%" }}>
            <p>
              <strong>Ime:</strong> <a
                style={{

                  display: 'inline-block',
                  transition: 'transform 0.25s ease',
                }}

              >G</a>ordan <a
                style={{

                  display: 'inline-block',
                  transition: 'transform 0.25s ease',
                }}

              >N</a>ekić
            </p>
            <p>
              <strong>Rola:</strong> Lead Engineer @ Elixirr Digital
            </p>
            <p>
              <strong>Opis:</strong> Programer, security entuzijast,
              zagovornik slobodnog i sigurnog interneta za sve, obožavam Open Source, and my crime is that of curiosity.
            </p>
            <p>
              <strong>Online prisutnost:</strong>
            </p>
            <ul style={{ padding: "0" }}>
              <li>
                <a href="https://bsky.app/profile/gordan.neki.ch" target="_blank">
                  Blue Sky: @gordan.neki.ch
                </a>
              </li>
              <li>
                <a href="https://github.com/gnekich" target="_blank">
                  GitHub: @gnekich
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/gnekich" target="_blank">
                  LinkedIn: @gnekich
                </a>
              </li>
              <li>
                <a href="https://bugcrowd.com/gnekich" target="_blank">
                  Bugcrowd: @gnekich
                </a>
              </li>
              <li>
                <a href="https://gordan.neki.ch" target="_blank">
                  Web (gordan.neki.ch)
                </a>
              </li>
              <li>
                <a href="https://bughunters.google.com/profile/b8c610e8-ee80-430f-ae37-5dba03bb304d/awards" target="_blank">
                  Google Bughunters
                </a>
              </li>
            </ul>
          </div>
        </div>
        <SpeakerNotes>
          A little about me, my name is Gordan Nekić, and I work as a Lead
          Engineer at Elixirr Digital.
          <br />
          <br />
          I am a programer with a great passion for computer security and an
          advocate for a free and secure internet.
          <br />
          <br />
          I am a big fan of Open Source and believe in sharing knowledge and
          collaborating on projects.
          <br />
          <br />
          On the screen, you can see several links where you can find me online,
          including Blue Sky, GitHub, LinkedIn, Bugcrowd, and my personal website.
          <br />
          <br />
          If you have any questions or want to learn more about me, feel free to
          reach out through these platforms.
        </SpeakerNotes>
      </section>
      <section>
        <h2 style={{ textAlign: 'left' }}>
          <a>$</a> weird_flex
        </h2>
        <p>
          Kako me pronaći? Ako odete na Google Bughunters listu filtrirajte pod Croatia. (za sada jedini iz Hrvatske)
        </p>
         <div
            
          >
            <img
              src="assets/google-leaderboard-croatia.png"
              alt="Gordan Nekić"
              style={{
               height: "450px",
              }}
            />
          </div>
        <SpeakerNotes>
          Nadam se da će mi se netko možda upravo od vas uskoro i pridružiti.
        </SpeakerNotes>
      </section>
    </section>

  );
}

export default Slide;
