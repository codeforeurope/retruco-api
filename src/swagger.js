// Retruco-API -- HTTP API to bring out shared positions from argumented statements
// By: Paula Forteza <paula@retruco.org>
//     Emmanuel Raviart <emmanuel@retruco.org>
//
// Copyright (C) 2016 Paula Forteza & Emmanuel Raviart
// https://git.framasoft.org/retruco/retruco-api
//
// Retruco-API is free software; you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// Retruco-API is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


import config from "./config"


const types = [
  "Abuse",
  "Argument",
  "Card",
  "PlainStatement",
  "Property",
  "Tag",
]

const SPEC = {
  swagger: "2.0",
  info: {
    title: config.title,
    description: config.description,
    // termsOfService: "http://api.retruco.org/terms",
    contact: config.contact,
    license: config.license,
    version: "1",
  },
  host: [80, 443].includes(config.port) ? config.host.toString() : `${config.host}:${config.port}`,
  // basePath: "",
  // schemes: ["http", "https", "ws", "wss"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/": {
      get: {
        tags: ["home"],
        summary: "Describe API",
        // description: "",
        // externalDocs: {},
        operationId: "home",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/apiKeyOptionalParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing statements",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  // TODO
                  // $ref: "#/definitions/Home",
                  type: "object",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "cards-bundle": {
      post: {
        tags: ["statement"],
        summary: "Create a new statement",
        // description: "",
        // externalDocs: {},
        operationId: "statements.create",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/cardsBundleBodyParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the created statement",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
              },
              required: [
                "apiVersion",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
    },
    "/statements": {
      get: {
        tags: ["statement"],
        summary: "List statements",
        // description: "",
        // externalDocs: {},
        operationId: "statements.list",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/languageCodeParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/tagsNameQueryParam",
          },
          {
            $ref: "#/parameters/userNameQueryParam",
          },
          {
            $ref: "#/parameters/apiKeyOptionalParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing statements",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataIdsList",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
      post: {
        tags: ["statement"],
        summary: "Create a new statement",
        // description: "",
        // externalDocs: {},
        operationId: "statements.create",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/statementParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "201": {
            description: "A wrapper containing the created statement",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
    },
    "/statements/{statementId}": {
      delete: {
        tags: ["statement"],
        summary: "Delete an existing statement",
        // description: "",
        // externalDocs: {},
        operationId: "statements.delete",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the deleted statement",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
      get: {
        tags: ["statement"],
        summary: "Get a statement",
        // description: "",
        // externalDocs: {},
        operationId: "statements.get",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyOptionalParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested statement",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "/statements/{statementId}/abuse": {
      get: {
        tags: ["abuse", "statement"],
        summary: "Get a statement abuse",
        // description: "",
        // externalDocs: {},
        operationId: "abuses.get",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyOptionalParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested abuse",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "/statements/{statementId}/abuse/rating": {
      delete: {
        tags: ["abuse", "rating"],
        summary: "Delete an existing abuse rating",
        // description: "",
        // externalDocs: {},
        operationId: "abuses.deleteBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the deleted abuse rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
      get: {
        tags: ["abuse", "rating"],
        summary: "Get an abuse rating",
        // description: "",
        // externalDocs: {},
        operationId: "abuses.getBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested abuse rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
      post: {
        tags: ["abuse", "rating"],
        summary: "Create or update abuse rating",
        // description: "",
        // externalDocs: {},
        operationId: "abuses.upsertBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/ratingDataParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the updated abuse rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          "201": {
            description: "A wrapper containing the created abuse rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
    },
    "/statements/{statementId}/arguments/{groundId}": {
      get: {
        tags: ["argument"],
        summary: "Get an argument",
        // description: "",
        // externalDocs: {},
        operationId: "arguments.get",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/groundIdParam",
          },
          {
            $ref: "#/parameters/apiKeyOptionalParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested argument",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/Argument",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "/statements/{statementId}/arguments/{groundId}/rating": {
      delete: {
        tags: ["argument", "rating"],
        summary: "Delete an argument rating",
        // description: "",
        // externalDocs: {},
        operationId: "arguments.deleteBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/groundIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the deleted argument rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
      get: {
        tags: ["argument", "rating"],
        summary: "Get a argument rating",
        // description: "",
        // externalDocs: {},
        operationId: "arguments.getBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/groundIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested argument rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
      post: {
        tags: ["argument", "rating"],
        summary: "Create or update argument rating",
        // description: "",
        // externalDocs: {},
        operationId: "arguments.upsertBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/groundIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/ratingDataParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the updated argument rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          "201": {
            description: "A wrapper containing the created argument rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
    },
    "/statements/{statementId}/rating": {
      delete: {
        tags: ["statement", "rating"],
        summary: "Delete an existing statement rating",
        // description: "",
        // externalDocs: {},
        operationId: "statements.deleteBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the deleted statement rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
      get: {
        tags: ["statement", "rating"],
        summary: "Get a statement rating",
        // description: "",
        // externalDocs: {},
        operationId: "statements.getBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested statement rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
      post: {
        tags: ["statement", "rating"],
        summary: "Create or update statement rating",
        // description: "",
        // externalDocs: {},
        operationId: "statements.upsertBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/ratingDataParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the updated statement rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          "201": {
            description: "A wrapper containing the created statement rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
    },
    "/statements/{statementId}/tags": {
      get: {
        tags: ["tag"],
        summary: "List tags of statement",
        // description: "",
        // externalDocs: {},
        operationId: "statements.listTags",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyOptionalParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing tags",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataIdsList",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "/statements/{statementId}/tags/{tagName}": {
      get: {
        tags: ["tag"],
        summary: "Get tag of statement",
        // description: "",
        // externalDocs: {},
        operationId: "tags.get",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/tagNamePathParam",
          },
          {
            $ref: "#/parameters/apiKeyOptionalParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested tag",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/Tag",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "/statements/{statementId}/tags/{tagName}/rating": {
      delete: {
        tags: ["rating", "tag"],
        summary: "Delete a tag rating",
        // description: "",
        // externalDocs: {},
        operationId: "tags.deleteBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/tagNamePathParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the deleted tag rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
      get: {
        tags: ["rating", "tag"],
        summary: "Get a tag rating",
        // description: "",
        // externalDocs: {},
        operationId: "tags.getBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/tagNamePathParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested tag rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
      post: {
        tags: ["rating", "tag"],
        summary: "Create or update tag rating",
        // description: "",
        // externalDocs: {},
        operationId: "tags.upsertBallot",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/statementIdParam",
          },
          {
            $ref: "#/parameters/tagNamePathParam",
          },
          {
            $ref: "#/parameters/depthParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
          {
            $ref: "#/parameters/ratingDataParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the updated tag rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          "201": {
            description: "A wrapper containing the created tag rating",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/DataId",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
    },
    "/login": {
      post: {
        tags: ["user"],
        summary: "Login (to retrieve API key)",
        // description: "",
        // externalDocs: {},
        operationId: "users.login",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            name: "user",
            in: "body",
            // description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                password: {
                  type: "string",
                },
                userName: {
                  type: "string",
                },
              },
              required: [
                "password",
                "userName",
              ],
            },
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the logged-in user (with its API key)",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/User",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "/swagger.json": {
      get: {
        tags: ["home"],
        summary: "Swagger Specification of API",
        // description: "",
        // externalDocs: {},
        operationId: "swagger",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [],
        responses: {
          "200": {
            description: "A wrapper containing statements",
            schema: {
              type: "object",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    "/users": {
      get: {
        tags: ["user"],
        summary: "List IDs of users",
        // description: "",
        // externalDocs: {},
        operationId: "users.list",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [],
        responses: {
          "200": {
            description: "A wrapper containing references to users",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  type: "array",
                  items: {
                    $ref: "#/definitions/UrlName",
                  },
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
      post: {
        tags: ["user"],
        summary: "Create a new user",
        // description: "",
        // externalDocs: {},
        operationId: "users.create",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/userParam",
          },
        ],
        responses: {
          "201": {
            description: "A wrapper containing the created user",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/User",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
      // put: {
      //   tags: ["user"],
      //   summary: "Update an existing user",
      //   // description: "",
      //   // externalDocs: {},
      //   operationId: "users.update",
      //   // consumes: ["application/json"],
      //   // produces: ["application/json"],
      //   parameters: [
      //     {
      //       $ref: "#/parameters/userParam",
      //     },
      //     {
      //       $ref: "#/parameters/apiKeyRequiredParam",
      //     },
      //   ],
      //   responses: {
      //     "200": {
      //       description: "A wrapper containing the updated user",
      //       schema: {
      //         type: "object",
      //         properties: {
      //           apiVersion: {
      //             type: "string",
      //           },
      //           data: {
      //             $ref: "#/definitions/User",
      //           },
      //         },
      //         required: [
      //           "apiVersion",
      //           "data",
      //         ],
      //       },
      //     },
      //     default: {
      //       description: "Error payload",
      //       schema: {
      //         $ref: "#/definitions/Error",
      //       },
      //     },
      //   },
      //   deprecated: true,
      //   schemes: ["http", "https", "ws", "wss"],
      //   security: [{apiKey: []}, {basic: []}],
      // },
    },
    "/users/{userName}": {
      delete: {
        tags: ["user"],
        summary: "Delete an existing user",
        // description: "",
        // externalDocs: {},
        operationId: "users.delete",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/userNamePathParam",
          },
          {
            $ref: "#/parameters/apiKeyRequiredParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the deleted user",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/User",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: [{apiKey: []}, {basic: []}],
      },
      get: {
        tags: ["user"],
        summary: "Get a user",
        // description: "",
        // externalDocs: {},
        operationId: "users.get",
        // consumes: ["application/json"],
        // produces: ["application/json"],
        parameters: [
          {
            $ref: "#/parameters/userNamePathParam",
          },
          {
            $ref: "#/parameters/showParam",
          },
        ],
        responses: {
          "200": {
            description: "A wrapper containing the requested user",
            schema: {
              type: "object",
              properties: {
                apiVersion: {
                  type: "string",
                },
                data: {
                  $ref: "#/definitions/User",
                },
              },
              required: [
                "apiVersion",
                "data",
              ],
            },
          },
          default: {
            description: "Error payload",
            schema: {
              $ref: "#/definitions/Error",
            },
          },
        },
        // deprecated: true,
        // schemes: ["http", "https", "ws", "wss"],
        // security: {},
      },
    },
    // parameters: {},
  },
  definitions: {
    AbstractStatement: {
      type: "object",
      discriminator: "type",
      properties: {
        activePropertiesIds: {
          type: "array",
          items: {
            $ref: "#/definitions/Id",
          },
        },
        attributes: {
          type: "object",
        },
        ballotId: {
          $ref: "#/definitions/BallotId",
        },
        createdAt: {
          type: "string",
          format: "date-time",
        },
        deleted: {
          type: "boolean",
          default: false,
        },
        groundIds: {
          type: "array",
          items: {
            $ref: "#/definitions/Id",
          },
        },
        id: {
          $ref: "#/definitions/Id",
        },
        rating: {
          maximum: 1,
          minimum: -1,
          type: "number",
        },
        ratingCount: {
          minimum: 0,
          type: "integer",
        },
        ratingSum: {
          type: "integer",
        },
        tagIds: {
          type: "array",
          items: {
            $ref: "#/definitions/Id",
          },
        },
        tags: {
          type: "array",
          items: {
            type: "string",
          },
        },
        type: {
          type: "string",
          enum: types,
        },
        userPropertiesIds: {
          type: "array",
          items: {
            $ref: "#/definitions/Id",
          },
        },
      },
      required: [
        "type",
      ],
    },
    Abuse: {
      allOf: [
        {
          $ref: "#/definitions/AbstractStatement",
        },
        {
          type: "object",
          properties: {
            statementId: {
              $ref: "#/definitions/Id",
            },
          },
          required: [
            "statementId",
          ],
        },
      ],
    },
    Argument: {
      allOf: [
        {
          $ref: "#/definitions/AbstractStatement",
        },
        {
          type: "object",
          properties: {
            abuseId: {
              $ref: "#/definitions/Id",
            },
            claimId: {
              $ref: "#/definitions/Id",
            },
            groundId: {
              $ref: "#/definitions/Id",
            },
            isAbuse: {
              type: "boolean",
              default: false,
            },
          },
          required: [
            "claimId",
            "groundId",
          ],
        },
      ],
    },
    Ballot: {
      type: "object",
      properties: {
        id: {
          $ref: "#/definitions/BallotId",
        },
        rating: {
          maximum: 1,
          minimum: -1,
          type: "integer",
        },
        statementId: {
          $ref: "#/definitions/Id",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
        },
        voterId: {
          $ref: "#/definitions/Id",
        },
      },
      required: [
        "statementId",
      ],
    },
    BallotId: {
      type: "string",
      pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    },
    Card: {
      allOf: [
        {
          $ref: "#/definitions/AbstractStatement",
        },
        {
          type: "object",
          properties: {
            abuseId: {
              $ref: "#/definitions/Id",
            },
            isAbuse: {
              type: "boolean",
              default: false,
            },
          },
          required: [],
        },
      ],
    },
    DataId: {
      type: "object",
      properties: {
        ballots: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/Ballot",
          },
        },
        id: {
          $ref: "#/definitions/IdOrBallotId",
        },
        statements: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/AbstractStatement",
          },
        },
        users: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/User",
          },
        },
      },
      required: [
        "id",
      ],
    },
    DataIdsList: {
      type: "object",
      properties: {
        ballots: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/Ballot",
          },
        },
        ids: {
          type: "array",
          items: {
            $ref: "#/definitions/IdOrBallotId",
          },
        },
        statements: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/AbstractStatement",
          },
        },
        users: {
          type: "object",
          additionalProperties: {
            $ref: "#/definitions/User",
          },
        },
      },
      required: [
        "ids",
      ],
    },
    Error: {
      type: "object",
      properties: {
        apiVersion: {
          type: "string",
        },
        code: {
          type: "integer",
          minimum: 100,
          maximum: 600,
        },
        message: {
          type: "string",
        },
      },
      required: [
        "apiVersion",
        "code",
        "message",
      ],
    },
    Id: {
      type: "string",
      pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    },
    IdOrBallotId: {
      type: "string",
      pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?$",
    },
    LanguageCode: {
      type: "string",
      pattern: "^[a-z]{2}$",
    },
    PlainStatement: {
      allOf: [
        {
          $ref: "#/definitions/AbstractStatement",
        },
        {
          type: "object",
          properties: {
            abuseId: {
              $ref: "#/definitions/Id",
            },
            authorId: {
              $ref: "#/definitions/Id",
            },
            isAbuse: {
              type: "boolean",
              default: false,
            },
            languageCode: {
              $ref: "#/definitions/LanguageCode",
            },
            name: {
              type: "string",
            },
          },
          required: [
            "languageCode",
            "name",
          ],
        },
      ],
    },
    Property: {
      allOf: [
        {
          $ref: "#/definitions/AbstractStatement",
        },
        {
          type: "object",
          properties: {
            abuseId: {
              $ref: "#/definitions/Id",
            },
            isAbuse: {
              type: "boolean",
              default: false,
            },
            // languageCode: {
            //   $ref: "#/definitions/LanguageCode",
            // },
            name: {
              type: "string",
            },
            schema: {
              $ref: "#/definitions/Schema",
            },
            statementId: {
              $ref: "#/definitions/Id",
            },
            value: {
              // Since Swagger 2 doesn't accept fields having any type of value (primitive, array, object, null),
              // then "value" field is encoded into a JSON string.
              type: "string",
            },
            widget: {
              $ref: "#/definitions/Widget",
            },
          },
          required: [
            "name",
            "schema",
            "value",
            "widget",
          ],
        },
      ],
    },
    Schema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: [
            "integer",
            "string",
          ],
        },
      },
      required: [
        "type",
      ],
    },
    Tag: {
      allOf: [
        {
          $ref: "#/definitions/AbstractStatement",
        },
        {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            statementId: {
              $ref: "#/definitions/Id",
            },
          },
          required: [
            "name",
            "statementId",
          ],
        },
      ],
    },
    UrlName: {
      type: "string",
    },
    User: {
      type: "object",
      properties: {
        apiKey: {
          type: "string",
        },
        email: {
          formet: "email",
          type: "string",
        },
        id: {
          $ref: "#/definitions/Id",
        },
        name: {
          type: "string",
        },
        password: {
          type: "string",
        },
        urlName: {
          type: "string",
        },
      },
      required: [
        "email",
        "urlName",
      ],
    },
    Widget: {
      type: "object",
      properties: {
        type: {
          type: "string",
          enum: [
            "textarea",
            "textline",
          ],
        },
      },
      required: [
        "type",
      ],
    },
  },
  parameters: {
    apiKeyOptionalParam: {
      description: "Secret key used to identify user",
      // format: "password",  Don't use password format to allow key to be visible in Swagger-UI.
      in: "header",
      name: "retruco-api-key",
      type: "string",
    },
    apiKeyRequiredParam: {
      description: "Secret key used to identify user",
      // format: "password",  Don't use password format to allow key to be visible in Swagger-UI.
      in: "header",
      name: "retruco-api-key",
      required: true,
      type: "string",
    },
    cardsBundleBodyParam: {
      // description: "",
      in: "body",
      name: "bundle",
      required: true,
      schema: {
        type: "object",
        properties: {
          cards: {
            type: "array",
            items: {
              type: "object",
            },
          },
          key: {
            type: "string",
          },
        },
        required: [
          "cards",
          "key",
        ],
      },
    },
    createdAtParam: {
      // description: "",
      in: "path",
      name: "createdAt",
      required: true,
      type: "string",
      format: "date-time",
    },
    depthParam: {
      // description: "",
      in: "query",
      minimum: 0,
      name: "depth",
      type: "integer",
    },
    groundIdParam: {
      // description: "",
      in: "path",
      name: "groundId",
      required: true,
      // A reference to a non-object definition doesn't work for a parameter that is not in request body.
      // schema: {
      //   $ref: "#/definitions/Id",
      // },
      type: "string",
      pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    },
    idParam: {
      // description: "",
      in: "path",
      name: "id",
      required: true,
      // A reference to a non-object definition doesn't work for a parameter that is not in request body.
      // schema: {
      //   $ref: "#/definitions/Id",
      // },
      type: "string",
      pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    },
    languageCodeParam: {
      // description: "",
      in: "query",
      name: "languageCode",
      type: "string",
      pattern: "^[a-z]{2}$",
    },
    ratingDataParam: {
      // description: "",
      in: "body",
      name: "ratingData",
      required: true,
      schema: {
        type: "object",
        properties: {
          rating: {
            type: "integer",
            maximum: 1,
            minimum: -1,
          },
        },
        required: [
          "rating",
        ],
      },
    },
    showParam: {
      // description: "",
      in: "query",
      name: "show",
      type: "array",
      items: {
        type: "string",
      },
      collectionFormat: "multi",
    },
    statementIdParam: {
      // description: "",
      in: "path",
      name: "statementId",
      required: true,
      // A reference to a non-object definition doesn't work for a parameter that is not in request body.
      // schema: {
      //   $ref: "#/definitions/Id",
      // },
      type: "string",
      pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    },
    statementParam: {
      // description: "",
      in: "body",
      name: "statement",
      required: true,
      schema: {
        $ref: "#/definitions/AbstractStatement",
      },
    },
    tagNamePathParam: {
      // description: "",
      in: "path",
      name: "tagName",
      required: true,
      type: "string",
    },
    tagsNameQueryParam: {
      // description: "",
      in: "query",
      name: "tag",
      type: "array",
      items: {
        type: "string",
      },
      collectionFormat: "multi",
    },
    typeQueryParam: {
      // description: "",
      in: "query",
      name: "type",
      type: "string",
      enum: types,
    },
    userNamePathParam: {
      // description: "",
      in: "path",
      name: "userName",
      required: true,
      type: "string",
    },
    userNameQueryParam: {
      // description: "",
      in: "query",
      name: "user",
      type: "string",
    },
    userParam: {
      // description: "",
      in: "body",
      name: "user",
      required: true,
      schema: {
        $ref: "#/definitions/User",
      },
    },
  },
  // externalDocs: {},
  // responses: {},
  // security: {},
  // securityDefinitions: {
  //   apiKey: {
  //     description: "Secret key used to identify user or bot",
  //     in: "header",
  //     name: "retruco-api-key",
  //     type: "apiKey",
  //   },
  //   basic: {
  //     description: "HTTP Basic authentication with user (or bot) name and password",
  //     type: "basic",
  //   },
  // },
  // tags: [],
}
export default SPEC
