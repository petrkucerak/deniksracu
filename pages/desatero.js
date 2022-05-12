import Meta from "../components/meta";
import Footer from "../components/footer";
import Section from "../components/section";
import SectionHeader from "../components/section-header";
import SectionBody from "../components/section-body";

export default function Desatero() {

  return (
    <>
      <Meta />
      <h1 className="text-center text-4xl font-bold my-2">
        Sráčova desatero
      </h1>
      <Section>
        <SectionHeader title="přikázání"/>
        <SectionBody>
        </SectionBody>
      </Section>
      <Footer />
    </>
  );
}
