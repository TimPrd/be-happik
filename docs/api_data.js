define({ "api": [
  {
    "type": "post",
    "url": "/user/subscribe",
    "title": "User finishes its profile.",
    "name": "Complete_sign_up",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>the new password to be defined.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>the firstName to be add.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>the lastName to be add.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>the token received by email.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Mot",
            "description": "<p>de passe trop court.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Votre",
            "description": "<p>mot de passe doit contenir au moins 1 chiffre.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Identifiant",
            "description": "<p>ou mot de passe temporaire incorrect.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400  Bad Request\n{\n      error: \"Identifiant ou mot de passe temporaire incorrect\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "User sign-in.",
    "name": "Login_User",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>user password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {\n     \"lastName\": \"Doe\",\n     \"firstName\": \"John\",\n     \"email\": \"j@doe.com\",\n     \"id\": \"0\",\n     \"team\": \"1\",\n     \"role\": \"0\"\n  },\n  \"Authorization\": xxxtokenxxx,\n  \"message\": \"Logged In Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controllers/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/recover",
    "title": "User changes its password.",
    "name": "Recover_user_s_password",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>key received by email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>the new password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwordVerif",
            "description": "<p>check that password is really well defined.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "204",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "Register users.",
    "name": "Register_User",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "email",
            "description": "<p>users email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "team",
            "description": "<p>the team that user will join.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "currentUserId",
            "description": "<p>ID of the current user who register.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/User.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/reset",
    "title": "User requests a new password.",
    "name": "Request_a_new_password__token_sent_by_email_",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>user email.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "204",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Forbidden.",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/controllers/User.js",
    "groupTitle": "User"
  }
] });
