import SpeakerNotes from "../components/SpeakerNotes";
import PasswordGlitchTypeEffectText from "../components/CyberpunkPasswordEffect";

function Slide() {
  return (
    <>
      <section>
        <section>
          <h2>
            <a>
              <PasswordGlitchTypeEffectText
                reanimateEveryMs={5000}
                toReanimateChildren={"Demo"}
              >
                Hack the project, not your laptop!
              </PasswordGlitchTypeEffectText>
            </a>
          </h2>
          <p>Walkthrough: install, isolate, contain, recover</p>
        </section>

        <section>
          <h2>Demo Gods have mercy!</h2>
          <p>- every DEFCON since 1993</p>
        </section>

        <section>
          <h3 style={{ textAlign: "left" }}>Demo plan</h3>
          <ol style={{ textAlign: "left" }}>
            <li>Start projekta na hostu vs u devcontaineru</li>
            <li>Install dependencyja i promatranje side-effectova</li>
            <li>Pokušaj pristupa osjetljivim resursima</li>
            <li>Container rebuild + credential rotate kao recovery</li>
          </ol>
          <SpeakerNotes>
            Fokus nije “wow exploit”, nego usporedba koliko je šteta ograničena
            kad je razvoj izoliran.
          </SpeakerNotes>
        </section>

        <section>
          <h3 style={{ textAlign: "left" }}>
            <a>$</a> command cheat sheet
          </h3>
          <pre>
            <code className="language-bash" data-noescape>{`# inside devcontainer
pnpm install --frozen-lockfile
pnpm audit

# optional Python example
pip install --require-hashes -r requirements.txt

# incident response drill
Dev Containers: Rebuild Container
rotate tokens + verify access logs`}</code>
          </pre>
          <SpeakerNotes>
            Ove naredbe su osnova za reproducibilan setup i brz reset nakon
            sumnjivog događaja.
          </SpeakerNotes>
        </section>
      </section>
    </>
  );
}

export default Slide;
