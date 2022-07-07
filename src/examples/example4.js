const schema = {
    theme: {
        type: 'mui',
        sectionLayout: 'tabs'
    },
    rest: {
        basepath: '',
        config: {
            headers: [{key:'',value:''}]
        }
    },
    fields: [{
        name: 'registration',
        meta: {
            displayName: 'Registration Details',
            type: 'section'
        },
        fields: [{
            name: 'first_name',
            meta: {
                displayName: 'First Name',
                displayType: 'text'
            }
        }],
    }],
    buttons: [{
        name:'save',
        meta: {
            type: 'submit',
            displayName: 'View Quotation',
            displayProps: {
                md: 2,
                xs: 12
            },
            className: 'fixed-bottom bg-primary bg-gradient text-white ',
            events: {
                click: {
                    url:' /insurance-users/api/v0/proposals/fourwheeler/create'
                }
            }
        }
    }]
};

  export default schema;