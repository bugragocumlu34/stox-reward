import axios, * as others from 'axios';

function getRewardByWalletAddress(walletAddress){
    var fetchPromise = new Promise(async function (resolve, reject) {
        try {
            const response = await axios.get('https://api.stox.app/search/reward?walletAddress=' + walletAddress)
            if(response.data){
                resolve(response.data.reward)
            }else{
                resolve(null)
            }
        } catch (error) {
            console.log(error)
            resolve(null)
        }
    });

    return fetchPromise;
}

export default getRewardByWalletAddress;