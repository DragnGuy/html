const pako = require('pako');

// Function to decode Base64 and decompress
function decodeAndDecompress(base64Data) {
    // Convert Base64 string to binary data
    let binaryString = atob(base64Data);

    // Convert binary string to Uint8Array
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // Decompress the data using pako
    let decompressedData = pako.inflate(bytes);

    // Convert decompressed data to a string (assuming it's text data)
    let decompressedString = new TextDecoder().decode(decompressedData);

    return decompressedString;
}

// Example usage
let base64Data = "your_base64_encoded_data_here";
let result = decodeAndDecompress(base64Data);
console.log(result);
