import React from 'react';
import ReactPlayer from 'react-player';
import ConnectWallet from "../components/ConnectWallet";
import SocialLogins from "../components/SocialLogins";

const Header = () => {
  return (
    <section className="af a2o a2p a38 a39 a3a a1E[150px] a1F">
      <div className="ar a2 a1 a3b a30 a4" />
      <div className="ae">
        <div className="a1R a3 a1S a5">
          <div className="a4 ak lg:a1T/2">

              <h1 className="font-bold mb-6 text-center text-3xl dark:text-white md:text-left lg:text-4xl xl:text-5xl pb-2">
               Museum Tourism meets Web3 + ZKP{' '}<br/>
                <span className="text-yellow-300 font-thin font-coiny">
                  Mint
                </span>{' '}
                your museum <br/> artifiacts today.
              </h1>
              <p className="font-bold text-justify text-2xl text-yellow-200">
              Museum 3 is the first user-friendly digital museum platform where visitors can explore exhibits, interact with content, and engage with the cultural heritage of places. It integrates ZKP protocols to authenticate user interactions without disclosing sensitive information, ensuring privacy and anonymity.
              </p>
              <div className="flex flex-wrap items-center mt-5">


                <div
                  className="a1Y a10 a5 a1Z a1f a1y a1z aP a1s aW aX aZ a1w hover:a1B hover:a1C"
                >
                <ConnectWallet />
                {/** 
                <SocialLogins />
                */}
                </div>
              </div>

          </div>
          <div className="a4 ak lg:a1T/2">
            <div className="a1L  ">
             {/**  <img src="/galverse/1.webp" alt="meta image" className="a1J aj" />
              Video */}
              <ReactPlayer
                playing
                url="logo/egypt.mp4"
                //  controls={true}
                width="100%"
                height="100%"
                loop
                 />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Header

