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
import type { projects as ProjectsQueryType } from './__generated__/projects';
import s from './Projects.css';
// $FlowExpectError
import ProjectsQuery from './Projects.graphql';


const withProjects: OperationComponent<ProjectsQueryType, {|
  title: string,
|}> = graphql(ProjectsQuery, {
  options: {
    fetchPolicy: 'network-only',
  },
});

const Projects = (props) => {
  const projects = props.data.projects || [];
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


export default withProjects(withStyles(s)(Projects));
