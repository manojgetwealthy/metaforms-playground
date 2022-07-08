const model = {
    theme: {
        type: 'bootstrap',
        sectionLayout: 'stepper'
    },
    fields: [
        {
            name: 'basic',
            meta: {
                type: 'section'
            },
            fields: [
                {name: 'title',meta:{
                    displayName: 'Title',
                    displayType: 'select',
                    
                    displayProps: {
                        md: 2
                    },
                    options:[{value:'mrs',label:'Mrs.'}]
                }},
                {name: 'firstName',meta:{
                    displayName: 'First Name',
                    displayType: 'text_field',  // default
                    value: 'Manoj',
                    
                    displayProps: {
                        md: 3
                    },
                    validation: {
                        required: true,
                        required_detail: {
                            errorMsg: 'Please enter your valid First Name'
                        }
                    }
                }},
                {name: 'lastName',meta:{
                    displayName: 'Last Name',
                    
                    displayProps: {
                        md: 3
                    },
                    allowValidOnly: true,
                    validation: {
                        required: true,
                        required_detail: {
                            errorMsg: 'Please enter your valid Last Name'
                        },
                        info_detail: {
                            infoMsg: 'Only alphanumeric characters are allowed'
                        }
                    }
                }},
                {name: 'middleName',meta:{
                    displayName: 'Middle Name',
                    displayProps: {
                        md: 3
                    },
                    validation: {
                        pattern: '^[a-zA-Z]*$',
                        pattern_detail: {
                            errorMsg: 'Not valid middle name'
                        }
                    }
                }},
                {name: 'dob',meta:{
                    displayName: 'Date of Birth',
                    displayType: 'date',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'gender',meta:{
                    displayName: 'Gender',
                    displayType: 'select',
                    options:[{value:'m',label:'Male'},{value:'f',label:'Female'}],
                    
                    displayProps: {
                        md: 6
                    },
                    validation: {
                        required: true
                    }
                }},
                {name: 'placeofbirth',meta:{
                    displayName: 'Place of Birth',
                    displayType: 'date',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'residentialStatus',meta:{
                    displayName: 'Residential Status',
                    displayType: 'select',
                    options:[{value:'INDIAN', label:'Indian Resident'},{value:'NRI',label:'Non Resident Indian'}],
                    
                    displayProps: {
                        md: 6
                    },
                    dependencies: {
                        onChange: [{
                            type: 'condition',
                            when: 'selected',
                            then: 'load',
                            reference: 'nationality'
                        }]
                    }
                }},
                {name: 'educationalQualification',meta:{
                    displayName: 'Educational Qualification',
                    displayType:'select',
                    options:[{value:'BTECH',label:'B.Technology'},{value:'MCA',label:'Master of computer applications'}],
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'pan',meta:{
                    displayName: 'PAN Number(Only for 50k+Premium)',
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'nationality',meta:{
                    displayName: 'Nationality',
                    displayType:'select',
                    options:[{value:'INDIAN', label:'Indian Resident'},{value:'NRI',label:'Non Resident Indian'}],
                    
                    displayProps: {
                        md: 6
                    },
                    dependencies: {
                        exists: {
                            ref: 'residentialStatus',
                            value: 'NRI'
                        }
                    },
                    loader: {
                        type: 'api',
                        url: 'https://jsonplaceholder.typicode.com/posts',
                        valueKey: 'id',
                        labelKey: 'title'
                    }
                }},
                {name: 'maritalStatus',meta:{
                    displayName: 'Marital Status',
                    displayType:'select',
                    options:[{value:'married', label:'Married'},{value:'bachelor',label:'bachelor'}],
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'convictionHistory',meta:{
                    displayName: 'Is there any history of conviction?',
                    displayType: 'radio',
                    options:[{value:'yes',label:'Yes'},{value:'no', label:'No'}],
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'disability',meta:{
                    displayName: 'Do you have disability of any kind?',
                    displayType: 'radio',
                    options:[{value:'yes',label:'Yes'},{value:'no', label:'No'}],
                    displayProps: {
                        md: 6,
                        isStandalone: true,
                        align: 'center'
                    }
                }},
                {name: 'lifeAssuredParty',meta:{
                    displayName: 'Which type of party is the life assured?',
                    displayType: 'radio',
                    options:[{value:'individual',label:'Individual'},{value:'business', label:'Business'}],
                    displayProps: {
                        md: 6,
                        isStandalone: true
                    }
                }},{
                    name: 'agreed',meta:{
                        displayName: 'Terms and conditions agreed?',
                        displayType: 'checkbox',
                        displayProps: {
                            md: 6,
                            isStandalone: true
                        },
                        options: [{label:'Option1',value:'option1'},{label:'Option2',value:'option2'}]
                    }
                },{
                    name: 'lifeassured',meta:{
                        displayName: 'Life assured party',
                        displayType: 'text_field',
                        displayProps: {
                            md: 6,
                            isStandalone: true
                        },
                        dependencies: {
                            exists: {
                                ref: 'lifeAssuredParty',
                                value:'business'
                            }
                        }
                    }
                }
            ]
        },{
            name: 'father',
            meta: {
                type: 'section',
                displayType: 'title',
                displayName: "Father's Name"
            },
            fields: [
                {name: 'fatherFirstName',meta:{
                    displayName:'Father First Name',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'fatherLastName',meta:{
                    displayName: 'Father Last Name',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'fatherMiddleName',meta:{
                    displayName: 'Father Middle Name',
                    displayProps: {
                        md: 6
                    }
                }}
            ]
        },{
            name: 'mother',
            meta: {
                type: 'section',
                displayType: 'title',
                displayName: "Mother's Name"
            },
            fields: [
                {name: 'motherFirstName', meta:{
                    displayName: 'Mother First Name',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'motherLastName', meta:{
                    displayName: 'Mother Last Name',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'motherMiddleName', meta:{
                    displayName: 'Mother Middle Name',
                    displayProps: {
                        md: 6
                    }
                }}
            ]
        },{
            name: 'spouse',
            meta: {
                type: 'section',
                displayType: 'title',
                displayName: "Spouse's Name"
            },
            fields: [
                {name: 'spouseFirstName', meta:{
                    displayName: 'Spouse First Name',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'spouseLastName', meta:{
                    displayName: 'Spouse Last Name',
                    
                    displayProps: {
                        md: 6
                    }
                }},
                {name: 'spouseMiddleName', meta:{
                    displayName: 'Spouse Middle Name',
                    displayProps: {
                        md: 6
                    }
                }}
            ]
        }, {
            name: 'place',
            meta: {
                type: 'section',
                displayName: 'Place'
            },
            fields: [
                {
                    name: 'country',
                    meta: {
                        displayName: 'Country',
                        displayType: 'select',
                        displayProps: {
                            md: 6
                        },
                        options: [{label:'India', value: 'INDIA'}, {label: 'Pakistan', value: 'PAKISTAN'}]
                    },
                },
                {
                    name: 'state',
                    meta: {
                        displayName: 'State',
                        displayType: 'select',
                        displayProps: {
                            md: 6
                        },
                        options: [],
                        dependencies: {
                            load: {
                                ref: 'country',
                                url: 'http://localhost:3000/api/states?q={0}'
                            }
                        }
                    },
                },
                {
                    name: 'district',
                    meta: {
                        displayName: 'District',
                        displayType: 'select',
                        displayProps: {
                            md: 6
                        },
                        options: [],
                        dependencies: {
                            load: {
                                ref: 'state',
                                url: 'http://localhost:3000/api/districts?q={0}'
                            }
                        }
                    },
                }
            ]
        }

]};

export default model;