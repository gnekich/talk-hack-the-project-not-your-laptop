import FirebaseAuthDemo from "../components/FirebaseAuthDemo";
import SpeakerNotes from "../components/SpeakerNotes";
import PasswordGlitchTypeEffectText from "../components/CyberpunkPasswordEffect";

function Slide() {
  return (
    <>
      <section>
        <section>
          <h2><a><PasswordGlitchTypeEffectText reanimateEveryMs={5000} toReanimateChildren={'Demo'}>
                         Hack the planet!
                      </PasswordGlitchTypeEffectText></a></h2>
          <p>PoC: Registration, login, logout, verification bypass</p>
        </section>

      <section>
          <h2>Demo Gods have mercy!</h2>
          <p>- every DEFCON since 1993</p>
        </section>

        <section>
          <h3>Demo</h3>
          <FirebaseAuthDemo />
          <SpeakerNotes>
            Ovdje demonstriramo stvarni tok registracije, prijave i logouta, te
            prikazujemo status verifikacije i JWT token na desnoj strani.
          </SpeakerNotes>
        </section>

      </section>
    </>
  );
}

export default Slide;
