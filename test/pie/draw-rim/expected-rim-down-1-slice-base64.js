'use strict';

module.exports = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAEsCAYAAADtt+XCAAAABmJLR0QA/wD/AP+gvaeTAAAfiUlEQVR4nO3deWBU9b338c+c2TKTISyyyCabrKIii1QW6/UiCAh0ARG0ttZra2tR+1j0qij1qqgVir0WW/vg41KlRRStGMTtoQJFKIuIECIS0hAgLBVoMsnsZ+4f1F7BhOUwM+ckeb/+0iTMfDXOvP2dM+d3XOl0Oi0AAE6TYfcAAID6iYAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAAAAsISAAAEsICADAEgICALCEgAAALCEgAABLCAgAwBICAgCwhIAAACwhIAAASwgIAMASAgIAsISAOMjll1+u4cOH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';