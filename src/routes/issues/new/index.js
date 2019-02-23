/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../../components/Layout/Layout';
import IssueNew from './IssuesNew';

const title = 'New issue';

function action() {
  return {
    chunks: ['issues'],
    title,
    component: (
      <Layout>
        <IssueNew title={title} />
      </Layout>
    ),
  };
}

export default action;
