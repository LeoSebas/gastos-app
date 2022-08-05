import Head from 'next/head'
import MainDescription from "../components/MainDescription";
import MainCoreFeatures from "../components/MainCoreFeatures/MainCoreFeatures";
import MainUsersOpinions from "../components/MainUsersOpinions";
import Footer from "../components/Footer";
import CustomHead from "../components/CustomHead";

export default function Home() {
    return (
        <div className=" flex flex-col items-center">
            <CustomHead title={"Ahorrar + App"} />
            <main className="container p-4 flex flex-col items-center scroll-smooth">
                <MainDescription />
                <MainCoreFeatures />
                <MainUsersOpinions />
            </main>
        </div>
    )
}
