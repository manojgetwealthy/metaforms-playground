const createOptions = (values) => {
    const options = [];
    values.forEach(element => {
        if (element instanceof String) {
            options.push({label: element, value: element});
        }
        if (element instanceof Array) {
            const [label, value] = element;
            options.push({label, value});
        }
    });
}

export const gender_options = createOptions([['Male', 'M'], ['Female', 'F'], ['Others', 'O']]);
export const residential_options = [];
export const title_options = createOptions(['Mr', 'Mrs', 'Ms']);
export const educational_options = [];
export const marital_option = createOptions([['Single'], ['Married'], ['Widow'], ['Widower'], ['Divorced']]);
export const nationality_options = createOptions([['Indian', 'INDIAN'], ['Others', 'OTHERS']]);
export const yes_no_options = createOptions([['Yes', true], ['No', false]]); 

export const getOptions = (option) => {
    switch (option) {
        case 'gender_options':
            return gender_options;
        case 'residential_options':
            return residential_options;
        case 'title_options':
            return title_options;
        case 'marital_options':
            return marital_option;
        case 'yes_no_options':
            return yes_no_options;
        case 'nationality_options':
            return nationality_options;
        case 'educational_options':
            return educational_options;
        default:
            return [];
    }
}

export const options = ['gender_options', 'residential_options', 'title_options', 
    'marital_options', 'yes_no_options', 'nationality_options', 'educational_options'];