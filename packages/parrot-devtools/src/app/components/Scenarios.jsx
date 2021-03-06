/*
 * Copyright 2019 American Express Travel Related Services Company, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useScenarios } from '../hooks';
import { Grid, Scrollable } from './styled';

export function ScenariosMiddleware({ url }) {
  const { loading, scenarios, scenario, setScenario, loadScenarios } = useScenarios(url);

  if (loading) {
    return (
      <Grid>
        <div className="progress-circle progress-indeterminate margin-auto" />
      </Grid>
    );
  }

  if (!scenarios || !scenario) {
    return (
      <Scrollable>
        <div className="alert alert-warn alert-dialog alert-lg" role="alert">
          <span className="alert-icon dls-icon-warning icon-lg" />
          <h1 className="heading-4 alert-header">Failed to Load Scenarios</h1>
          <p className="alert-subtitle">
            <span>Try </span>
            <button type="button" onClick={loadScenarios}>
              refreshing
            </button>
            <span> or updating the middleware URL in settings.</span>
          </p>
        </div>
      </Scrollable>
    );
  }

  return (
    <Scrollable className="border">
      <ul className="nav-menu">
        {scenarios.map(({ name }) => (
          <li className="nav-item" key={name}>
            <button
              type="button"
              className="nav-link fluid"
              aria-pressed={name === scenario}
              onClick={() => setScenario(name)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </Scrollable>
  );
}

ScenariosMiddleware.propTypes = {
  url: PropTypes.string.isRequired,
};

export const mapStateToProps = ({ url }) => ({ url });

export default connect(mapStateToProps)(ScenariosMiddleware);
