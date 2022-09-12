import express from 'express'
const router = express.Router();

import getRewardByWalletAddress from '../client/stoxClient.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseResponse:
 *       type: object
 *       properties:
 *         isSuccess:
 *           type: boolean
 *           example: true
 *         err:
 *           type: string
 *     Reward:
 *       type: object
 *       properties:
 *         reward:
 *           type: integer
 *           description: The reward amount.
 *           example: 10
 *     Wallet:
 *       type: object
 *       properties:
 *         walletAddress:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/reward:
 *   get:
 *     summary: Retrieve a reward amount by wallet address.
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         required: true
 *         description: Wallet address.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reward amount.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Reward'
*/
router.get('/', async (req, res) => {

    const reward = await getRewardByWalletAddress(req.query.walletAddress)
    res.status(200).json({"reward": reward});
});


/**
 * @swagger
 * /api/v1/reward:
 *   post:
 *     summary: Transfer near amount to wallet address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Wallet'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/BaseResponse'
*/
router.post('/', async (req, res) => {

    try {
        const walletAddress = req.body.walletAddress
        const reward = await getRewardByWalletAddress(walletAddress)
        
        if(reward != null){
            let finalAmount = (reward * Math.pow(10, 24)).noExponents().toString()
            await stoxNearAccount.sendMoney(
                walletAddress,
                finalAmount
            );
            res.status(200).json({isSuccess: true});
        }else{
            res.status(200).json({isSuccess: false, err: "Invalid reward"});
        }

    } catch (error) {
        console.log(error)
        res.status(200).json({isSuccess: false, err: "Internal Server Error"});
    }
});









/*  Helper functions  */

Number.prototype.noExponents = function() {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = '',
        sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
}
  
export default router;

