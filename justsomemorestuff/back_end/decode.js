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
let base64Data = "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";
let result = decodeAndDecompress(base64Data);
console.log(result);





 function decodebase64(correctriftinvemtorybase64) {
        //convert the Base64 String to binary data
        let binarystring = atob(correctriftinvemtorybase64);

        // converting the string to a Uint8Array
        let length = binarystring.length;
        let bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
          bytes[i] = binarystring.charCodeAt(i);

          //decompress the data using pako
          let decompressedData = pako.inflate(bytes);

          // convert the decompressed data into a string(a text string)
          let decompressedString = new TextDecoder().decode(decompressedData);

          //retun the fully decompressed string
          return decompressedString;
        }
      }