import express from 'express'
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const PORT = 3000;

import rewardRouter from './controller/rewardController.js'
app.use('/api/v1/reward', rewardRouter);

import {connect} from 'near-api-js';
import nearAPI from 'near-api-js'
initNear()

import swaggerJSDoc from'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';



const swaggerSpec = configureSwagger()
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);


async function initNear() {

    const keyStore = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
        `${process.env.HOME}/.near-credentials/`
    );

    const connectionConfig = {
        networkId: "testnet",
        keyStore: keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    };
    const nearConnection = await connect(connectionConfig);


    const stoxNearAccount = await nearConnection.account("bugra4.testnet");
    global.stoxNearAccount = stoxNearAccount
}


function configureSwagger(){
  
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Stox Reward API',
                version: '1.0.0',
                description:
                  'Stox Reward tokens can be claim with these APIs',
                contact: {
                  name: 'Stox',
                  url: 'https://stox.app',
                },
            }
        },
        apis: ['./controller/*.js'],
    };

    return swaggerJSDoc(options);

}