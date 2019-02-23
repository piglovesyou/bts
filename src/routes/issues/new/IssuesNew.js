/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// @flow

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IssuesNew.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

type PropTypes = {|
  title: string,
|};

class IssuesNew extends React.Component<PropTypes> {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="input" name="title" id="title" placeholder="Issue summary" />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" />
            </FormGroup>
            <FormGroup>
              <Label for="project">Project</Label>
              <Input type="select" name="project" id="project">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                Check me out
              </Label>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(IssuesNew);
