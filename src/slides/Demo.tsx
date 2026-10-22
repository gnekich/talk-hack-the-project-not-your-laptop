import SpeakerNotes from "../components/SpeakerNotes";
import PasswordGlitchTypeEffectText from "../components/CyberpunkPasswordEffect";

function Slide() {
  return (
    <>
      <section>
        <section>
          <h2>
            <a>
              Demo
            </a>
          </h2>
          <p></p>
        </section>

        <section>
          <h2>Demo Gods have mercy!</h2>
          <p></p>
        </section>

        <section>
          <h3 style={{ textAlign: "left" }}>
            <a>$</a> command cheat sheet
          </h3>
          <pre>
            <code className="language-bash" data-noescape>{`cd demo/npm
npm install .
cat ./INFECTED_INSTALL_RAN.txt

rm -rf ./INFECTED_INSTALL_RAN.txt
pnpm install .

apt install python3-full
python3 -m venv /venv/default
source /venv/default/bin/activate

cd demo/python
pip install .
cat ./INFECTED_BUILD_RAN.txt

rm -rf ./INFECTED_BUILD_RAN.txt

pip install uv
uv pip install .
cat ./INFECTED_BUILD_RAN.txt
`}</code>
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
