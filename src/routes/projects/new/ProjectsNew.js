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
import { Mutation } from 'react-apollo';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import CreateNewProject from './CreateNewProject.graphql';
import s from './ProjectsNew.css';

type PropTypes = {|
  title: string,
|};

class ProjectsNew extends React.Component<PropTypes> {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

          <Mutation mutation={CreateNewProject}>

            {(addTodo, { data }) => (
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="input" name="title" id="title" placeholder="Project title"/>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input type="textarea" name="description" id="description"/>
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ProjectsNew);
