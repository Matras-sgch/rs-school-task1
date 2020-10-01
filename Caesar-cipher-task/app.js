const { Cipher } = require("js-cipher")
const fs = require('fs')
const path = require('path')
const { Command } = require('commander')
const program = new Command()
const cipher = new Cipher()

program
  .requiredOption('-a, --appAction <action>', 'encrypt/decrypt', )
  .requiredOption('-s, --shift <shift>', 'shift for cipher')
  .requiredOption('-i, --input <input>', 'input file')
  .requiredOption('-o, --output <output>', 'output file')
 
program.parse(process.argv)

let dataBuffer
let input = ''
let output = ''

if (program.appAction === 'encrypt') {
    dataBuffer = fs.readFileSync(program.input)
    input = dataBuffer.toString()
    output = cipher.encrypt(input, parseInt(program.shift))
    fs.writeFileSync(program.output, output)
} else if (program.appAction === 'decrypt') {
    dataBuffer = fs.readFileSync(program.input)
    input = dataBuffer.toString()
    output = cipher.decrypt(input,  parseInt(program.shift))
    fs.writeFileSync(program.output, output)
}