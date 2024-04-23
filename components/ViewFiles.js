/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from 'next/router'
import { useNavigate, useLocation } from "react-router-dom";
import Web3Modal from "web3modal";
import Image from 'next/image';
import { rgba } from 'polished';
import Popup from 'reactjs-popup';

import fileNFTABI from "../artifacts/contracts/Egypt.sol/Egypt.json";
import fileNFTABI2 from "../artifacts/contracts/Badgry.sol/Badagry.json";
import { egyptAddressShardeum } from "../config";
import { egyptAddressEtherLink } from "../config";
import { egyptAddressLinea } from "../config";

export default function ViewFiles() {
  const router = useRouter();
  //const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loadingState2, setLoadingState2] = useState("not-loaded");
  const [fileNFT, setFileNFT] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [fileNFT2, setFileNFT2] = useState("");
  const [contractAddress2, setContractAddress2] = useState("");

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    console.log('Entered UseEffect');
    checkNetwork();
    try {
    // Linea Sepolia testnet
    if (window.ethereum.networkVersion == "59141")  {
      console.log('currently inside Linea Sepolia Testnet');
      setFileNFT(fileNFTABI);
      setContractAddress(egyptAddressLinea);     
      loadfileNFTLinea()
      return;
    } 
    // Etherlink testnet
    else if (window.ethereum.networkVersion == "128123") {
      console.log('currently inside Etherlink Testnet');
      setFileNFT(fileNFTABI);
      setContractAddress(egyptAddressEtherLink);
      loadfileNFTEtherLink()
      return;
    } 
    // Shardeum 
    else if (window.ethereum.networkVersion == "8082") {
      console.log('currently inside Shardeum ');
      setFileNFT(fileNFTABI);
      setContractAddress(egyptAddressShardeum);
      loadfileNFTShardeum();
      return;
    } 
    else {
      router.push("/");
      return;
    }
      
    } catch (error) {
      console.log(error);
    }
    
  }, []);

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

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  async function loadfileNFTShardeum () {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(egyptAddressShardeum, fileNFTABI.abi, signer);
    const data = await contract.fetchAllStorageItems();
/*
   
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log("i is ", i);
      console.log("i.tokenId ", i.tokenId);
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),

      };
      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");

    console.log ("END OF ITEM 1 START OF ITEM 2")
  }

  async function loadfileNFTEtherLink() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(egyptAddressEtherLink, fileNFTABI.abi, signer);
    const data = await contract.fetchAllStorageItems();
/*   
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),

      };
      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");

    console.log ("END OF ITEM 1 START OF ITEM 2")
  }

  async function loadfileNFTLinea() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(egyptAddressLinea, fileNFTABI.abi, signer);
    const data = await contract.fetchAllStorageItems();
/*
    
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log("i is ", i);
      console.log("i.tokenId ", i.tokenId);
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),

      };
      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");

    console.log ("END OF ITEM 1 START OF ITEM 2")
  }

  async function NewsDetails(nft) {
    console.log("item id clicked is", nft.tokenId);
    const vid = nft.tokenId;
    router.push({
        pathname: "/watch",
        query: {vid}
      });
      console.log('Prop result is ', { vid } )
  }

  const PosterImage = () => {
    return (
      <Image
        src={blenderPoster}
        layout="fill"
        objectFit="cover"
        priority
        placeholder="blur"
      />
    );
  };


  if ((loadingState === "loaded" && !nfts.length) && (loadingState === "loaded" && !nfts2.length)) {
    return ( 
      <div sx={styles.section}>
        <h1 className="px-20 py-10 text-3xl text-white">Empty drive, no file yet</h1>
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-red-400 text-4xl text-center text-white font-bold pt-5 pb-4">
        <h1> Museum 3 Marketplace</h1>
      </div>

      <div className="bg-red-400 text-2xl text-center text-black font-bold pt-5 pb-4">
        <h2>Egypt collections</h2>
      </div>
      <div className="flex justify-center bg-blue-100 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {nfts.map((nft, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              
              <img
                title="file NFT"
                height="auto"
                width="100%"
                objectfit="cover"
                src={`${nft.image}#toolbar=0&embedded=true`}
                //className="py-3 object-cover h-500"
                style={{ height: "300px", overflow: 'hidden' }}
              />
              <div className="p-1">
                <p style={{ height: "45px", overflow: 'hidden' }} className="text-xl text-blue-800 font-semibold leading-none"> {nft.name}      </p>
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <p className="text-gray-700 pt-2">Description : {nft.description} </p>
                </div>
                
              </div>

              <div className="p-2 bg-black">
                <button type="button" className="mt-1 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => NewsDetails(nft)}>Buy Collectible</button>
              </div>
  
              
            </div>
          ))}
        </div>
      </div>

      </div>
      


      <div className="bg-red-400 text-2xl text-center text-black font-bold pt-5 pb-4">
        
        <h2>Badagry Slave collections</h2>
      </div>
      <div className="flex justify-center bg-blue-100 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {nfts2.map((nft2, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              
              <img
                title="file NFT"
                height="auto"
                width="100%"
                objectfit="cover"
                src={`${nft2.image}#toolbar=0&embedded=true`}
                //className="py-3 object-cover h-500"
                style={{ height: "300px", overflow: 'hidden' }}
              />
              <div className="p-1">
                <p style={{ height: "45px", overflow: 'hidden' }} className="text-xl text-blue-800 font-semibold leading-none"> {nft2.name}      </p>
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <p className="text-gray-700 pt-2">Description : {nft2.description} </p>
                </div>
                
              </div>

              <div className="p-2 bg-black">
                <button type="button" className="mt-1 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => NewsDetails(nft2)}>Buy Collectible</button>
              </div>
  
              
            </div>
          ))}
        </div>
      </div>

    </div>
    </Box>
  );
}

const styles = {
  section: {
    backgroundColor: '#000',
    pt: [4, null, null, null, null],
    pb: [6, null, null, 12, 16],
  },
 };
