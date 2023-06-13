import Feed from "@components/Feed";

const Home = ()=>{
  return <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Sample NextJS App
        <br className="max-hd:hidden"/>
        <span className="orange_gradient text-center">version 13.4</span>
      </h1>
      <p className="desc text-center">
        Create a sample nextJs App to test framework features.
        Using authentication (Google SSO provider), backend (NodeJS) and
        database (Mongodb). 
      </p>
      {/* Render Feed */}
      <Feed/>
    </section>
}

export default Home;