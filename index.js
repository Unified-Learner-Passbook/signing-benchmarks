// Common.js and ECMAScript Modules (ESM)
import * as ed from '@noble/ed25519';
import { performance } from "perf_hooks";

const messageString = JSON.stringify({
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "type": [
        "VerifiableCredential",
        "UniversityDegreeCredential"
    ],
    "issuer": "did:ulp:493d31cd-ca6b-426b-aa46-b3e4a1c62005",
    "issuanceDate": "2023-02-06T11:56:27.259Z",
    "expirationDate": "2023-02-08T11:56:27.259Z",
    "credentialSubject": {
        "id": "did:ulp:977ba77a-a549-4f3f-8d8c-eef01fe616a2",
        "grade": "6.23",
        "programme": "BCA",
        "certifyingInstitute": "IIIT Sonepat",
        "evaluatingInstitute": "NIT Kurukshetra"
    },
    "options": {
        "created": "2020-04-02T18:48:36Z",
        "credentialStatus": {
            "type": "RevocationList2020Status"
        }
    }
});
let utf8Encode = new TextEncoder();
const message = utf8Encode.encode(messageString);
const privateKey = ed.utils.randomPrivateKey();
const publicKey = await ed.getPublicKey(privateKey);

const testSingleSign = async (testNumber, message) => {
    // keys, messages & other inputs can be Uint8Arrays or hex strings
    const signature = await ed.sign(message, privateKey);
}

const testSingleVerify = async (testNumber, message) => {
    // keys, messages & other inputs can be Uint8Arrays or hex strings
    const signature = await ed.sign(message, privateKey);
    const isValid = await ed.verify(signature, message, publicKey);
}


const testSign = async (totalTests) => {
    var t0 = new Date().getTime();
    const tests = []
    for (let i = 0; i < totalTests; i++) {
        tests.push(testSingleSign(i, message));
    }

    // Averge time taken for each test
    await Promise.all(tests).then((results) => {
        var t1 = new Date().getTime();
        console.log(`Total Sign: ${(t1 - t0) / totalTests}ms`);
        process.exit(0);
    });
}

const testSignAndVerify = async (totalTests) => {
    var t0 = new Date().getTime();
    const tests = []
    for (let i = 0; i < totalTests; i++) {
        tests.push(testSingleVerify(i, message));
    }

    // Averge time taken for each test
    await Promise.all(tests).then((results) => {
        var t1 = new Date().getTime();
        console.log(`Total Sign and Verify: ${(t1 - t0) / totalTests}ms`);
        process.exit(0);
    });
}


// await testSign(1000);
await testSignAndVerify(1000);