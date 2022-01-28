import FormLocalTitle from "./form-local-title";
import FormSection from "./form-section";
import FormSectionBody from "./form-section-body";
import FormSectionHeader from "./form-section-header";

export default function FormBody() {
    return (
        <main className="flex flex-col items-center">
            <FormSection>
                <FormSectionHeader title="Lokace" />
                <FormSectionBody>
                    <FormLocalTitle title="Jaká je poloha svatyně sraní?" />
                </FormSectionBody>
            </FormSection>
            <FormSection>
                <FormSectionHeader title="Hodnocení" />
                <FormSectionBody>

                </FormSectionBody>
            </FormSection>
            <FormSection>
                <FormSectionHeader title="Sráč" />
                <FormSectionBody>

                </FormSectionBody>
            </FormSection>
        </main>
    )
}