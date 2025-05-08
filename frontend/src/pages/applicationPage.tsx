import ApplicationForm from "@/pages/applicationForm";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ApplicationPage() {
    return(
        <>
            <Header />
            <div className="p-8">
                <ApplicationForm />
            </div>
            
            <Footer />
        </>
    )
}