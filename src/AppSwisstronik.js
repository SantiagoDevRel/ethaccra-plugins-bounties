import logo from "./logo.svg";
import "./App.css";
// import modules
import { Web3 } from "web3";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import ABI from "./abi.mjs";

function App() {
  // initialize provider (RPC endpoint or injected provider)
  const web3 = new Web3(window.ethereum);
  // register plugin
  web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com/"));

  async function usePlugin() {
    // initialize the contract
    const erc20 = new web3.eth.Contract(ABI, "0xfb8ff26f5267c93a85f6ac771efb61f792fde2af");

    const result = await erc20.methods.name().call();
    const result2 = await erc20.methods.decimals().call();
    console.log("name", result);
    console.log("decimals", result2);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={usePlugin}>DO Something</button>
      </header>
    </div>
  );
}

export default App;
