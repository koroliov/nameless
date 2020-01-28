'use strict';

module.exports = 'data:image/png;base64,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ioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAApAgJAioAAkCIgAKQICAAp/wbkFxUU1+Z2kAAAAABJRU5ErkJggg==';
