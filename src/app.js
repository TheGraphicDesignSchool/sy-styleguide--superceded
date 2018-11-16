import React from "react";
import Button from "./components/Button";
import Icon from "./components/Icon";

export default () => {
  return (
    <div>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <hr />
      <Button optClass="secondary" collapse={true}>
        <Icon name="md-add" height="14" width="14" />
        <span>Icon Before</span>
      </Button>
      <Button optClass="secondary" collapse={true}>
        <span>Icon After</span>
        <Icon name="md-check" height="14" width="14" />
      </Button>
      <Button optClass="secondary" collapse={true}>
        <Icon name="md-filter" height="14" width="14" />
        <span>Icon Both</span>
        <Icon name="md-check" height="14" width="14" />
      </Button>
      <Button optClass="secondary" collapse={true}>
        <Icon name="md-filter" height="14" width="14" />
        <span>Icon Both</span>
        <Icon name="mbsy-caret" height="10" width="10" />
      </Button>
    </div>
  );
};
