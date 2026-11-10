import type { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Add Your Suboxone Clinic — List Your MAT Practice',
    description: "Free listing \u2014 public contact details included",
};
import SubmitFormClient from '@/components/SubmitFormClient';
export default function SubmitPage(){return <main className="max-w-3xl mx-auto px-4 py-12"><h1>Add your free clinic listing</h1><p>Submissions are reviewed before publication.</p><SubmitFormClient/></main>}
