import "@styles/globals.css"
import Nav from "@components/Nav"
import Footer from "@components/Footer"
import Provider from "@components/Provider"

export const metadata = {
  title:"Sample NextJs 13.4 App",
  description: "Testing NextJs framework"
}

const Layout = ({children})=>{
  return <html lang="en">
    <body>
      <Provider>
        <div className="main">
          <div className="gradient"/>
        </div>
        <main className="app">
          <Nav/>
          {children}
        </main>
        <Footer/>
      </Provider>
    </body>
  </html>
}

export default Layout;