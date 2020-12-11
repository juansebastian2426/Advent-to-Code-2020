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

const validatePassport = (passport: string) => {
  const fields = passport.split(' ');
  
  let validFieldsFound = 0;
  for (let fielRequired of fieldsRequired) {
    if (fields.findIndex(field => field.includes(fielRequired)) != -1) { // si esa el campo
      validFieldsFound++
    }
  }

  if (fieldsRequired.length === validFieldsFound) {
    return true;
  }

  return false;
}

for (let passport of passports) {
  if (validatePassport(passport)) {
    passportsValid++
  }
}


console.log(passportsValid)