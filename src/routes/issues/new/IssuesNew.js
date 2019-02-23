// @flow

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import type { ChildProps, OperationComponent } from 'react-apollo';
import { graphql, Mutation } from 'react-apollo';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';

import history from '../../../history';
import type { newIssue as NewIssueType } from './__generated__/newIssue';
// $FlowExpectError
import createIssueMutation from './createIssue.graphql';
import s from './IssuesNew.css';
// $FlowExpectError
import newIssue from './newIssue.graphql';

type PropTypes = {|
  title: string,
|};

class IssuesNew extends React.Component<ChildProps<PropTypes, NewIssueType>, {|
  validationMessages: Map<string, string>,
|}> {
  constructor(props) {
    super(props);
    this.state = {
      validationMessages: new Map(),
    };
  }

  validate(elements: { [string]: HTMLInputElement }): boolean {
    const msgs = this.state.validationMessages;

    if (!elements.title.value) {
      msgs.set('title', 'Issue title is necessary');
    } else {
      msgs.delete('title');
    }

    if (!elements.description.value) {
      msgs.set('description', 'Issue description is necessary');
    } else {
      msgs.delete('description');
    }

    if (!elements.project.value) {
      msgs.set('project', 'Something wrong');
    } else {
      msgs.delete('project');
    }

    this.setState({ validationMessages: msgs, });

    if (msgs.size) {
      return false;
    }

    return true;
  }

  render() {
    const projects = this.props.data.projects || [];
    const msgs = this.state.validationMessages;
    // (this.props.data.x: string);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>

          <Mutation mutation={createIssueMutation}>
            {(createIssue, { data }) => (
              <Form onSubmit={async e => {
                e.preventDefault();
                if (this.validate(e.target.elements)) {
                  await createIssue({
                    variables: {
                      title: e.target.elements.title.value,
                      description: e.target.elements.description.value,
                      project: e.target.elements.project.value,
                    }
                  });
                  history.push('/issues');
                }
              }}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  {msgs.get('title') && <div className="text-danger">{msgs.get('title')}</div>}
                  <Input type="input" name="title" id="title" placeholder="Issue summary"/>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  {msgs.get('description') && <div className="text-danger">{msgs.get('description')}</div>}
                  <Input type="textarea" name="description" id="description"/>
                </FormGroup>
                <FormGroup>
                  <Label for="project">Project</Label>
                  {msgs.get('project') && <div className="text-danger">{msgs.get('project')}</div>}
                  <Input type="select" name="project" id="project">
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </Input>
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>)
            }

          </Mutation>
        </div>
      </div>
    );
  }
}

const withData: OperationComponent<NewIssueType, PropTypes> = graphql(newIssue);

export default withStyles(s)(withData(IssuesNew));
