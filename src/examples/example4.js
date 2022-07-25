export default {
    "fields": [{
        "name": "first_name",
        "meta": {
            "displayType": "text",
            "displayName": "First Name"
        }
    }, {
        "name": "last_name",
        "meta": {
            "displayType": "text",
            "displayName": "Last Name",
            "value": "",
            "validation": {
                "required": true,
                "required_detail": {
                    "errorMsg": "This field is required"
                }
            }
        }
    }]
}