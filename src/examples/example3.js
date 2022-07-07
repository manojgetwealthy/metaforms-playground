const model = {
    theme: {
        type: 'mui',
        sectionLayout: 'default',
        mui: {
            variant: 'outlined',
            size: 'small'
        },
        bootstrap: {
            
        }
    },
    fields:[
        {
            name: 'othermembers',
            meta: {
                type: 'section',
                displayType: 'title',
                displayName: 'Get Insurance for other members of Family',
            },
            fields: [{
                name: 'title',
                meta: {
                    displayName: 'Title',
                    displayType: 'select',
                    options: [{label:'Mr.',value:'mr'},{label:'Mrs.',value:'mrs.'}],
                    validation: {
                        required: true
                    }
                }
            },{
                name: 'pincode',
                meta: {
                    displayName: 'Pincode',
                    displayType: 'number',
                    displayProps: {
                        md: '4',
                        isStandalone: true
                    },
                    validation: {
                        required: true,
                        pattern: '^[0-9]{6}$',
                        pattern_detail: {
                            errorMsg: 'Please enter a valid pincode'
                        }
                    }
                }
            },{
                name: 'issame ',
                meta: {
                    displayName: 'Is proposer and health insured same?',
                    displayType: 'radio',
                    displayProps: {
                        md: '4'
                    },
                    value: 'yes',
                    options: [{label:'Yes',value:'yes'},{label:'No',value:'no'}]
                }
            }]
        }, {
            name: 'memberdetails',
            meta: {
                type: 'section',
                displayType: 'title',
                displayName: 'Give details of members to see the prices',
                description: 'Add details of the person you want added with you in the insurance',
            },
            fields: [
                {
                    name: 'self',
                    meta: {
                        displayName: '',
                        displayType: 'checkbox',
                        value: 'true',
                        options: [{label:'Self',value:'true'}],
                        isDisabled: true,
                        displayProps: {
                            md: '2'
                        },
                        dependencies: {
                            exists: {
                                ref: 'issame ',
                                value: 'yes',
                                section: 'othermembers'
                            }
                        }
                    }
                }, {
                    name: 'age',
                    meta: {
                        displayName: 'Age',
                        displayType: 'number',
                        displayProps: {
                            md: '5'
                        },
                        validation: {
                            min: 10,
                            max: 100
                        },
                        dependencies: {
                            exists: {
                                ref: 'issame ',
                                value: 'yes',
                                section: 'othermembers'
                            }
                        }
                    }
                }, {
                    name: 'gender',
                    meta: {
                        displayName: 'Gender',
                        displayType: 'select',
                        options:[{value:'m',label:'Male'},{value:'f',label:'Female'}],
                        displayProps: {
                            md: '5'
                        },
                        dependencies: {
                            enabled: {
                                ref: 'title',
                                value: '',
                                section: 'othermembers'
                            },
                            equals: {
                                ref: 'title',
                                value: 'mr',
                                section: 'othermembers',
                                currentValue: 'm',
                                resetValue: '' 
                            },
                            exists: {
                                ref: 'issame ',
                                value: 'yes',
                                section: 'othermembers'
                            }
                        }
                    }
                },
                {
                    name: 'spouse',
                    meta: {
                        displayName: '',
                        displayType: 'checkbox',
                        value: '',
                        options: [{label:'Spouse',value:'true'}],
                        displayProps: {
                            md: '2',
                            rs: true    // row starts
                        },
                    }
                }, {
                    name: 'spouse_age',
                    meta: {
                        displayName: 'Age',
                        displayType: 'number',
                        displayProps: {
                            md: '5'
                        },
                        dependencies: {
                            enabled: {
                                ref: 'spouse',
                                value: 'true'
                            }
                        }
                    }
                }, {
                    name: 'spouse_gender',
                    meta: {
                        displayName: 'Gender',
                        displayType: 'select',
                        options:[{value:'m',label:'Male'},{value:'f',label:'Female'}],
                        displayProps: {
                            md: '5'
                        },
                        dependencies: {
                            enabled: {
                                ref: 'spouse',
                                value: 'true'
                            }
                        }
                    }
                },{
                    name: 'email',
                    meta: {
                        displayName: 'Email',
                        displayType: 'email',
                        value: 'manoj.adams@gmail.com',
                        isReadonly: true,
                    }
                },
                {
                    name: 'date',
                    meta: {
                        displayName: 'DOB',
                        displayType: 'date',
                        validation: {
                            required: true,
                            required_detail: {
                                errorMsg: 'DOB is required'
                            },
                            min:'2000-01-01',
                            max:'2023-01-01',
                        }
                    }
                }
            ]
        }, {
            name: 'children',
            meta: {
                type: 'section',
                displayType: 'title',
                displayName: 'Children'
            },
            fields: [{
                name: 'childrengroup',
                meta: {
                    type: 'group'
                },
                fields: [
                    {
                    name: 'age',
                    meta: {
                        displayName: 'Age',
                        displayType: 'number',
                        displayProps: {
                            md: '5'
                        },
                        validation: {
                            required: true
                        }
                    }
                }, {
                    name: 'gender',
                        meta: {
                            displayName: 'Gender',
                            displayType: 'select',
                            options:[{value:'m',label:'Male'},{value:'f',label:'Female'}],
                            displayProps: {
                                md: '5'
                            },
                        }
                }]
            }]
        }
    ],
    buttons: [{
        name: 'reset',
        meta: {
            displayName: 'Reset',
            displayType: 'button',
            className: 'my-3 offset-10 col',
            events: {
                onClick: 'reset'
            }
        }
    },{
        name: 'submit',
        meta: {
            displayName: 'Save',
            displayType: 'button',
            url: '',
            className: 'm-3 btn-primary',
            events: {
                onClick: 'submit'
            }
        }
    }]
};

export default model;