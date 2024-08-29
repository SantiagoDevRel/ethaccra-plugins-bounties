import logo from "./logo.svg";
import "./App.css";
// import modules
import { Web3 } from "web3";
import { ORAPlugin, Chain, Models } from "@ora-io/web3-plugin-ora";

function App() {
  // initialize provider (RPC endpoint or injected provider)
  const web3 = new Web3(window.ethereum);

  // register plugin
  web3.registerPlugin(new ORAPlugin(Chain.SEPOLIA));

  async function usePlugin() {
    const PROMPT = "generate an image of a person from ghana";

    const estimateFee = await web3.ora.estimateFee(Models.STABLE_DIFFUSION);
    console.log("fee", estimateFee);

    //connect metamask
    const accounts = await web3.eth.requestAccounts();
    console.log("accounts connected:", accounts);

    //send tx
    const receipt = await web3.ora.calculateAIResult(accounts[0], Models.STABLE_DIFFUSION, PROMPT, estimateFee);
    console.log(receipt.transactionHash);
  }

  async function fetchResult() {
    //fetch result
    const PROMPT = "generate an image of a person from ghana";

    const result = await web3.ora.getAIResult(Models.STABLE_DIFFUSION, PROMPT);
    console.log(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={usePlugin}>generate AI</button>
        <button onClick={fetchResult}>fetch result</button>
      </header>
    </div>
  );
}

export default App;
