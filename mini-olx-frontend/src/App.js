import './App.css';
import { useState, useEffect } from "react";
import PostingForm from "./components/PostingForm/PostingForm";
import Ads from "./components/Ads/Ads";
import config from "./config";
import { Divider } from "antd";
import Title from "antd/lib/typography/Title";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";


function App() {

  //    [ value, the change func]
  const [ads, setAds] = useState([]);

  const fetchAllAds = () => {
    fetch(config.api_ads)
      .then((res) => res.json())
      .then((response) => setAds(response.data))
      .catch((err) => console.error(err));
  };

  const handleOnDelete = (adId) => {
    if (!adId) {
      return;
    }
    fetch(`${config.api_ads}/${adId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((response) => fetchAllAds())
      .catch((err) => console.error(err));
  };


  useEffect(() => {
    fetchAllAds();
  }, []);

  const handleOnPostAd = () => {
    fetchAllAds();
  };

  return (
    <Layout>
      <Header>
        <Title className="header__title" > Mini OLX</Title >
      </Header >
      <Content>
        <div className="App" >
          <main>
            <PostingForm onPostAd={handleOnPostAd} />
            <Divider />

            <Ads ads={ads} onDeleteAd={handleOnDelete} />
          </main>
        </div>
      </Content>
      <Footer>Raquel D Michelon @ OLX Workshop ©2022</Footer>
    </Layout>
  );
}

export default App;
