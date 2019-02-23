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
import { graphql, OperationComponent } from 'react-apollo';
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import type { issues as IssuesQueryType } from './__generated__/issues.js';
import s from './Issues.css';
// $FlowExpectError
import IssuesQuery from './Issues.graphql';

const withProjects: OperationComponent<IssuesQueryType, {|
  title: string,
|}> = graphql(IssuesQuery, {
  options: {
    fetchPolicy: 'network-only',
  },
});

const Issues = (props) => {
  const projects = props.data.issues || [];
  return (
    <Container>
      <h1>{props.title}</h1>
      <ListGroup className="mb-4">
        {projects.map(p => (
          <ListGroupItem key={p.id}>
            <span className="mr-1 font-weight-bold">{p.title}</span>
            <span className="text-muted">{p.updatedAt}</span>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};


export default withProjects(withStyles(s)(Issues));
