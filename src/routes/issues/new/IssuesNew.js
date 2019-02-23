/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// @flow

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import { graphql } from 'react-apollo';
import type { OperationComponent, ChildProps } from 'react-apollo';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import s from './IssuesNew.css';
// $FlowExpectError
import newIssue from './newIssue.graphql';
import type {newIssue as NewIssueType} from './__generated__/newIssue';

type PropTypes = {|
  title: string,
|};

class IssuesNew extends React.Component<ChildProps<PropTypes, NewIssueType>> {
  render() {
    const projects = this.props.data.projects || [];
    // (this.props.data.x: string);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="input" name="title" id="title" placeholder="Issue summary"/>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description"/>
            </FormGroup>
            <FormGroup>
              <Label for="project">Project</Label>
              <Input type="select" name="project" id="project">
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </Input>
            </FormGroup>
            <Button color="primary">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

const withData: OperationComponent<NewIssueType, PropTypes> = graphql(newIssue);

export default withStyles(s)(withData(IssuesNew));
