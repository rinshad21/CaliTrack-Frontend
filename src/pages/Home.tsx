import Loading from "@/components/Loading";
import Banner from "../components/Banner";
import { Suspense,lazy } from "react";

const ContentSection = lazy(()=> import("../components/ContentSection"))
function Home() {
  return (
    <>
       <Banner />
      <Suspense fallback={<Loading/>}>
     
        <ContentSection />
        </Suspense>
    </>
  );
}

export default Home;
