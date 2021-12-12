const STDIN = (function () {

    return {
        getInput(message, validate, coerceToNum) {
            let input;
  
            do {
                const before = prompt(message);
                input = coerceToNum ? coerceToNum(before) : before;
            } while (validate(input));
  
            return input;
        }
    }
  })();
  
  const DATE = (function () {
    return {
        defineMaxDayMonth(yearOfBirth, monthOfBirth) {
    
            let maxDayMonth = monthOfBirth ===4 || monthOfBirth===6||monthOfBirth===9||monthOfBirth===11?30:31;
            if(this.isLeapYear(yearOfBirth) && monthOfBirth ===2){
                maxDayMonth = 29;
            }
            else if(!this.isLeapYear(yearOfBirth) && monthOfBirth ===2){
                maxDayMonth = 28;
            }
            return maxDayMonth;
        },
        isLeapYear (yearOfBirth) {
            if (yearOfBirth % 400 === 0 || (yearOfBirth % 100 !== 0 && yearOfBirth % 4 === 0)) {
               return isLeapYear = true;
            } else {
               return isLeapYear = false;
            }
        },
        getMonthStr (date) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          
            return monthNames[date.getMonth()];
           
        }
    }
 })()
  
  const USER_DATA = {
    firstName() {
        const MIN_NAME_VALUE = 5;
        const MAX_FIRST = 20;
        const FIRST_NAME_MESSAGE = `Point out your first name: min letters ${MIN_NAME_VALUE}, max letters ${MAX_FIRST}`;
        const validateFirstName = function (input) {
            return input === null || input.length < MIN_NAME_VALUE || input.length > MAX_FIRST;
        }
        const firstName = STDIN.getInput(FIRST_NAME_MESSAGE, validateFirstName);
  
        return firstName;
    },
    lastName() {
        const MIN_NAME_VALUE = 5;
        const MAX_LAST = 20;
        const LAST_NAME_MESSAGE = `Point out your last name: min letters ${MIN_NAME_VALUE}, max letters ${MAX_LAST}`;
        const validateLastName = function (input) {
            return input === null || input.length < MIN_NAME_VALUE || input.length > MAX_LAST;
        }
        const lastName = STDIN.getInput(LAST_NAME_MESSAGE, validateLastName);
  
        return lastName;
    },
  
    age() {
        const date = new Date();
        const MIN_YEAR = 1900;
        const BIRTH_YEAR_MESSAGE = `Put your year of birth: only numbers, min ${MIN_YEAR}, max ${(date.getFullYear())}`;
        coerceToNum = (before)=> {
            return Number(before);
        }
        const validateYearOfBirth = function (input) {
            return isNaN(input) || input < MIN_YEAR || input > date.getFullYear();
        }
        const yearOfBirth = STDIN.getInput(BIRTH_YEAR_MESSAGE, validateYearOfBirth, coerceToNum);
  
        const MIN_MONTH = 1;
        const MAX_MONTH = 12;
        const BIRTH_MONTH_MESSAGE = `Put your month of birth: only numbers, min ${MIN_MONTH}, max ${MAX_MONTH}`;
        const validateMonthOfBirth = function (input) {
            return isNaN(input) || input < MIN_MONTH || input > MAX_MONTH;
        }
        const monthOfBirth = STDIN.getInput(BIRTH_MONTH_MESSAGE, validateMonthOfBirth, coerceToNum);
  
  
        let leap = DATE.isLeapYear(yearOfBirth);
        let maxDayMonth = DATE.defineMaxDayMonth(yearOfBirth, monthOfBirth)
  
        const minDayMonth = 1;
        const BIRTHDAY_MESSAGE = `Put your birth day: only numbers, min ${minDayMonth}, max ${maxDayMonth}`;
        const validateDayOfBirth = function (input) {
            return isNaN(input) || input < minDayMonth || input > maxDayMonth;
        }
        const dayOfBirth = STDIN.getInput(BIRTHDAY_MESSAGE, validateDayOfBirth, coerceToNum);
  
        const birthDate = new Date(); //current date
        birthDate.setFullYear(yearOfBirth);
        birthDate.setMonth(monthOfBirth -1);
        birthDate.setDate(dayOfBirth);
        let age = date.getFullYear() - birthDate.getFullYear();
        let m = date.getMonth() - birthDate.getMonth();
        if (m<0 || ( m ===0 && date.getDate() < birthDate.getDate())){
                age--;
        }
  
        return age;
    },
    date() {
        const date = new Date();
        
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
        
    } 
    
  }
  