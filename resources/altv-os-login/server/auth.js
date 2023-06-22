/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import { MSGS } from './messages.js';
import * as sm from 'simplymongo';
import { encryptPassword, verifyPassword } from './encryption.js';

const db = sm.getDatabase();

alt.onClient('auth:Try', handleAuthAttempt);
alt.on('auth:Done', debugDoneAuth);

/**
 * Route the method the player is using to login.
 * Register or Login.
 * @param  {alt.Player} player
 * @param  {String} username
 * @param  {String} password
 * @param  {String | null} email
 */
async function handleAuthAttempt(player, username,  password, email, nickname) {
    if (!player || !player.valid) {
        return;
    }

    if (!username || !password) {
        alt.emitClient(player, 'auth:Error', MSGS.UNDEFINED);
    }

    if (email) {
        handleRegistration(player, email, username, nickname, password);
        return;
    }

    handleLogin(player, username, password);
}

/**
 * Handle the registration of a player.
 * @param {alt.Player} player
 * @param  {String} email
 * @param  {String} username
 * @param  {String} nickname
 * @param  {String} password
 */
async function handleRegistration(player, email, username, nickname, password) {
    const emails = await db.fetchAllByField('email', email, 'accounts');
    if (emails.length >= 1) {
        alt.emitClient(player, 'auth:Error', MSGS.EXISTS);
        return;
    }

    const usernames = await db.fetchAllByField('username', username, 'accounts');
    if (usernames.length >= 1) {
        alt.emitClient(player, 'auth:Error', MSGS.EXISTS);
        return;
    }

    const nicknames = await db.fetchAllByField('nickname', nickname, 'accounts');
    if (nicknames.length >= 1) {
        alt.emitClient(player, 'auth:Error', MSGS.EXISTS);
        return;
    }

    const document = {
        email,
        username,
        nickname,
        password: encryptPassword(password),
        intro: 0,
        money: {
            cash:0,
            bank:0
        },
        rank: {rank:1, rp:0, cp:0, rankup:1},
        model : "male",
        maleface: [],
        femaleface: [],
        tattoo: [],
        defaulthouse: [],
        property: 0,
        apartments: [],
        vehicles: {},
        garages: [],
        airporth : 0,
        hangar: {},
        hangarslot : [],
        aircrafts: [],
        pegasus : [],
        specialvehicles: [],
        dock : {},
        boats : [],
        criminal: {
            record : {
                copkilled : 0,
                crime : 0
            },
            active : {
                copkilled : 0,
                crime : 0
            }
        },
        coplevel: 0,
        coppoint: 0,
        taxijob : 0
    };

    const weapondata = {
        username,
        nickname,
        weapons: {},
        weaponmods: [],
        specialweapons: [],
        livery: [],
        helmets: [],
        armors: [],
        armorstock: 0,
    }

    const business = {
        username,
        nickname,
        vehiclewarehouse : {},
        cargowarehouse : {},
        cocainhouse : {},
        counterfitcash : {},
        weedhouse : {},
        bunker : {},
        office : {},
        facility: {},
        garagehsop : {},
        arcade : {},
        arenaworkshop : {},

    }

    const clothesdata = {
        username,
        nickname,
        maleoutfits: {},
        femaleoutfits: {},
        maleprops: {},
        femaleprops: {},
        maletops: [],
        femaletops: [],
        malepants: [],
        femalepants: [],
        maleshoes: [],
        femaleshoes: [],
        bags: [],
        maleaccs: [],
        femaleaccs: [],
        maleglasses: [],
        femaleglasses: [],
        malehats: [],
        femalehats: [],
        masks: [],
        leftmaccs: [],
        leftfaccs: [],
        rightmaccs: [],
        rightfaccs: [],
        earsm: [],
        earsf: [],
    }

    const dbData = await db.insertData(document, 'accounts', true);
    await db.insertData(weapondata, 'weapons', false)
    await db.insertData(clothesdata, 'characters', false)
    await db.insertData(business, 'business', false)
    alt.emit('auth:Done', player, dbData._id.toString(), dbData.username, dbData.nickname, dbData.intro, dbData, weapondata, clothesdata, business);
}

/**
 * Handle the login of a player.
 * @param  {alt.Player} player
 * @param  {String} username
 * @param  {String} password
 */
async function handleLogin(player, username, password) {
    const accounts = await db.fetchAllByField('username', username, 'accounts');
    const weapons = await db.fetchAllByField('username', username, 'weapons');
    const clothes = await db.fetchAllByField('username', username, 'characters');
    const business = await db.fetchAllByField('username', username, 'business');
    if (accounts.length <= 0) {
        alt.emitClient(player, 'auth:Error', MSGS.INCORRECT);
        return;
    }

    if (!verifyPassword(password, accounts[0].password)) {
        alt.emitClient(player, 'auth:Error', MSGS.INCORRECT);
        return;
    }

    alt.emit('auth:Done', player, accounts[0]._id.toString(), accounts[0].username, accounts[0].nickname, accounts[0].intro, accounts[0], weapons[0], clothes[0], business[0]);
}

/**
 * Simply to log a successful authentication to console.
 * @param  {alt.Player} player
 * @param  {String} id
 * @param  {String} username
 * @param  {String} email
 */
function debugDoneAuth(player, id, username, email) {
    console.log(`[OS] Authenticated - ${username} - ${id}`);
}

alt.onClient('updatedata', (player, collection, datatype, value, isArray)=>{
    let usernick = player.getSyncedMeta('NAME');
    updatedata(usernick, collection, datatype, value, isArray)
})

alt.onClient('updatesubdata', (player, collection, datatype, subtype, data, isArray)=>{
    let usernick = player.getSyncedMeta('NAME');
    updatesubdata(usernick, collection, datatype, subtype, data, isArray)
})

alt.onClient('getdata', (player, collection, task, datatype)=>{
    let usernick = player.getSyncedMeta('NAME');
    getdata(player, usernick, collection, datatype, task)
})

alt.onClient('getsubdata', (player, collection, task, datatype, key)=>{
    let usernick = player.getSyncedMeta('NAME');
    getsubdata(player, usernick, collection, datatype, key, task)
})

alt.onClient('requestdata', (player, collection, task)=>{
    let usernick = player.getSyncedMeta('NAME');
    requesdata(player, usernick, collection, task)
})

async function updatedata(nickname, collection, datatype, value, array) {
    const data = await db.fetchAllByField('nickname', nickname, collection);
    let datanew

    if (data.length <= 0) {
        return;
    }
    if(array == true) {
        let newdata = data[0]
        let newlist = newdata[datatype]
        newlist.push(value)
        datanew = {[datatype]: newlist}
    } else {
        datanew = {[datatype]: value}
    }
    
   // await db.replaceField(oldvalue, datatype, value, 'accounts')
    await db.updatePartialData(data[0]._id, datanew, collection)
    alt.log(nickname, ' data updated ', datatype)
}

async function updatesubdata(nickname, collection, datatype, subtype, value, array) {
    const data = await db.fetchAllByField('nickname', nickname, collection);
    let datanew

    if (data.length <= 0) {
        return;
    }
    if(array == true) {
        let newdata = data[0]
        let newlist = newdata[datatype];

            newlist[subtype] = value

        datanew = {[datatype]: newlist}
    } else {
       // datanew = {[datatype]: value}
    }
    
   // await db.replaceField(oldvalue, datatype, value, 'accounts')
    await db.updatePartialData(data[0]._id, datanew, collection)
    alt.log(nickname, ' data updated ', datatype)
}

async function getdata(player, nickname, collection, datatype, task) {
    const data = await db.fetchAllByField('nickname', nickname, collection);
    if (data.length <= 0) {
         return;
    }
    let newdata = data[0]
    let pushdata = newdata[datatype]
    alt.log(task, pushdata)
    alt.emitClient(player, task, pushdata)
    return pushdata
}

async function getsubdata(player, nickname, collection, datatype, key, task) {
    const data = await db.fetchAllByField('nickname', nickname, collection);
    if (data.length <= 0) {
         return;
    }
    let newdata = data[0]
    let pushdata = newdata[datatype]
    alt.log(task,pushdata[key])
    alt.emitClient(player, task, pushdata[key])
    return pushdata
}

async function requesdata(player, nickname, collection, task) {
    const data = await db.fetchAllByField('nickname', nickname, collection);
    if (data.length <= 0) {
         return;
    }
    alt.emitClient(player, task, data[0])
    
}
