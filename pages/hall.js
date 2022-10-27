import Meta from "../components/meta";
import Footer from "../components/footer";
import Section from "../components/section";
import SectionHeader from "../components/section-header";
import SectionBody from "../components/section-body";
import LocalTitle from "../components/local-title";
import BackButton from "../components/back-button";

export default function Hall() {

  return (
    <>
      <Meta />
      <BackButton />
      <h1 className="text-center text-4xl font-bold my-2">
        Síň sráčů
      </h1>
      <Section>
        <SectionHeader title="Sráči" />
        <SectionBody>
          <LocalTitle title="Legendy" subtitle="" />
          
        </SectionBody>
      </Section>
      <Footer />
    </>
  );
}
