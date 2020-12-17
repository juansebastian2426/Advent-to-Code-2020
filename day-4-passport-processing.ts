const text = await Deno.readTextFile("./day-4-input.txt");
const inputData = [];

const passportsSplitted = text.split("\n\n");
const passports: string[] = [];
for (let passport of passportsSplitted) {
  passports.push(passport.replaceAll("\n", " "));
}

let passportsValid: number = 0;
const fieldsRequired = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
]

const fieldRequiredRules = new Map()
fieldRequiredRules.set('byr', {
  digits: 4,
  min: 1920,
  max: 2002
})
fieldRequiredRules.set('iyr', {
  digits: 4,
  min: 2010,
  max: 2020
})
fieldRequiredRules.set('eyr', {
  digits: 4,
  min: 2020,
  max: 2030
})
fieldRequiredRules.set('hgt', {
  letters: ['cm', 'in'],
  cm: {
    min: 150,
    max: 193
  },
  in: {
    min: 59,
    max: 76
  }
})
fieldRequiredRules.set('hcl', {
  characterInitial: '#',
  charactersQuantity: 6
})
fieldRequiredRules.set('ecl', {
  validWords: ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
})
fieldRequiredRules.set('pid', {
  digits: 9
})


const validateFields = (passportFieldsArray: string[]): boolean => {
  let passValid = true

  for (let fieldRequired of fieldsRequired) {
    const rules = fieldRequiredRules.get(fieldRequired)
    switch (fieldRequired) {
      case 'byr': {
        let value: string | number = passportFieldsArray.filter(elem => elem.includes(fieldRequired))[0].split(':')[1]
        
        if (value.length === rules.digits) {
          value = parseInt(value)
          if (value >= rules.min && value <= rules.max) {
            passValid = true
          } else {
            passValid = false
          }
        } else {
          passValid = false
        }
        break;
      }
      case 'iyr': {
        let value: string | number = passportFieldsArray.filter(elem => elem.includes(fieldRequired))[0].split(':')[1]
        
        if (value.length === rules.digits) {
          value = parseInt(value)
          if (value >= rules.min && value <= rules.max) {
            passValid = true
          } else {
            passValid = false
          }
        } else {
          passValid = false
        }
        break;
      }
      case 'eyr': {
        let value: string | number = passportFieldsArray.filter(elem => elem.includes(fieldRequired))[0].split(':')[1]
        
        if (value.length === rules.digits) {
          value = parseInt(value)
          if (value >= rules.min && value <= rules.max) {
            passValid = true
          } else {
            passValid = false
          }
        } else {
          passValid = false
        }
        break;
      }
      case 'hgt': {
        let value: string | number = passportFieldsArray.filter(elem => elem.includes(fieldRequired))[0].split(':')[1]

        if (value.includes(rules.letters[0])) {
          const number: number = parseInt(value.split('cm')[0])
          if (number >= rules.cm.min && number <= rules.cm.max) {
            passValid = true
          } else {
            passValid = false
          }
        } else if (value.includes(rules.letters[1])) {
          const number: number = parseInt(value.split('cm')[0])
          if (number >= rules.in.min && number <= rules.in.max) {
            passValid = true
          } else {
            passValid = false
          }
        } else {
          passValid = false
        }
        break;
      }
      case 'hcl': {
        let value: string = passportFieldsArray.filter(elem => elem.includes(fieldRequired))[0].split(':')[1]

        if (value.startsWith(rules.characterInitial)) {
          const valueWithoutCharacterInitital: string = value.slice(1);
          if (valueWithoutCharacterInitital.length === rules.charactersQuantity) {
            if (/[^a-f0-9]+/g.test(valueWithoutCharacterInitital)) {
              passValid = false
            } else {
              passValid = true
            }
          } else {
            passValid = false
          }
        } else {
          passValid = false
        }
        break;
      }
      case 'ecl': {
        let value: string = passportFieldsArray.filter(elem => elem.includes(fieldRequired))[0].split(':')[1]
        const wordFound = rules.validWords.filter((word: string) => word === value)

        if (wordFound.length > 0) {
          passValid = true
        } else {
          passValid = false
        }
        break;
      }
      case 'pid': {
        let value: string = passportFieldsArray.filter(elem => elem.includes(fieldRequired))[0].split(':')[1]
        
        if (!/[^0-9]+/g.test(value)) {
          if (value.length === rules.digits) {
            passValid = true
          } else {
            passValid = false
          }
        } else {
          passValid = false
        }
        break;
      }
        
    }

    if (!passValid) {
      break;
    }
  }

  return passValid
}


const validatePassport = (passport: string) => {
  const fields = passport.split(' ');
  
  let validFieldsFound = 0;
  for (let fielRequired of fieldsRequired) {
    if (fields.findIndex(field => field.includes(fielRequired)) != -1) { // si esa el campo
      validFieldsFound++
    }
  }

  if (fieldsRequired.length === validFieldsFound) {
    const isPassValid = validateFields(fields)
    if (isPassValid) {
      return true;
    }
  }

  return false;
}



const passportFieldMock = [
  "ecl:amb",
  "hgt:151cm",
  "cid:239",
  "hcl:#ab45e9",
  "pid:345463700",
  "iyr:2019",
  "byr:1920",
  "eyr:2021",
]

console.log(validateFields(passportFieldMock))

for (let passport of passports) {
  if (validatePassport(passport)) {
    passportsValid++
  }
}


console.log(passportsValid)