/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { randomBytes } from 'crypto';
import DataType from 'sequelize';
import Model from '../sequelize';

const Status = Model.define(
  'Status',
  {
    id: {
      primaryKey: true,
      type: DataType.STRING,
      length: 8,
      defaultValue: () => randomBytes(8).toString('hex'),
    },

    title: { type: DataType.STRING },
    description: { type: DataType.STRING },
  },
  // {
  //   indexes: [{ fields: ['email'] }],
  // },
);

export default Status;
