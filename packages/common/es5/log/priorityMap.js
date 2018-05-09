'use strict';

module.exports = {
  alert: { output: 'error', priority: 'LOG_ALERT' },
  crit: { output: 'error', priority: 'LOG_CRIT' },
  debug: { output: 'log', priority: 'LOG_DEBUG' },
  emerg: { output: 'log', priority: 'LOG_EMERG' },
  err: { output: 'error', priority: 'LOG_ERR' },
  info: { output: 'log', priority: 'LOG_INFO' },
  notice: { output: 'log', priority: 'LOG_NOTICE' },
  warning: { output: 'error', priority: 'LOG_WARNING' }
};