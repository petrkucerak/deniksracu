import FormSection from "./form-section";
import FormSectionHeader from "./form-section-header";

export default function FormBody() {
    return (
        <main className="flex flex-col items-center">
            <FormSection>
                <FormSectionHeader title="Místo" />
            </FormSection>
            <FormSection>
                <FormSectionHeader title="Hodnocení" />
            </FormSection>
            <FormSection>
                <FormSectionHeader title="Sráč" />
            </FormSection>
        </main>
    )
}