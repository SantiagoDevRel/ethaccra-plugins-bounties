import logo from "./logo.svg";
import "./App.css";
// import modules
import { Web3 } from "web3";
import { ZKsyncPlugin } from "web3-plugin-zksync";

function App() {
  // initialize provider (RPC endpoint or injected provider)
  const web3 = new Web3(window.ethereum);

  // register plugin
  web3.registerPlugin(new ZKsyncPlugin("https://sepolia.era.zksync.dev"));

  async function usePlugin() {
    const blockDetails = await web3.ZKsync.rpc.getBlockDetails(1000);
    console.log(blockDetails.timestamp);

    const mainContract = await web3.ZKsync.rpc.getMainContract();
    console.log(mainContract);
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
