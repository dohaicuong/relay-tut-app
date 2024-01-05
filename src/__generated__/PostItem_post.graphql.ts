/**
 * @generated SignedSource<<af941c63b5521e1ee783d65ce36c97b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostItem_post$data = {
  readonly content: string;
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "PostItem_post";
};
export type PostItem_post$key = {
  readonly " $data"?: PostItem_post$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostItem_post">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostItem_post",
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
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "a172eb919bd7d6fe1f0efc2a445cdd6f";

export default node;
