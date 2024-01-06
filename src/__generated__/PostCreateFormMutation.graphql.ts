/**
 * @generated SignedSource<<b01ce5cdb039b9b1dcaa2dd1bf1edc07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCreateInput = {
  content: string;
  title: string;
};
export type PostCreateFormMutation$variables = {
  connection: string;
  input: PostCreateInput;
};
export type PostCreateFormMutation$data = {
  readonly postCreate: {
    readonly post: {
      readonly " $fragmentSpreads": FragmentRefs<"PostItem_post">;
    };
  };
};
export type PostCreateFormMutation = {
  response: PostCreateFormMutation$data;
  variables: PostCreateFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connection"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PostCreateFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostCreatePayload",
        "kind": "LinkedField",
        "name": "postCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PostItem_post"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PostCreateFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "PostCreatePayload",
        "kind": "LinkedField",
        "name": "postCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "post",
            "handleArgs": [
              {
                "items": [
                  {
                    "kind": "Variable",
                    "name": "connections.0",
                    "variableName": "connection"
                  }
                ],
                "kind": "ListValue",
                "name": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "QueryPostsConnectionEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4d5717ecab7015fcfef9446ba09ff370",
    "id": null,
    "metadata": {},
    "name": "PostCreateFormMutation",
    "operationKind": "mutation",
    "text": "mutation PostCreateFormMutation(\n  $input: PostCreateInput!\n) {\n  postCreate(input: $input) {\n    post {\n      ...PostItem_post\n      id\n    }\n  }\n}\n\nfragment PostItem_post on Post {\n  id\n  title\n  content\n}\n"
  }
};
})();

(node as any).hash = "158be59d4c83c2c9c622734dc109625b";

export default node;
