 export  default function  convertToEnglishNumber  (input: string)  {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let converted = '';

    for (let i = 0; i < input.length; i++) {
        if (persianNumbers.includes(input[i])) {
            converted += persianNumbers.indexOf(input[i]);
        } else if (arabicNumbers.includes(input[i])) {
            converted += arabicNumbers.indexOf(input[i]);
        } else {
            converted += input[i];
        }
    }
    return converted;
};