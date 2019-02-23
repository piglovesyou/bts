/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import Issue from './Issue';
import Project from './Project';
import Status from './Status';
import Type from './Type';
import User from './User';

Issue.hasMany(User, {
  foreignKey: 'owner',
});

Issue.hasMany(Project, {
  foreignKey: 'project',
});

Issue.hasMany(Type, {
  foreignKey: 'type',
});

Issue.hasMany(Status, {
  foreignKey: 'status',
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { Issue, Project, Status, Type, User };
