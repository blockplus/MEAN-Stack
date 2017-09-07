cd ..#Gaybre Web App
### Start
```npm install```

```npm run start```
### Endpoints
URL: http://www.koder4hire.com:3000

#####User signin:
    method: POST,
    url: /prologin,
    data: {

      email: String,
      password: String
    }
    response: {
      token: String,
      email: String,
      name:  String,
      paiddate: String,
      duedate: String,
      businesses: []String,
      issubscribed:  Bool,
      customsettings: [String]{},
      locationscount: Int,
    }

#####Get Pro User:
    method: GET,
    url: /api/prouser,
    requestHeader: {
      Authorization: Bearer TOKEN
    }
    response: {
      email: String,
      name:  String,
      paiddate: String,
      duedate: String,
      businesses: []String,
      issubscribed:  Bool,
      customsettings: [String]{},
      locationscount: Int,
    }

#####Register a new user:
    method: POST,
    url: /proregister,
    data: {

      email: String,
      password: String,
      stripetoken: String,
      paiddate: String,
      duedate: String
    }
    response: {
      token: String
    }

##### Logout user:
    method: POST,
    url: /prologout,
    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200

##### Create location:
    method: POST,
    url: /api/probusiness,
    data: {
      name: String,
      mapicon: String,
      imageurls: Array<String>
      website: String,
      category: String,
      streetaddress: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone: String,
      hours: {
          monday: {
              start: String,
              end: String
            },
          tuesday:  {
              start: String,
              end: String
            },
          wednesday:  {
              start: String,
              end: String
            },
          thursday:  {
              start: String,
              end: String
            },
          friday:  {
              start: String,
              end: String
            },
          saturday:  {
              start: String,
              end: String
            },
          sunday:  {
              start: String,
              end: String
            }
        },
      details: String,
      discounts: Array<String>
    }
    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200

##### Update Stripe Token
    method: PUT,
    url: /api/prouser/stripe,
    data: {
      stripetoken: String,
      paiddate: String,
      duedate: String
    }
    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200

##### Get Pro Business Location by ID
    method: GET,
    url: /api/probusiness/{id},

    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200



##### Update Pro Business Location by ID
    method: PUT,
    url: /api/probusiness/{id},
     data: {
      name: String,
      mapicon: String,
      imageurls: Array<String>
      website: String,
      category: String,
      streetaddress: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone: String,
      hours:  {
          monday: {
              start: String,
              end: String
            },
          tuesday:  {
              start: String,
              end: String
            },
          wednesday:  {
              start: String,
              end: String
            },
          thursday:  {
              start: String,
              end: String
            },
          friday:  {
              start: String,
              end: String
            },
          saturday:  {
              start: String,
              end: String
            },
          sunday:  {
              start: String,
              end: String
            }
        },
      details: String,
      discounts: Array<String>
    }
    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200


##### Update Pro User Password
    method: PUT,
    url: /api/prouser/password,
     data: {
      password: String,
    }
    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200

##### Update Pro User Custom Settings
    method: PUT,
    url: /api/prouser/customsettings,
     data: {
      customsettings: [string]{},
    }
    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200


##### Update Pro User Custom Settings
    method: DELETE,
    url: /api/probusiness/{id},

    requestHeader: {
      Authorization: Bearer TOKEN
    }
    responseStatus: 200


##### Pro User Password Email Recovery
    method: POST,
    url: /forgotpassword,
    data: {
      email: string,
    }

    responseStatus: 200



##### Get all of a Users Businesses
    method: GET,
    url: /api/probusiness/all,
    requestHeader: {
      Authorization: Bearer TOKEN
    }

    responseStatus: 200


    ##### Process image and return cloudinary secure url
    method: POST,
     url: /api/cloudinary
     data: FormFile "image"

    requestHeader: {
      Authorization: Bearer TOKEN
    }

    responseStatus: 200
    response: {
      url: String
    }



##### Process image and return cloudinary secure url
    method: POST,
     url: /api/cloudinary
     data: FormFile "image"

    requestHeader: {
      Authorization: Bearer TOKEN
    }

    responseStatus: 200
    response: {
      url: String
    }






