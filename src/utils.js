/*  take a key and give a snip */

const fakeDB = require('./fakeSnipDB.json')

const giveRightSinp = (key) => {
  const snip = Object.entries(fakeDB)
    .find((objArray) => objArray[0] === key)
  return snip
}

export default giveRightSinp
