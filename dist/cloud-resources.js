if (window.ag == null) {
  window.ag = {};
}
window.ag.data = {
  "options": {
    "baseUrl": "https://rest-api.appgyver.com/v2/",
    "headers": {
      "steroidsApiKey": "991647f069008ae653c7c882854fbab1fcdf7b05468b4cf8573213603813a3ce",
      "steroidsAppId": 40638
    }
  },
  "resources": {
    "Player": {
      "schema": {
        "fields": {
          "player_uuid": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "username": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "id": {
            "type": "string",
            "identity": true
          }
        },
        "identifier": "id"
      }
    },
    "GeneralGame": {
      "schema": {
        "fields": {
          "player_average": {
            "type": "string"
          },
          "cpu_average": {
            "type": "string"
          },
          "score_from": {
            "type": "integer"
          },
          "player_uuid": {
            "type": "string"
          },
          "won": {
            "type": "boolean"
          },
          "number_of_darts_thrown": {
            "type": "integer"
          },
          "creation_datetime": {
            "type": "string"
          },
          "finish": {
            "type": "integer"
          },
          "one_hundred_plus": {
            "type": "integer"
          },
          "one_hundred_fourty_plus": {
            "type": "integer"
          },
          "one_hundred_eighty_plus": {
            "type": "integer"
          },
          "id": {
            "type": "string",
            "identity": true
          }
        },
        "identifier": "id"
      }
    },
    "BobAnderson": {
      "schema": {
        "fields": {
          "player_uuid": {
            "type": "string"
          },
          "creation_datetime": {
            "type": "string"
          },
          "number_of_darts_thrown": {
            "type": "integer"
          },
          "score": {
            "type": "integer"
          },
          "number_of_doubles_hit": {
            "type": "integer"
          },
          "id": {
            "type": "string",
            "identity": true
          }
        },
        "identifier": "id"
      }
    }
  }
};