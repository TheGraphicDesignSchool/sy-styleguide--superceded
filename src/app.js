import React from "react";
import Button from "./components/Button";
import Icon from "./components/Icon";

import Popover from "./components/Popover";
import StyledDiv from "./components/StyledDiv";

class ExampleBottomPopover extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    showing: false
  };

  togglePopover = () => {
    this.setState({ showing: !this.state.showing });
  };

  getPopoverContent = () => (
    <div className={localStyle["popover-wrapper"]}>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <p>Lorem ipsum dolor sit amet, consectetur.</p>
      <Button onClick={this.togglePopover} optClass={localStyle["popover-btn"]}>
        Close
      </Button>
    </div>
  );

  render = () => (
    <StyledDiv css={{ display: "flex", justifyContent: "space-around" }}>
      <Popover
        showing={this.state.showing}
        defaultPosition="bottom"
        content={this.getPopoverContent()}
        maxHeight="280px"
        onRequestClose={this.togglePopover}
      >
        <Button onClick={this.togglePopover}>
          {this.state.showing.left ? "Close" : "Open"} Bottom popover
        </Button>
      </Popover>
    </StyledDiv>
  );
}

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

      <hr />

      <ExampleBottomPopover />
    </div>
  );
};
