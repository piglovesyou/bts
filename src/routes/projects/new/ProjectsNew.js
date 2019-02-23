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
// $FlowExpectError
import CreateNewProject from './CreateNewProject.graphql';
import s from './ProjectsNew.css';
import history from '../../../history';

type Props = {|
  title: string,
|};

class ProjectsNew extends React.Component<Props, {|
  validationMessages: Map<string, string>,
|}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      validationMessages: new Map(),
    }
  }
  validate(elements: {[string]: HTMLInputElement}): boolean {
    const msgs = this.state.validationMessages;

    if (!elements.title.value) {
      msgs.set('title', 'Project title is necessary');
    } else {
      msgs.delete('title');
    }

    if (!elements.description.value) {
      msgs.set('description', 'Write some clear description');
    } else {
      msgs.delete('description');
    }

    this.setState({ validationMessages: msgs, });

    if (msgs.size) {
      return false;
    }

    return true;
  }
  render() {
    const msgs = this.state.validationMessages;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

          <Mutation mutation={CreateNewProject}>

            {(createNewProject, { data }) => (
              <Form onSubmit={async (e) => {
                e.preventDefault();
                if (this.validate(e.target.elements)) {
                  const rv = await createNewProject({
                    variables: {
                      title: e.target.elements.title.value,
                      description: e.target.elements.description.value,
                    }
                  });
                  history.push('/projects');
                }
              }}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  {msgs.get('title') && <div className="text-danger">{msgs.get('title')}</div>}
                  <div></div>
                  <Input type="input" name="title" id="title" placeholder="Project title"/>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  {msgs.get('description') && <div className="text-danger">{msgs.get('description')}</div>}
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
