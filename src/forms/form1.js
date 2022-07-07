// term insurance
// https://www.wealthyinsurancedev.in/insurance/term/basic-form

const model = {
    theme: {
        type: 'mui',
        sectionLayout: 'default'
    },
    fields: [
        {
            name: 'age',
            meta: {
                displayName: 'Age',
                displayType: 'number',
                min: '8',
                max: '100',
                validation: {
                    required: true
                }
            }
        },
        {
            name: 'gender',
            meta: {
                displayName: 'Gender',
                displayType: 'select',
                options: [{label: 'Male', value: 'm'},{label:'Female', value:'f'}],
                validation: {
                    required: true
                }
            }
        },
        {
            name: 'residentialStatus',
            meta: {
                displayName: 'Residential Status',
                displayType: 'select',
                options: [{label: 'Indian Resident',value:'INR'},{label:'Non Resident Indian',value:'NRI'}],
                validation: {
                    required: true
                } 
            }
        },
        {
            name: 'annualBracketIncome',
            meta: {
                displayName: 'Annual Bracket Income',
                displayType: 'select',
                options: [{label: 'Up to 3 Lakhs',value:'upto3'},
                    {label:'3-6 lakhs',value:'3-6lakhs'},
                    {label: '6-10 lakhs',value:'6-10lakhs'},
                    {label: '10-15 lakhs',value:'10-15lakhs'},
                    {label: '15+ lakhs',value:'15pluslakhs'},
                ],
                validation: {
                    required: true
                }
            }
        },
        {
            name: 'smoke',
            meta: {
                displayName: 'Do you chew or smoke Tobacco? ',
                displayType: 'radio',
                options: [{label:'Yes',value:'yes'},{label:'No',value:'no'}],
                value: 'no',
                validation: {
                    required: true
                }
            }
        }
    ]
}

export default model;