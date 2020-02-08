'use strict';

const validateArgument = require('./validate-argument');
const prepareData = require('./prepare-data/main');
const applyContextStateChanges = require('./apply-context-state-changes');
const fill = require('./fill/main');
const stroke = require('./stroke/main');

function main(consoleError, Context2dConstructor, argument) {
  const errorMsg = validateArgument(argument, Context2dConstructor);
  if (errorMsg) {
    consoleError(errorMsg);
    return;
  }

  const data = prepareData(argument);
  const cntx = data.get('cntx');
  cntx.save();
  applyContextStateChanges(data);
  fill(data);
  if (data.get('strokeWidth') !== 0) {
    stroke(data);
  }
  cntx.restore();
}

module.exports = main;
