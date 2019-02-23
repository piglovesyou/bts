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
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import type { projects as ProjectsQueryType } from './__generated__/projects';
import s from './Projects.css';
// $FlowExpectError
import ProjectsQuery from './Projects.graphql';

type Props = {|
  title: string,
|};

const withProjects: OperationComponent<ProjectsQueryType, Props> = graphql(ProjectsQuery);

const Projects = (props) => {
  const projects = props.data.projects;
  return (
    <div>{
      projects.map(p => {
        return <div key={p.id}>{p.title}</div>;
      })
    }</div>
  );
};


export default withProjects(withStyles(s)(Projects));
