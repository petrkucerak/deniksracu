import Meta from "../components/meta";
import Footer from "../components/footer";
import Section from "../components/section";
import SectionHeader from "../components/section-header";
import SectionBody from "../components/section-body";
import LocalTitle from "../components/local-title";
import BackButton from "../components/back-button";
import { getData2HallOfShits } from "../lib/api";

export default function Hall({ nickNames }) {
  function compareScore(a, b) {
    return b.score - a.score;
  }
  return (
    <>
      <Meta />
      <BackButton />
      <h1 className="text-center text-4xl font-bold my-2">Síň sráčů</h1>
      <Section>
        <SectionHeader title="Sráči" />
        <SectionBody>
          <LocalTitle title="Legendy" subtitle="" />
          <ul>
            {nickNames.sort(compareScore).map((person) => {
              if (person.nickName === "Kajkaj" || person.nickName === "Adélka")
                return (
                  <li key={person.nickName} className={person.class}>
                    {person.title.replace("sráč", "sračka")}{" "}
                    <strong>{person.nickName}</strong>: {person.score}{" "}
                    {person.extension}{" "}
                  </li>
                );
              else
                return (
                  <li key={person.nickName} className={person.class}>
                    {person.title} <strong>{person.nickName}</strong>:{" "}
                    {person.score} {person.extension}
                  </li>
                );
            })}
          </ul>
        </SectionBody>
        <SectionHeader title="Ranky" />
        <SectionBody>
          <ul>
            <li className="srac-zelenac">Sráč zelenáč: 1+ trůnů</li>
            <li className="srac">Sráč: 5+ trůnů</li>
            <li className="srac-mazak">Sráč mazák: 20+ trůnů</li>
            <li className="velesrac">Velesráč: 50+ trůnů</li>
            <li className="megasrac">Megasráč: 100+ trůnů</li>
            <li className="gigasrac">Gigasráč: 200+ trůnů</li>
          </ul>
        </SectionBody>
      </Section>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const nickNames = getData2HallOfShits();

  return {
    props: { nickNames },
  };
}
