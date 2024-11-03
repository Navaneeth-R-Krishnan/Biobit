const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', 'connection-org1.json'); // Path to connection profile
const walletPath = path.join(process.cwd(), 'wallet'); // Path to wallet containing user identity

/**
 * Initialize Hyperledger Fabric connection
 * @returns {Gateway} Connected gateway instance
 */
async function initGateway() {
    try {
        // Load connection profile
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system wallet for managing identities.
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if the user identity exists in the wallet.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return null;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'appUser',
            discovery: { enabled: true, asLocalhost: true }
        });

        return gateway;
    } catch (error) {
        console.error(`Failed to connect to Hyperledger Fabric: ${error}`);
        return null;
    }
}

/**
 * Query drug details from the ledger using drugId
 * @param {string} drugId - The drug ID to query
 * @returns {Object|null} Drug details or null if an error occurs
 */
async function queryDrugDetails(drugId) {
    const gateway = await initGateway();
    if (!gateway) return null;

    try {
        // Get the network (channel) and contract (smart contract) you're interested in.
        const network = await gateway.getNetwork('mychannel'); // Replace 'mychannel' with your channel name
        const contract = network.getContract('drug-contract'); // Replace 'drug-contract' with your contract name

        // Query the ledger for drug details by drugId
        const result = await contract.evaluateTransaction('queryDrug', drugId);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Parse result if it's a JSON string, otherwise return as is
        return JSON.parse(result.toString());
    } catch (error) {
        console.error(`Failed to query drug details: ${error}`);
        return null;
    } finally {
        // Disconnect from the gateway when done
        gateway.disconnect();
    }
}

module.exports = {
    queryDrugDetails
};
