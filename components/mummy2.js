import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import Web3Modal from 'web3modal'
import axios from "axios";
import { useRouter } from 'next/router'

import fileNFTABI from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddressShardeum } from "../config";

import fileNFTABI2 from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddressEtherLink } from "../config";

import fileNFTABI3 from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddressLinea } from "../config";

import fileNFTABI4 from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddressmorph } from "../config";

export default function ViewFile() {
  console.log('Entered viewing component');
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [fileNFT, setFileNFT] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  const image = "/egypt/2statue.avif"
  const image2 = "/egypt/antique.jpg"
  const image3 = "/egypt/asset1.jpg"
  
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    console.log('Entered UseEffect');
    checkNetwork();
    try {
    // arbitrum sepolia testnet
    if (window.ethereum.networkVersion == "59141")  {
      console.log('currently inside Linea Sepolia Testnet');
      setFileNFT(fileNFTABI3);
      setContractAddress(minterEgyptAddressLinea);
      return;
    } 
    // gnosis chiado testnet
    else if (window.ethereum.networkVersion == "8082") {
      console.log('currently inside Shardeum Sphnix Testnet');
      setFileNFT(fileNFTABI2);
      setContractAddress(minterEgyptAddressShardeum);
      return;
    } 
    // neon devnet
    else if (window.ethereum.networkVersion == "128123") {
      setFileNFT(fileNFTABI);
      setContractAddress(minterEgyptAddressEtherLink);
      console.log('currently inside EthernetLink Testnet');
      return;
    } 
    /**   // Morph Testnet
    else if (window.ethereum.networkVersion == "2710") {
      setFileNFT(fileNFTABI4);
      setContractAddress(minterEgyptAddressmorph );
      console.log('currently inside Morph Testnet');
      return;
    } 
     */
    else {
      router.push("/select");
      return;
    }
      
    } catch (error) {
      console.log(error);
    }
  }, []);



  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };
 
  const checkNetwork = async () => {
    try {
      if ((window.ethereum.networkVersion !== "128123") && (window.ethereum.networkVersion !== "8082") && (window.ethereum.networkVersion !== "59141")) {
        alert("Please connect to Linea Sepolia Testnet or Shardium Sphinx Testnet or EtherLink Testnet Blockchain! \n You can add it to your Wallet using \n https://chainlist.org/?testnets=true");
        router.push("/select");
        return;
      } 
      
    } catch (error) {
      console.log(error);
    }
  };


  async function Next() {
    router.push("/egypt3");
  }

   async function Mint2() {
    console.log("Minting NFT2");
    const url2 = "https://bafybeih6x7pjn4jjatjmgp4wewooa7g4vvch2xjudwyxyxo47risfehhbi.ipfs.dweb.link/asset13.jpg";
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    //const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(contractAddress, fileNFT.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log("Listing price is ", listingPrice)
    let transaction = await contract.createFile(url2, { value: listingPrice })
    await transaction.wait()
    alert("NFT Successfully minted");
  }

  async function Mint1() {
    console.log("Minting NFT1");
     const url = " https://bafybeih6x7pjn4jjatjmgp4wewooa7g4vvch2xjudwyxyxo47risfehhbi.ipfs.dweb.link/asset14.jpg";

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    let contract = new ethers.Contract(contractAddress, fileNFT.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log("Listing price is ", listingPrice)
    let transaction = await contract.createFile(url, { value: listingPrice })
    await transaction.wait()
    alert("NFT Successfully minted");

  }




  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div>
        <Navbar />
        <h1 className="px-20 py-10 text-3xl">You have not selected </h1>
        <Footer />
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section} className="bg-blue-100 ">
    <>
    <div className=" text-4xl text-center text-white font-bold ">
        <h1>The History</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 grid-rows-5 sm:grid-rows-3 lg:grid-rows-3 col-gap-2 row-gap-5 bg-gray-300 mx-20 my-5">

      <div className="col-start-1 col-end-3 sm:col-end-3 lg:col-end-3 row-span-2 sm:row-span-2 lg:row-span-2 text-white bg-indigo-500 text-4xl flex items-center justify-center border-4 border-red-500">

  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div className="shadow rounded-xl overflow-hidden">
      <img
        title="Car Pics"
        frameBorder="0"
        scrolling="no"
        height="450px"
        width="100%"
        src={`${image}#toolbar=0`}
        className="object-fill h-400 w-full"
      />
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold"> </p>
      </div>
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold"></p>
      </div>
    
      <div className="p-4">
        <p style={{ height: "50px" }} className="text-2xl font-semibold"> </p>
      </div>

    </div>

</div>
    
  </div>
	<div className="text-white bg-indigo-500 text-4xl flex items-center justify-center border-4 border-red-500">
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div className="rounded-xl overflow-hidden">
      <img
        title="Car Pics"
        frameBorder="0"
        scrolling="no"
        height="450px"
        width="100%"
        src={`${image2}#toolbar=0`}
        className="object-fill h-400 w-full"
      />


    </div>

</div>
    
    
  </div>
	<div className="row-span-3 text-black bg-white text-2xl flex text-left p-3 ">
   
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold underline">History </p>
      </div>
      <br/>
      <p>
      A new museum was established at Boulaq in 1858 in a former warehouse, following the foundation of the new Antiquities Department under the direction of Auguste Mariette. The building lay on the bank of the Nile River, and in 1878 it suffered significant damage owing to the flooding of the Nile River. In 1891, the collections were moved to a former royal palace, in the Giza district of Cairo. They remained there until 1902 when they were moved again to the current museum in Tahrir Square, built by the Italian company of Giuseppe Garozzo and Francesco Zaffrani to a design by the French architect Marcel Dourgnon.</p>
      <br/>
      <p>
      In 2004, the museum appointed Wafaa El Saddik as the first female director general.During the Egyptian Revolution of 2011, the museum was broken into, and two mummies were destroyed
        </p>


    </div>


  </div>
	<div className="text-white bg-indigo-500  text-4xl flex items-center justify-center border-4 border-red-500">
    
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div className="shadow rounded-xl overflow-hidden">
      <img
        title="Car Pics"
        frameBorder="0"
        scrolling="no"
        height="450px"
        width="100%"
        src={`${image3}#toolbar=0`}
        className="object-fill h-400 w-full"
      />

    </div>

</div>

</div>
<div className="grid grid-rows-2 lg:grid-cols-4 col-span-2 lg:col-span-3 text-white bg-indigo-500  text-2xl  items-center justify-center">
    
    <div className="p-4 bg-indigo-500 ">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full">
                    <a
                      className="social-icon-link github"
                      href="https://web3chat-holyaustin.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="chat"
                    >Chat 
                    </a>
                  </button>
                </div>
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Mint1()}> Mint NFT 1</button>
                </div>
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Mint2()}>Mint NFT 2</button>
                </div>
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Next()}>Next page</button>
                </div>
            
    </div>

   
</div>
    </>
      </Box>
  );
}

const styles = {
  section: {
    backgroundColor: '#101233',
    pt: [8, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
